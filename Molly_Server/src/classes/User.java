package classes;


public class User {
	
	
	public String clientID;
	public String[] clientTags;
	public boolean isClienDJ;
	public String[] clienBookmarks;
	
	
	public User (String cID, String[] cTags, boolean isDJ, String[] bookmark){
		this.clientID = cID;
		this.clientTags = cTags;
		this.isClienDJ = isDJ;
		this.clienBookmarks = bookmark;
		
	}
	
	public String getClientID(){
		return clientID;
	
	}
	public String[] getClientTags(){
		return clientTags;
	
	}
	public boolean getIfCLientIsDJ(){
		return isClienDJ;
	}
	
	public String[] getClientBookmarks(){
		return getClientBookmarks();
		
	}
	public void setClientID(String cId){
		this.clientID = cId;
	}
	
	public void addClientTags(int pos, String cTag){
		this.clientTags[pos]=cTag;
	}
	
	public void setClientIsDJ(boolean isDJ){
		this.isClienDJ = isDJ;
	}
	public void addClientBookmarks(String[] bookmarks){
		this.clienBookmarks=bookmarks;
	}

}
