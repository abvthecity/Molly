package messages;

public class JoinChannelMessage extends Message {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1375336583938391483L;
	private String DJIWishToJoin;
	
	public String getDJIWishToJoin() {
		return DJIWishToJoin;
	}

	public void setDJIWishToJoin(String channelID) {
		this.DJIWishToJoin = channelID;
	}

	public JoinChannelMessage(String clientID, String isDJ, String isLive, String currDJ, String channelID) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.DJIWishToJoin = channelID;
	}
}
