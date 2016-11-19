package classes;

import java.util.ArrayList;
import java.util.Queue;

public class Channel extends Thread{

	//public int channelID;
	public String clientID;
	public String[] channelTags;
	public int numChannelSubscribers;
	public int numChannelLikes; 
	public ArrayList<String> songURIPlaylist;
	
	
	public Channel( String clientId, String[] channelTags, int numSubscribers, int numlikes ){
		//this.channelID = channelId;
		this.clientID = clientId;
		this.channelTags = channelTags;
		this.numChannelSubscribers = numSubscribers;
		this.numChannelLikes = numlikes;
		this.songURIPlaylist = new ArrayList<String>();
	}
	
//	public int getChannelID(){
//		return channelID;
//		
//	}
	public String getClientID(){
		return clientID;
		
	}
	public String[] getChannelTags(){
		return channelTags;
		
	}
	public int getNumChannelSubscribers(){
		return numChannelSubscribers;
		
	}
	public int getNumChannelLikes(){
		return numChannelLikes;
		
	}
	
//	public void setChannelID(int chId){
//		 channelID = chId;
//		
//	}
	public void setClientID(String clientId){
		this.clientID = clientId;
		
	}
	public void addChannelTags(String [] tags){
		 this.channelTags = tags;
		
	}
	public void setNumChannelSubscribers(int numSubscribes){
		 this.numChannelSubscribers=numSubscribes;
		
	}
	public void setNumChannelLikes(int numLikes){
		 this.numChannelLikes = numLikes;
		
	}
	
	public void addSongToPlaylist(String songURI){
		songURIPlaylist.add(songURI);
	}
	
	public ArrayList<String> getSongURIPlaylist(){
		return songURIPlaylist;
	}
}
