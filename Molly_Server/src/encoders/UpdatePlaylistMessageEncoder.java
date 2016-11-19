package encoders;

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
		return null;
	}

}
