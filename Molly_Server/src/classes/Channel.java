package classes;

import java.util.ArrayList;
import java.util.Queue;
import server.MainServer;

public class Channel extends Thread{

	//public int channelID;
	public String clientID;
	public String[] channelTags;
	public int numChannelSubscribers;
	public int numChannelLikes; 
	public boolean isLive;
	public ArrayList<Song> songPlaylist;

	public Song currentSong;
	
	public Channel( String clientId){
		//this.channelID = channelId;
		this.clientID = clientId;
//		this.channelTags = channelTags;
//		this.numChannelSubscribers = numSubscribers;
//		this.numChannelLikes = numlikes;
		this.isLive = false;
		this.start();
		MainServer.channelIDToChannelMap.put(clientID, this);
	}
	
//	public int getChannelID(){
//		return channelID;
//		
//	}
	public String getClientID(){
		return clientID;
		
	}
	public boolean isLive() {
		return isLive;
	}

	public void setLive(boolean isLive) {
		this.isLive = isLive;
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
	
	public void addSongToPlaylist(Song song){
		songPlaylist.add(song);
	}
	
	public ArrayList<String> getSongURIPlaylist(){
		ArrayList<String> arrSongURI = new ArrayList<String>();
		for(int i = 0; i <songPlaylist.size(); i++){
			arrSongURI.add(songPlaylist.get(i).getSongURI());
		}
		return arrSongURI;
	}
	
	public Song getCurrentSong() {
		return currentSong;
	}

	public void setCurrentSong(Song currentSong) {
		this.currentSong = currentSong;
	}

	
	public void run(){
		
	}
}
