package messages;

public class ChangeSongMessage extends Message{
//DJ telling server that he changed the song
	/**
	 * 
	 */
	private static final long serialVersionUID = -6893386673106745046L;
	public ChangeSongMessage(String clientID, String isDJ, String isLive, String currDJ) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
	}

}
