package sql;

public class Channel {

	public int channelID;
	public String clientID;
	public String[] channelTags;
	public int numChannelSubscribers;
	public int numChannelLikes; 
	
	
	public channel(int channelId, String clientId, String[] channelTags, int numSubscribers, int numlikes ){
		this.channelID = channelId;
		this.clientID = clientId;
		this.channelTags = channelTags;
		this.numChannelSubscribers = numSubscribers;
		this.numChannelLikes = numlikes;
		
	}
	
	public int getChannelID(){
		return channelID;
		
	}
	public String getClientID(){
		return clientID;
		
	}
	public String[] getChannelTags(){
		return channelTags;
		
	}
	public int getNumSubscribers(){
		return numChannelSubscribers;
		
	}
	public int getNumLikes(){
		return numChannelLikes;
		
	}
	
	public void setChannelID(int chId){
		 channelID = chId;
		
	}
	public void getClientID(String clientId){
		return clientID = clientId;
		
	}
	public  addChannelTags(int pos, String[]  tags){
		 channelTags[pos]=tags;
		
	}
	public void setNumSubscribers(int numSubscribes){
		 numChannelSubscribers=numSubscribes;
		
	}
	public void setNumLikes(int numLikes){
		 numChannelLikes = numLikes;
		
	}
}
