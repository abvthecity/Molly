package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;


import classes.User;
import sql.TagDataManager;
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
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		// Get the printwriter object from response to write the required json object to the output stream
				String clientID = request.getParameter("clientID");
				User u = UserDataManager.getUser(clientID); //search in sql
				String b;
				if(u.getIfCLientIsDJ()){
					b = "true";
				}
				else{
					b = "false";
				}
				String jsonObject = "{\"clientID\": \""+clientID+"\", \"isClientDJ\": \""+b+"\"}";
				response.setContentType("application/json");
				PrintWriter out = response.getWriter();      
				
				//Create String to send in response to get request
				//String jsonObject = "{\"test\": \"Succesfull Ajax Call\"}";
				
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
		
		UserDataManager.createUser(clientID, false);
		
		
		//insert in sql
	}

}
