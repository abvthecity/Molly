package classes;


public class User {
	
	
	public String clientID;
	public String[] clientTags;
	public boolean isClienDJ;
	public String[] clienBookmarks;
	
	
	public User (String cID, String[] cTags, boolean isDj, String[] bookmark){
		this.clientID = cID;
		this.clientTags = cTags;
		this.isClienDJ = isDj;
		this.clienBookmarks = bookmark;
		
	}
	
	public String getClientID(){
		return clientID;
	
	}
	public String[] getClientTags(){
		return clientTags;
	
	}
	public boolean getIfCLienIsDj(){
		return isClienDJ;
	}
	
	public String[] getClientBookmarks(){
		return clientBookmarks;
		
	}
	public void setClienID(String cId){
		this.clientID = cId;
	}
	
	public void addClienTags(int pos, String cTag){
		this.clientTags[pos]=cTag;
	}
	
	public void setClientIsDj(boolean isDj){
		this.isClienDJ = isDj;
	}
	public void addClientBookmarks(int pos, int bookmark){
		this.clienBookmarks[pos]=bookmark;
	}

}
