package classes;


public class User {
	
	
	public String clientID;
	public boolean isClienDJ;
	
	
	public User (String cID, boolean isDJ){
		this.clientID = cID;
		this.isClienDJ = isDJ;
		
	}
	
	public String getClientID(){
		return clientID;
	
	}
	
	public boolean getIfCLientIsDJ(){
		return isClienDJ;
	}
	
	
	public void setClientID(String cId){
		this.clientID = cId;
	}
	


	
	public void setClientIsDJ(boolean isDJ){
		this.isClienDJ = isDJ;
	}
	

}
