package server;

import java.util.HashMap;
import java.util.Map;

import classes.Channel;

public class MainServer {
	private static Map<String, Channel> channelIDToChannelMap = new HashMap<String, Channel>();
	
	public static void startThread(String channelID){
		channelIDToChannelMap.get(channelID).start();
	}
}
