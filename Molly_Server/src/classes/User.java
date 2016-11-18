package sql;

public class User {
	
	
	public String clientID;
	public String[] clientTags;
	public boolean isClienDJ;
	public int[] clienBookmarks;
	
	
	public User (String cID, String[] cTags, boolean isDj, int[] bookmark){
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
	
	public int[] getBookmarks(){
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
	public void addBookmarks(int pos, int bookmark){
		this.clienBookmarks[pos]=bookmark;
	}

}
