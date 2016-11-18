package classes;


public class Channel {

	//public int channelID;
	public String clientID;
	public String[] channelTags;
	public int numChannelSubscribers;
	public int numChannelLikes; 
	
	
	public channel( String clientId, String[] channelTags, int numSubscribers, int numlikes ){
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
	public int getNumChannelLikess(){
		return numChannelLikes;
		
	}
	
//	public void setChannelID(int chId){
//		 channelID = chId;
//		
//	}
	public void getClientID(String clientId){
		return clientID = clientId;
		
	}
	public  addChannelTags(int pos, String[]  tags){
		 channelTags[pos]=tags;
		
	}
	public void setNumChannelSubscribers(int numSubscribes){
		 numChannelSubscribers=numSubscribes;
		
	}
	public void setNumChannelLikes(int numLikes){
		 numChannelLikes = numLikes;
		
	}
}
