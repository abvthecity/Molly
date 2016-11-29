package server;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import classes.Song;
import classes.User;

public class SocketListener {
public static WebsocketEndpoint ws;

public static void route(JSONObject msg) {
	System.out.println(msg.toJSONString());
	String emit = (String) msg.get("emit");
	
	if (emit.equals("addTrackToQueue")) addTrackToQueue((String) msg.get("channel"), (JSONObject) msg.get("track"));
	if (emit.equals("updateChannelQueue")) updateChannelQueue((String) msg.get("channel"), (JSONArray) msg.get("queue"));
	if (emit.equals("startChannel")) startChannel((String) msg.get("channel"));
	if (emit.equals("stopChannel")) stopChannel((String) msg.get("channel"));
	if (emit.equals("skipSongInChannel")) skipSongInChannel((String) msg.get("channel"));
	if (emit.equals("userJoinedChannel")) userJoinedChannel((String) msg.get("channel"), (String) msg.get("clientId"));
	if (emit.equals("userLeftChannel")) userLeftChannel((String) msg.get("channel"), (String) msg.get("clientId"));
	if (emit.equals("newFavoriteChannel")) userAddedFavoriteChannel((String) msg.get("channelId"), (String) msg.get("clientId"));
}

public static void userAddedFavoriteChannel(String channelId, String clientId) {
	System.out.println("channel: " + channelId + ", client: " + clientId);
}

public static void userLeftChannel(String channelId, String clientId) {
	System.out.println("REMOVE FROM " + channelId + " USER " + clientId);
	// check existence
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	// make call
	ChannelManager.getChannel(channelId).removeUser(clientId);
}

public static void userJoinedChannel(String channelId, String clientId) {
	System.out.println("ADD TO " + channelId + " USER " + clientId);
	// check existence
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	// make call
	ChannelManager.getChannel(channelId).addUser(new User(clientId, false));
}

public static void addTrackToQueue(String channelId, JSONObject trackData) {
	System.out.println("ADD TO " + channelId + " TRACK " + trackData.toJSONString());
	// check existence
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	// make call
	ChannelManager.getChannel(channelId).addSong(new Song((String) trackData.get("uri"), (long) trackData.get("duration")));
}

public static void updateChannelQueue(String channelId, JSONArray queue) {
	System.out.println("REPLACE " + channelId + "'s QUEUE TO " + queue.toJSONString());
	// check existence
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	// make call
	List<Song> newQueue = new ArrayList<Song>();
	for (Object obj : queue) {
		JSONObject o = (JSONObject) obj;
		String uri = (String) o.get("uri");
		long duration = (long) o.get("duration");
		newQueue.add(new Song(uri, duration));
	}
	ChannelManager.getChannel(channelId).replaceQueue(newQueue);
}

public static void startChannel(String channelId) {
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	ChannelManager.getChannel(channelId).goLive();
}

public static void stopChannel(String channelId) {
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	ChannelManager.getChannel(channelId).goOffline();
}

public static void skipSongInChannel(String channelId) {
	if (!ChannelManager.exists(channelId)) {
		System.out.println("ERROR: CHANNEL " + channelId + " DOES NOT EXIST.");
		return;
	}
	ChannelManager.getChannel(channelId).startNextSong();
}

}
