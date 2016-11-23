package classes;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import server.ChannelManager;

public class Channel extends Thread {

//    public String channelId;
//  public String[] channelTags;
//  public int numChannelSubscribers;
//  public int numChannelLikes;
//  public boolean isLive;

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

@Override
public void run() {
	while (true) {
		// lock await 
		if (isLive && currentSongURI != null) {
			currentTime = System.currentTimeMillis() - startTime;
			if (currentTime > duration) {
				startNextSong();
			}
		} else if (songQueue.size() > 0) {
			startNextSong();
		}
	}
}

public void startNextSong() {
	// todo: lock this shit
	if (isLive) {
		if (songQueue.size() > 0) {
			// pop queue
			Song nextSong = songQueue.get(0);
			songQueue.remove(0);
			// replace current song
			currentSongURI = nextSong.getSongURI();
			duration = nextSong.getDuration();
			currentTime = 0;
			startTime = System.currentTimeMillis();
		} else {
			currentSongURI = null;
			duration = 0;
			currentTime = 0;
			startTime = 0;
		}
		emitUpdate();
	}
}

public void addSong(Song song) {
	songQueue.add(song);
	emitUpdate();
}

public void replaceQueue(List<Song> newQueue) {
	this.songQueue = (ArrayList<Song>) newQueue;
	emitUpdate();
}

public void setChannelName(String channelName) {
	this.channelName = channelName;
}

public void goLive() {
	isLive = true;
	if (!this.isAlive()) {
		this.start();
	}
}

public void goOffline() {
	isLive = false;
	if (this.isAlive()) {
		this.interrupt();
	}
}

public void emitUpdate() {
	JSONObject msg = new JSONObject();
	msg.put("emit", "channel_updated");
	msg.put("channel", this.channelId);
	msg.put("data", this.toJSON());
	ChannelManager.ws.sendAll(msg);
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

	if (isLive) {
		obj.put("currentTrackURI", currentSongURI);
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
