package encoders;

import java.util.ArrayList;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import messages.DJIsOfflineMessage;
import messages.JoinedChannelSuccessfullyMessage;


public class JoinedChannelSuccessfullyMessageEncoder implements Encoder.Text<JoinedChannelSuccessfullyMessage>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public String encode(JoinedChannelSuccessfullyMessage arg0) throws EncodeException {
		String clientID = arg0.getClientID();
		String isDJ = arg0.getIsDJ();
		String isLive = arg0.getIsLive();
		String currDJ = arg0.getCurrDJ();
		ArrayList<String> playlist = arg0.getPlaylist();
		String currSongURI = arg0.getCurrSongURI();
		Integer currSongPosition = arg0.getCurrSongPosition();
		String jsonObject = "{\"type\": \"UpdatePlaylistMessage\", \"isDJ\": \""+isDJ+"\", \"isLive\": \""+
		isLive+"\", \"currDJ\": \""+currDJ+"\", \"playlist\": \"[";
		for(int i = 0; i<playlist.size(); i++){
			jsonObject += "{\""+playlist.get(i)+"\"}";
			if(i != playlist.size()-1){
				jsonObject += ", ";
			}
		}
		jsonObject += "], \"currentSongURI\": \""+currSongURI+"\", \"currentSongPosition\": \""+currSongPosition+"\"}";
		return null;
	}

}
