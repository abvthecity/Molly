package servlet;

import java.io.IOException;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.UIManager;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import server.ChannelManager;
import sql.FavoriteDataManager;
import sql.UserDataManager;

/**
 * Servlet implementation class Bookmarks
 */
@WebServlet("/Bookmarks")
public class Bookmarks extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Bookmarks() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String clientID = request.getParameter("clientID");
		//String[] bookmarks = FavoriteDataManager.getFavorites(clientID);//search in sql
		ArrayList<String> bookmarks = ChannelManager.getFavorites(clientID);
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();     
		
//		Map<String, String[]> map = new HashMap<String, String[]>();
//		map.put("clientIsDJ", bookmarks);
//    	String json = JSONValue.toJSONString(map);
    	JSONObject obj = new JSONObject();
    	JSONArray list = new JSONArray();
    	for(int i = 0; i< bookmarks.size(); i++){
    		if(bookmarks.get(i) != null){
    			list.add(bookmarks.get(i));
    		}
    		
    	}
    	

    	obj.put("favorites", list);
		String json = obj.toString();
		//Create String to send in response to get request
//		String jsonObject = "\"clientFavorites\": [";
//		for(int i = 0; i< bookmarks.length; i++){
//			jsonObject += "{\""+bookmarks[i]+"\"}";
//			if(i!=bookmarks.length - 1){
//				jsonObject += ", ";
//			}
//		}
//		jsonObject += "]}";
		
		// Assuming your json object is **jsonObject**, perform the following, it will return your json object  
		out.print(json);
		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
			String clientID = request.getParameter("userClientID");
			String channelID = request.getParameter("channelClientID");
			//FavoriteDataManager.addFavorite(clientID, channelID);
			ChannelManager.addChannelToFavorites(clientID, channelID);
	}

}
