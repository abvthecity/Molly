package server;

import org.json.simple.JSONObject;

import classes.Song;

public class SocketListener {
public static WebsocketEndpoint ws;

public static void route(JSONObject msg) {
	System.out.println(msg.toJSONString());
	String emit = (String) msg.get("emit");
	
	if (emit.equals("addTrackToQueue")) addTrackToQueue((String) msg.get("channel"), (JSONObject) msg.get("track"));
}

public static void addTrackToQueue(String channelId, JSONObject trackData) {
	System.out.println("ADD TO " + channelId + " TRACK " + trackData.toJSONString());
	ChannelManager.getChannel(channelId).addSong(new Song((String) trackData.get("uri"), (long) trackData.get("duration")));
}

}
