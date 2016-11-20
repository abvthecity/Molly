package server;

import java.util.HashMap;
import java.util.Map;

import classes.Channel;

public class MainServer {
	public static Map<String, Channel> channelIDToChannelMap = new HashMap<String, Channel>();
	
	public static Map<String, Channel> getChannelIDToChannelMap(){
		return channelIDToChannelMap;
	}
//	public static void startThread(String channelID){
//		channelIDToChannelMap.get(channelID).start();
//	}

}
