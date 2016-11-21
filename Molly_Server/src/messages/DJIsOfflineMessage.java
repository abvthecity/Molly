package messages;

public class DJIsOfflineMessage extends Message {
	private String whichDJIsOffline;
	/**
	 *
	 */
	private static final long serialVersionUID = 9129247594569861762L;
	public String getWhichDJIsOffline() {
		return whichDJIsOffline;
	}
	public void setWhichDJIsOffline(String whichDJIsOffline) {
		this.whichDJIsOffline = whichDJIsOffline;
	}
	public DJIsOfflineMessage(String clientID, String isDJ, String isLive, String currDJ, String whichDJIsOffline) {
		// TODO Auto-generated constructor stub
		this.clientID = clientID;
		this.isDJ = isDJ;
		this.isLive = isLive;
		this.currDJ = currDJ;
		this.whichDJIsOffline = whichDJIsOffline;
	}
}
