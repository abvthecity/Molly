package messages;

import java.io.Serializable;

public class Message implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1166491784928235269L;
	protected String clientID;
	protected String isDJ;
	protected String isLive;
	protected String currDJ; //if the message is to/from a listener, which channel is he currently tuned into
	public String getClientID() {
		return clientID;
	}
	public void setClientID(String clientID) {
		this.clientID = clientID;
	}
	public String getIsDJ() {
		return isDJ;
	}
	public void setIsDJ(String isDJ) {
		this.isDJ = isDJ;
	}
	public String getIsLive() {
		return isLive;
	}
	public void setIsLive(String isLive) {
		this.isLive = isLive;
	}
	public String getCurrDJ() {
		return currDJ;
	}
	public void setCurrDJ(String currDJ) {
		this.currDJ = currDJ;
	}

}
