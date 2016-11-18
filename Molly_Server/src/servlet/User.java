package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.User;

/**
 * Servlet implementation class User
 */
@WebServlet("/User")
public class User extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public User() {
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
				User u = UserDataManager.getUser(clientID);
				String [] tags = u.getClientTags();
				Integer [] bookmarks = u.getBookmarks();
				String b;
				if(u.getIfClientIsDJ()){
					b = "true";
				}
				else{
					b = "false";
				}
				String jsonObject = "{\"clientID\": \""+u.getClientID+"\", \"clientTags\": [";
				for(int i = 0; i< tags.length; i++){
					jsonObject += "{\""+tags[i]+"\"}";
					if(i!=4){
						jsonObject += ", ";
					}
				}
				jsonObject += "], \"isClientDJ\": \""+b+"\", \"bookmarks\": [";
				for(int i = 0; i< bookmarks.length; i++){
					jsonObject += "{\""+bookmarks[i]+"\"}";
					if(i!=bookmarks.length - 1){
						jsonObject += ", ";
					}
				}
				jsonObject += "]}";
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
		//doGet(request, response);
		String clientID=request.getParameter("clientID"); 
		String[] tags =request.getParameterValues("tags");
		//String isDJ = request.getParameter("isDJ"); 
		//String email = request.getParameter("email");
		Integer[] clientBookmarks = new Integer[50];
		UserDataManager.createUser(clientID, tags, false, clientBookmarks);
	}

}
