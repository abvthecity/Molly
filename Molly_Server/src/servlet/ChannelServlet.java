package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import classes.Channel;
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
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String clientID = request.getParameter("clientID");
		Channel c = ChannelDataManager.getChannel(clientID);
		//String clientID = c.getClientID();
		String[] channelTags = c.getChannelTags();
		Integer numChannelSubscribers = c.getNumChannelSubscribers();
		Integer numChannelLikes = c.getNumChannelLikes();
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();      
		
		//Create String to send in response to get request
		String jsonObject = "{\"clientID\": \""+clientID+"\", \"channelTags\": [";
		for(int i = 0; i< channelTags.length; i++){
			jsonObject += "{\""+channelTags[i]+"\"}";
			if(i!=4){
				jsonObject += ", ";
			}
		}
		jsonObject += "], \"numChannelSubscribers\": \""+numChannelSubscribers+"\", \"numChannelLikes\": \""+
				numChannelLikes+"\"}";
		
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
		String[] channelTags =request.getParameterValues("channelTags");
		//String isDJ = request.getParameter("isDJ"); 
		//String email = request.getParameter("email");
		//String[] clientBookmarks = new String[50];
		ChannelDataManager.createChannel(clientID, channelTags, 0, 0);
		Channel c = new Channel(clientID, channelTags, 0, 0);//insert in sql
		UserDataManager.makeDJ(clientID); //update in sql
		for(int i=0; i<5; i++){
			TagDataManager.addChannelForTag(channelTags[i], clientID);
		}
		//startThread(clientID);
	}

}
