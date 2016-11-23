package server;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import classes.Song;

public class SocketListener {
public static WebsocketEndpoint ws;

public static void route(JSONObject msg) {
	System.out.println(msg.toJSONString());
	String emit = (String) msg.get("emit");
	
	if (emit.equals("addTrackToQueue")) addTrackToQueue((String) msg.get("channel"), (JSONObject) msg.get("track"));
	if (emit.equals("updateChannelQueue")) updateChannelQueue((String) msg.get("channel"), (JSONArray) msg.get("queue"));
}

public static void addTrackToQueue(String channelId, JSONObject trackData) {
	System.out.println("ADD TO " + channelId + " TRACK " + trackData.toJSONString());
	ChannelManager.getChannel(channelId).addSong(new Song((String) trackData.get("uri"), (long) trackData.get("duration")));
}

public static void updateChannelQueue(String channelId, JSONArray queue) {
	System.out.println("REPLACE " + channelId + "'s QUEUE TO " + queue.toJSONString());
	List<Song> newQueue = new ArrayList<Song>();
	for (Object obj : queue) {
		JSONObject o = (JSONObject) obj;
		String uri = (String) o.get("uri");
		long duration = (long) o.get("duration");
		newQueue.add(new Song(uri, duration));
	}
	ChannelManager.getChannel(channelId).replaceQueue(newQueue);
}

}
