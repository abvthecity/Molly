package classes;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import server.ChannelManager;

public class Channel {

private Lock lock = new ReentrantLock();
private Condition queueNotEmpty = lock.newCondition();
private ChannelRunner runner;

public String channelId;
public String clientId;
public String channelName;
public ArrayList<Song> songQueue;
public boolean isLive;

public String currentSongURI;
public long startTime;     // SYSTEM milliseconds
public long currentTime;     // ms, percent of duration
public long duration;     // ms, duration given by spotify

public Channel(String clientId, String channelId, String channelName){
	this.clientId = clientId;
	this.channelId = channelId;
	this.channelName = channelName;
	this.songQueue = new ArrayList<Song>();
	startTime = 0;
	isLive = false;
}

private class ChannelRunner extends Thread {
	@Override
	public void run() {
		while (isLive && this.isAlive()) {
			lock.lock();
			if (currentSongURI != null && currentTime < duration) {
				currentTime = System.currentTimeMillis() - startTime;
			} else startNextSong();
			lock.unlock();
		}
	}
}

public void startNextSong() {
	lock.lock();
	try {
		// check if queue empty
		while (songQueue.isEmpty() && isLive) {
			currentSongURI = null;
			duration = 0;
			currentTime = 0;
			startTime = 0;
			emitUpdate();
			System.out.println("Waiting for more songs in queue.");
			queueNotEmpty.await();
		}
		
		if (!songQueue.isEmpty()) {
			// after queue isn't empty...
			Song nextSong = songQueue.get(0);
			songQueue.remove(0);
			// replace current song
			currentSongURI = nextSong.getSongURI();
			duration = nextSong.getDuration();
			currentTime = 0;
			startTime = System.currentTimeMillis();
			System.out.println("START SONG " + currentSongURI);
			emitUpdate();
		} else {
			currentSongURI = null;
			duration = 0;
			currentTime = 0;
			startTime = 0;
			emitUpdate();
		}
		
	} catch (InterruptedException e) {
//		e.printStackTrace();
		System.out.println("Thread for channel '" + channelId + "' was interrupted.");
	} finally {
		lock.unlock();
	}
}

public void addSong(Song song) {
	lock.lock();
	songQueue.add(song);
	queueNotEmpty.signal();
	emitUpdate();
	lock.unlock();
}

public void replaceQueue(List<Song> newQueue) {
	lock.lock();
	this.songQueue = (ArrayList<Song>) newQueue;
	emitUpdate();
	if (!newQueue.isEmpty()) 
		queueNotEmpty.signal();
	lock.unlock();
}

public void setChannelName(String channelName) {
	lock.lock();
	this.channelName = channelName;
	lock.unlock();
}

public void goLive() {
	lock.lock();
	// stop current runner
	if (runner != null && runner.isAlive()) {
		runner.interrupt();
	}
	// update current song
	if (currentSongURI != null) {
		startTime = System.currentTimeMillis() - currentTime;
	}

	System.out.println("Going online...");
	isLive = true;
	runner = new ChannelRunner();
	runner.start();
	emitUpdate();
	lock.unlock();
}

public void goOffline() {
	lock.lock();
	System.out.println("Going offline...");
	isLive = false;
	if (runner != null && runner.isAlive()) {
		runner.interrupt();
		runner = null;
		queueNotEmpty.signal();
		emitUpdate();
	}
	lock.unlock();
}

public void emitUpdate() {
	lock.lock();
	JSONObject msg = new JSONObject();
	msg.put("emit", "channel_updated");
	msg.put("channel", this.channelId);
	msg.put("data", this.toJSON());
	ChannelManager.ws.sendAll(msg);
	lock.unlock();
}

public JSONObject toJSON() {
	/* {
	    id: string,
	    hostId: string,
	    name: string,
	    favorite: bool,
	    isLive: bool,
	    currentTrackURI: string, (optional)
	    currentTrackTime: number, (optional)
	    currentTrackDuration: number (optional)
	   } */

	JSONObject obj = new JSONObject();

	obj.put("id", channelId);
	obj.put("hostId", clientId);
	obj.put("name", channelName);
	obj.put("favorite", false);
	obj.put("isLive", isLive);

	if (currentSongURI != null) {
		obj.put("currentTrackURI", currentSongURI);
		obj.put("currentTrackStartTime", startTime);
		obj.put("currentTrackTime", currentTime);
		obj.put("currentTrackDuration", duration);
	}

	JSONArray songQueueJSON = new JSONArray();
	for (Song s : songQueue) {
		songQueueJSON.add(s.getSongURI());
	}

	obj.put("upNext", songQueueJSON);

	return obj;
}

}
