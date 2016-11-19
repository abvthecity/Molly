package servlet;

import java.io.IOException;

import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.UIManager;

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
		String[] bookmarks = UserDataManager.getClientBookmarks();//search in sql
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();      
		
		//Create String to send in response to get request
		String jsonObject = "\"clientBookmarks\": [";
		for(int i = 0; i< bookmarks.length; i++){
			jsonObject += "{\""+bookmarks[i]+"\"}";
			if(i!=bookmarks.length - 1){
				jsonObject += ", ";
			}
		}
		jsonObject += "]}";
		
		// Assuming your json object is **jsonObject**, perform the following, it will return your json object  
		out.print(jsonObject);
		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
			String clientID = request.getParameter("userClientID");
			String channelID = request.getParameter("DJClientID");
			UserDataManager.addClientBookmark(clientID, channelID);
	}

}
