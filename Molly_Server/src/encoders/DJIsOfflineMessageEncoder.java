package encoders;

import java.util.ArrayList;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import messages.DJIsOfflineMessage;
import messages.UpdatePlaylistMessage;

public class DJIsOfflineMessageEncoder implements Encoder.Text<DJIsOfflineMessage> {
	
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public String encode(DJIsOfflineMessage arg0) throws EncodeException {
		// TODO Auto-generated method stub
		String clientID = arg0.getClientID();
		String isDJ = arg0.getIsDJ();
		String isLive = arg0.getIsLive();
		String currDJ = arg0.getCurrDJ();
		String whichDJIsOffline = arg0.getWhichDJIsOffline();
		String jsonObject = "{\"type\": \"UpdatePlaylistMessage\", \"isDJ\": \""+isDJ+"\", \"isLive\": \""+
		isLive+"\", \"currDJ\": \""+currDJ+"\", \"whichDJIsOffline\": \""+whichDJIsOffline+"\"}";
		return jsonObject;
	}
	
}
