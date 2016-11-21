package messages;

public class AddSongToPlaylistMessage extends Message{
	private String songURI;
	private Integer songDuration;

	public AddSongToPlaylistMessage(String clientID, String isDJ, String isLive, String currDJ, String songURI,Integer songDuration) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.songURI = currDJ;
		this.songDuration = songDuration;
	}

	public String getSongURI() {
		return songURI;
	}

	public Integer getSongDuration() {
		return songDuration;
	}

	public void setSongDuration(Integer songDuration) {
		this.songDuration = songDuration;
	}

	public void setSongURI(String songURI) {
		this.songURI = songURI;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 7743893172843841937L;

}
