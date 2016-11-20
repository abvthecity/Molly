package messages;

public class GoLiveMessage extends Message{

	/**
	 * 
	 */
	private static final long serialVersionUID = 156763884295090351L;
	public GoLiveMessage(String clientID, String isDJ, String isLive, String currDJ) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
	}


}
