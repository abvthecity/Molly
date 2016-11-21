package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import classes.Channel;
import classes.Song;
import server.MainServer;
import sql.ChannelDataManager;
import sql.UserDataManager;

/**
 * Servlet implementation class ChannelServlet
 */
@WebServlet("/ChannelServlet")
public class ChannelServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
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
		String clientID = request.getParameter("clientID");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();      
		String channelName = MainServer.channelIDToChannelMap.get(clientID).getChannelName();
		//Create String to send in response to get request
//		String jsonObject = "{\"clientID\": \""+clientID+"\", \"channelName\": \""+channelName+"\", \"playlist\": \"[";
		ArrayList<String> sup = MainServer.channelIDToChannelMap.get(clientID).getSongURIPlaylist();
//		for(int i = 0; i<sup.size(); i++){
//			jsonObject += "{\""+sup.get(i)+"\"}";
//			if(i != sup.size()-1){
//				jsonObject += ", ";
//			}
//		}
//		jsonObject += "], \"currentSongURI\": \""+MainServer.channelIDToChannelMap.get(clientID).getCurrentSongURI()+"\"}";
//		
		
		JSONObject obj = new JSONObject();
		obj.put("clientID", clientID);
		obj.put("channelName", channelName);
    	JSONArray list = new JSONArray();
    	for(int i = 0; i< sup.size(); i++){
    		if(sup.get(i) != null){
    			list.add(sup.get(i));
    		}
    		
    	}
     	obj.put("playlist", list);
     	obj.put("currentSongURI", MainServer.channelIDToChannelMap.get(clientID).getCurrentSongURI());
		String json = obj.toString();

		
		// Assuming your json object is **jsonObject**, perform the following, it will return your json object  
		out.print(json);
		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String clientID=request.getParameter("clientID");
		String channelName = request.getParameter("channelName"); 
		Channel c = new Channel(clientID, channelName);
		MainServer.channelIDToChannelMap.put(clientID, c);
		//test case
//		ArrayList<Song> playlist = new ArrayList<Song>();
//		playlist.add(new Song("abcd", 45));
//		playlist.add(new Song("efgh", 45));
//		playlist.add(new Song("ijkl", 45));
//		String name = c.getChannelName();
//		if(c.equals("Rachit")){
//			c.setSongURIPlaylist(playlist);
//			c.setCurrentSongURI("abcd");
//		}
		
		String[] tags = new String[5];
		ChannelDataManager.createChannel(clientID, channelName, tags, 0, 0);
		UserDataManager.makeDJ(clientID); //update in sql

	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String clientID=request.getParameter("clientID");
		String channelName = request.getParameter("channelName");
		ChannelDataManager.updateChannelName(clientID, channelName);
		
	}	
	

}
