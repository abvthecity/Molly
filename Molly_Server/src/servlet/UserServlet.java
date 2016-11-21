package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.json.simple.JSONValue;

import classes.User;
import sql.UserDataManager;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
    	Map<String, String> map = new HashMap<String, String>();

    	String clientID = request.getParameter("clientID");
		User u = UserDataManager.getUser(clientID); //search in sql
		
    	map.put("clientId", clientID);
    	map.put("clientIsDJ", u.getIfCLientIsDJ() ? "true" : "false");
    	String json = JSONValue.toJSONString(map);
    	
		//String json = "{\"clientID\": \""+clientID+"\", \"isDJ\": \""+u.getIfCLientIsDJ()+"\"}";
		
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
//		String[] tags =request.getParameterValues("tags");
		//String isDJ = request.getParameter("isDJ"); 
		//String email = request.getParameter("email");
		String[] clientBookmarks = new String[50];
		String[] tags = new String[5];
		UserDataManager.createUser(clientID, tags, false, clientBookmarks);
//		HashSet<String> channelsBasedOnTags = new HashSet<String>();
//		for(int i = 0; i<5; i++){
//			String [] arr = TagDataManager.getChannelsForTag(tags[i]);
//			for(int j = 0; j < arr.length; j++){
//				channelsBasedOnTags.add(arr[j]);
//			}
//		}
//		String jsonObject = "{\"clientID\": \""+clientID+"\", \"channelsBasedOnTags\": [";
//		Iterator<String> it = channelsBasedOnTags.iterator();
//		int count = 0;
//		while(it.hasNext()){
//			count++;
//			jsonObject += "{\""+it.next()+"\"}";
//			if(count != channelsBasedOnTags.size()){
//				jsonObject += ", ";
//			}
//			
//		}
//		jsonObject += "]}";
//		response.setContentType("application/json");
//		PrintWriter out = response.getWriter(); 
//		out.print(jsonObject);
//		out.flush();
		
		//insert in sql
	}

}
