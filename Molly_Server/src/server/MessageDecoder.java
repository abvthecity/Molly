package server;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import org.json.JSONException;
import org.json.JSONObject;

import messages.AddSongToPlaylistMessage;
import messages.Message;

/* Decode a JSON message into a Message object */
public class MessageDecoder implements Decoder.Text<Message> {

	private Map<String, String> messageMap;

	@Override
	public void init(EndpointConfig ec) {
	}

	@Override
	public void destroy() {
	}

	/* Create a new Message object if the message can be decoded */
	@Override
	public Message decode(String string) throws DecodeException {
		Message msg = null;
		if (willDecode(string)) {
			switch (messageMap.get("type")) {
			case "AddSongToPlaylist":
				msg = new AddSongToPlaylistMessage(messageMap.get("clientID"), messageMap.get("isDJ"),
						messageMap.get("isLive"), messageMap.get("currDJ"), messageMap.get("songURI"));
				
				break;
			case "GoLive":
				// msg = new
			case "GoOffline":
				// msg = new
			case "JoinChannel":
				// msg = new
			case "ChangeSong":
				// msg = new
			}
		} else {
			throw new DecodeException(string, "[Message] Can't decode.");
		}
		return msg;
	}

	/*
	 * Decode a JSON message into a Map and check if it contains all the
	 * required fields according to its type.
	 */
	@Override
	public boolean willDecode(String string) {

		// Convert JSON data from the message into a name-value map...
		HashMap<String, Object> map = new HashMap<String, Object>();
		JSONObject jObject;
		try {
			jObject = new JSONObject(string);
			Iterator<?> keys = jObject.keys();

			while (keys.hasNext()) {
				String key = (String) keys.next();
				String value = jObject.getString(key);
				map.put(key, value);
			}
			switch ((String) map.get("type")) {

			case "AddSongToPlaylist":
				if(map.containsKey("clientID") && map.containsKey("isDJ") && map.containsKey("islive")
						&& map.containsKey("currDJ") && map.containsKey("songURI")){
					return true;
				}
				else{
					return false;
				}
				//break;
			case "GoLive":
				// msg = new
			case "GoOffline":
				// msg = new
			case "JoinChannel":
				// msg = new
			case "ChangeSong":
				// msg = new
			}

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

		// Check if the message has all the fields for its message type...
		return false;
	}

}
