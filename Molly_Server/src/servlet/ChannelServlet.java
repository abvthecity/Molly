package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import classes.Channel;
import server.MainServer;
import sql.ChannelDataManager;
import sql.TagDataManager;
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
		
		//Create String to send in response to get request
		String jsonObject = "{\"clientID\": \""+clientID+"\", \"playlist\": \"[";
		ArrayList<String> sup = MainServer.channelIDToChannelMap.get(clientID).getSongURIPlaylist();
		for(int i = 0; i<sup.size(); i++){
			jsonObject += "{\""+sup.get(i)+"\"}";
			if(i != sup.size()-1){
				jsonObject += ", ";
			}
		}
		jsonObject += "], \"currentSongURI\": \""+MainServer.channelIDToChannelMap.get(clientID).getCurrentSongURI()+"\"}";
		
		
		// Assuming your json object is **jsonObject**, perform the following, it will return your json object  
		out.print(jsonObject);
		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String clientID=request.getParameter("clientID"); 
		Channel c = new Channel(clientID);
		UserDataManager.makeDJ(clientID); //update in sql

	}

}
