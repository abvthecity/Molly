package classes;


public class Channel {

	//public int channelID;
	public String clientID;
	public String[] channelTags;
	public int numChannelSubscribers;
	public int numChannelLikes; 
	
	
	public Channel( String clientId, String[] channelTags, int numSubscribers, int numlikes ){
		//this.channelID = channelId;
		this.clientID = clientId;
		this.channelTags = channelTags;
		this.numChannelSubscribers = numSubscribers;
		this.numChannelLikes = numlikes;
		
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
}
