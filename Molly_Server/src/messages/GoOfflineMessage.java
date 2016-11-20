 package messages;

public class GoOfflineMessage extends Message{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1239824435504064183L;
	public GoOfflineMessage(String clientID, String isDJ, String isLive, String currDJ) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
	}

}
