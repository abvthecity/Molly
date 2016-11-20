package messages;

import java.util.ArrayList;

public class UpdatePlaylistMessage extends Message{
	private ArrayList<String> newPlaylist;
	/**
	 * 
	 */
	private static final long serialVersionUID = -4593834442558459406L;
	public UpdatePlaylistMessage(String clientID, String isDJ, String isLive, String currDJ, ArrayList<String> newPlaylist) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.newPlaylist = newPlaylist;
	}
	public ArrayList<String> getNewPlaylist() {
		return newPlaylist;
	}
	public void setNewPlaylist(ArrayList<String> newPlaylist) {
		this.newPlaylist = newPlaylist;
	}
}
