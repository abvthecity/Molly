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

@WebServlet("/channel")
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
    	String id = request.getParameter("id");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();  
		
		/*
	      {
	        id: string
	        name: string,
	        favorite: bool,
	        currentTrackURI: string,
	        currentTrackTime: number,
	        currentTrackDuration: number
	      }
	    */
//		String channelName = MainServer.channelIDToChannelMap.get(clientID).getChannelName();
//		ArrayList<String> sup = MainServer.channelIDToChannelMap.get(clientID).getSongURIPlaylist();
		
		JSONObject obj = new JSONObject();
		
		System.out.println(System.currentTimeMillis());
		obj.put("id", "clientId");
		obj.put("name", "Random Radio");
		obj.put("favorite", false);
		obj.put("currentTrackURI", "spotify:track:4VqPOruhp5EdPBeR92t6lQ");
		obj.put("currentTrackTime", 0);
		obj.put("currentTrackDuration", 204053);
		
		JSONArray songQueue = new JSONArray();
    	for(int i = 0; i< 5; i++){
    		songQueue.add("spotify:track:0gITmnRWCcT5fiKRd9EgPn");
    	}
    	
    	obj.put("upNext", songQueue);
		
		obj.put("time", System.currentTimeMillis());
		
		out.print(obj.toString());
		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
//		String clientID=request.getParameter("clientID");
//		String channelName = request.getParameter("channelName"); 
//		Channel c = new Channel(clientID, channelName);
//		MainServer.channelIDToChannelMap.put(clientID, c);
//		//test case
////		ArrayList<Song> playlist = new ArrayList<Song>();
////		playlist.add(new Song("abcd", 45));
////		playlist.add(new Song("efgh", 45));
////		playlist.add(new Song("ijkl", 45));
////		String name = c.getChannelName();
////		if(c.equals("Rachit")){
////			c.setSongURIPlaylist(playlist);
////			c.setCurrentSongURI("abcd");
////		}
//		
//		String[] tags = new String[5];
//		ChannelDataManager.createChannel(clientID, channelName, tags, 0, 0);
//		UserDataManager.makeDJ(clientID); //update in sql

	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String clientID=request.getParameter("clientID");
		String channelName = request.getParameter("channelName");
		ChannelDataManager.updateChannelName(clientID, channelName);
		
	}	
	

}
