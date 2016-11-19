package messages;

public class AddSongToPlaylistMessage extends Message{
	private String songURI;

	public AddSongToPlaylistMessage(String clientID, String isDJ, String isLive, String currDJ, String songURI) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.songURI = currDJ;
	}

	public String getSongURI() {
		return songURI;
	}

	public void setSongURI(String songURI) {
		this.songURI = songURI;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 7743893172843841937L;

}
