package messages;

import java.util.ArrayList;

public class JoinedChannelSuccessfullyMessage extends Message {
	private String currSongURI;
	private ArrayList<String> playlist;
	private Integer currSongPosition; 
 	/**
	 * 
	 */
	private static final long serialVersionUID = -4409020621135102978L;
	public JoinedChannelSuccessfullyMessage(String clientID, String isDJ, String isLive, String currDJ, 
			ArrayList<String> playlist, String currSongURI, Integer currSongPosition) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.playlist = playlist;
		this.currSongURI = currSongURI;
		this.currSongPosition = currSongPosition;
	}
	public String getCurrSongURI() {
		return currSongURI;
	}
	public void setCurrSongURI(String currSongURI) {
		this.currSongURI = currSongURI;
	}
	public ArrayList<String> getPlaylist() {
		return playlist;
	}
	public void setPlaylist(ArrayList<String> playlist) {
		this.playlist = playlist;
	}
	public Integer getCurrSongPosition() {
		return currSongPosition;
	}
	public void setCurrSongPosition(Integer currSongPosition) {
		this.currSongPosition = currSongPosition;
	}

}
