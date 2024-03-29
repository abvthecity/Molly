package encoders;

import java.util.ArrayList;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import messages.UpdatePlaylistMessage;

public class UpdatePlaylistMessageEncoder implements Encoder.Text<UpdatePlaylistMessage>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String encode(UpdatePlaylistMessage arg0) throws EncodeException {
		// TODO Auto-generated method stub
		String clientID = arg0.getClientID();
		String isDJ = arg0.getIsDJ();
		String isLive = arg0.getIsLive();
		String currDJ = arg0.getCurrDJ();
		ArrayList<String> newPlaylist = arg0.getNewPlaylist();
		String jsonObject = "{\"type\": \"UpdatePlaylistMessage\", \"isDJ\": \""+isDJ+"\", \"isLive\": \""+
		isLive+"\", \"currDJ\": \""+currDJ+"\", \"newPlaylist\": [";
		for(int i = 0; i < newPlaylist.size(); i++){
			jsonObject += "{\""+newPlaylist.get(i)+"\"}";
			if(i != newPlaylist.size()-1){
				jsonObject +=", ";
			}
		}
		jsonObject += "]}";
		return jsonObject;
	}

}
