package encoders;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import messages.SongChangedMessage;
/* Encode a Message object as JSON.*/
public class SongChangedMessageEncoder implements Encoder.Text<SongChangedMessage> {
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String encode(SongChangedMessage arg0) throws EncodeException {
		// TODO Auto-generated method stub
		return null;
	}

}
