package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/**
 * Servlet implementation class Reaction
 */
@WebServlet("/Reaction")
public class Reaction extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Reaction() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		String clientID = request.getParameter("clientID");
//		Integer likes = ChannelDataManager.getLikes(clientID); //search in sql
//		response.setContentType("application/json");
//		PrintWriter out = response.getWriter();      
//		
//		//Create String to send in response to get request
//		String jsonObject = "{\"likes\": \""+likes+"\"}";
//		
//		// Assuming your json object is **jsonObject**, perform the following, it will return your json object  
//		out.print(jsonObject);
//		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		String clientID = request.getParameter("clientID"); 
//		ChannelDataManager.addLikes(clientID); //update in sql
	}

}
