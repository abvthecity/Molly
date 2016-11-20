package messages;

public class JoinChannelMessage extends Message {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1375336583938391483L;
	private String channelID;
	
	public String getChannelID() {
		return channelID;
	}

	public void setChannelID(String channelID) {
		this.channelID = channelID;
	}

	public JoinChannelMessage(String clientID, String isDJ, String isLive, String currDJ, String channelID) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.channelID = channelID;
	}
}
