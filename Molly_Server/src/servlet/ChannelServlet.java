package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import classes.Channel;
import classes.Song;
import server.ChannelManager;
import sql.ChannelDataManager;

@WebServlet("/channel")
public class ChannelServlet extends HttpServlet {
private static final long serialVersionUID = 1L;
private static final JSONParser parser = new JSONParser();

/**
 * @see HttpServlet#HttpServlet()
 */
public ChannelServlet() {
	super();
	// TODO Auto-generated constructor stub
}

/**
 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
 */
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// set headers
	response.setContentType("application/json");
	PrintWriter out = response.getWriter();
	
	// get parameters
	String channelId = request.getParameter("id");

	// incorrect parameters
	if (channelId == null) {
		JSONObject obj = new JSONObject();
		obj.put("error", "No id specified");
		out.print(obj.toJSONString());
		out.flush();
		return;
	}

	// provided nonexistant channel
	if (!ChannelManager.exists(channelId)) {
		JSONObject obj = new JSONObject();
		obj.put("error", "channel does not exist");
		out.print(obj.toJSONString());
		out.flush();
		return;
	}

	Channel ch = ChannelManager.getChannel(channelId);
	
	
	JSONObject obj = ch.toJSON();

	out.print(obj.toJSONString());
	out.flush();
}

/**
 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
 */
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// set headers
	response.setContentType("application/json");
	PrintWriter out = response.getWriter();
	JSONObject req = new JSONObject();
	
	try {
		req = (JSONObject) parser.parse(getBody(request));
	} catch (ParseException e) {
		e.printStackTrace();
	}

	// get parameters
	String clientId = (String) req.get("host");
	String channelName = (String) req.get("name");

	// incorrect parameters
	if (clientId == null || channelName == null) {
		JSONObject obj = new JSONObject();
		obj.put("error", "requires both 'host' (your id) and 'name' (name of channel) parameters");
		out.print(obj.toJSONString());
		out.flush();
		return;
	}

//      Map<String, Channel> clientChannels = ChannelManager.getChannelsByClientId(clientId);

	Channel newChannel = ChannelManager.createChannel(clientId, channelName);
//	ChannelDataManager.createChannel(clientId, clientId, channelName);
	JSONObject channelObj = newChannel.toJSON();

	JSONObject obj = new JSONObject();

	obj.put("success", true);
	obj.put("channel", channelObj);

	out.print(obj.toJSONString());
	out.flush();

	// todo: database stuff

}

protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	String channelId = request.getParameter("channelId");
	String channelName = request.getParameter("channelName");
	ChannelManager.getChannel(channelId).setChannelName(channelName);
	ChannelDataManager.updateChannelName(channelId, channelName);

	// todo: database stuff
}

public static String getBody(HttpServletRequest request) throws IOException {

    String body = null;
    StringBuilder stringBuilder = new StringBuilder();
    BufferedReader bufferedReader = null;

    try {
        InputStream inputStream = request.getInputStream();
        if (inputStream != null) {
            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            char[] charBuffer = new char[128];
            int bytesRead = -1;
            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                stringBuilder.append(charBuffer, 0, bytesRead);
            }
        } else {
            stringBuilder.append("");
        }
    } catch (IOException ex) {
        throw ex;
    } finally {
        if (bufferedReader != null) {
            try {
                bufferedReader.close();
            } catch (IOException ex) {
                throw ex;
            }
        }
    }

    body = stringBuilder.toString();
    return body;
}

}
