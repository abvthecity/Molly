package server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.json.simple.JSONObject;

import java.util.Set;

import classes.Channel;

public class ChannelManager {
public static Map<String, Channel> channels = new HashMap<String, Channel>();
public static Map<String, ArrayList<String> > favorites = new HashMap<String, ArrayList<String> >();
public static WebsocketEndpoint ws;

public static Channel createChannel(String clientId, String channelName) {
	String channelId = clientId;       // for now.
	
	if (exists(channelId)) {
		return channels.get(channelId);
	}
	
	channels.put(channelId, new Channel(clientId, channelId, channelName));
	emitUpdate();
	return channels.get(channelId);
}

public static void removeChannel(String channelId) {
	if (exists(channelId)) {
		channels.remove(channelId);
		emitUpdate();
	}
}

public static void startChannel(String channelId) {
	if (exists(channelId)) {
		channels.get(channelId).goLive();
//		emitUpdate();
	}
}

public static void stopChannel(String channelId) {
	if (exists(channelId)) {
		channels.get(channelId).goOffline();
//		emitUpdate();
	}
}

public static boolean exists(String channelId) {
	Channel ch = channels.get(channelId);
	return (ch != null);
}

public static Channel getChannel(String channelId) {
	if (exists(channelId)) {
		return channels.get(channelId);
	} else return null;
}

public static Map<String, Channel> getChannelsByClientId(String clientId) {
	Map<String, Channel> outputMap = new HashMap<String, Channel>();

	for (Entry<String, Channel> chEntry : channels.entrySet()) {
		if (chEntry.getValue().clientId.equals(clientId)) {
			outputMap.put(chEntry.getKey(), chEntry.getValue());
		}
	}

	return outputMap;       // can be empty
}

public static void addChannelToFavorites(String clientID, String channelID){
	if(favorites.containsKey(clientID)){
		favorites.get(clientID).add(channelID);
	}
	else{
		ArrayList<String> temp = new ArrayList<String>();
		temp.add(channelID);
		favorites.put(clientID, temp);
	}
}

public static ArrayList<String> getFavorites(String clientID){
	if(favorites.containsKey(clientID)){
		return favorites.get(clientID);
	}
	else{
		ArrayList<String> temp = new ArrayList<String>();
		return temp;
	}
}

public static void emitUpdate() {
	JSONObject msg = new JSONObject();
	msg.put("emit", "channels_list_updated");
	ws.sendAll(msg);
}

public static int size() {
	return channels.size();
}

}
