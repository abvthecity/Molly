package messages;

public class SongChangedMessage extends Message{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4906103514620887464L;
	public SongChangedMessage(String clientID, String isDJ, String isLive, String currDJ) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
	}

}
