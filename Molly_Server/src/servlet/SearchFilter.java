package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import sql.UserDataManager;

/**
 * Servlet implementation class SearchFilter
 */
@WebServlet("/SearchFilter")
public class SearchFilter extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchFilter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		String clientID = request.getParameter("clientID");
//		String[] tags = UserDataManager.getClientTags(clientID);
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
		
	}

	
	

}
