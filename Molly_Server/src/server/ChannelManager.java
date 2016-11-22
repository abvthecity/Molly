package server;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import classes.Channel;

public class ChannelManager {
public static Map<String, Channel> channels = new HashMap<String, Channel>();
public static WebsocketEndpoint ws;

public static Channel createChannel(String clientId, String channelName) {
	String channelId = clientId;       // for now.
	
	if (exists(channelId)) {
		return channels.get(channelId);
	}
	
	channels.put(channelId, new Channel(clientId, channelId, channelName));
	return channels.get(channelId);
}

public static void removeChannel(String channelId) {
	if (exists(channelId)) {
		channels.remove(channelId);
	}
}

public static void startChannel(String channelId) {
	if (exists(channelId)) {
		channels.get(channelId).goLive();
	}
}

public static void stopChannel(String channelId) {
	if (exists(channelId)) {
		channels.get(channelId).goOffline();
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

public static int size() {
	return channels.size();
}

}