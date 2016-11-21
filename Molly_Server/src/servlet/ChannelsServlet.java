package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@WebServlet("/ChannelsServlet")
public class ChannelsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ChannelsServlet() {
        super();

		System.out.println("FUC");
        // TODO Auto-generated constructor stub
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("FUC");
		
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();  
		
		/*
	      {channels: [{
	        id: string
	        name: string,
	        favorite: bool,
	        currentTrackURI: string,
	        currentTrackTime: number,
	        currentTrackDuration: number
	      }]}
	    */
		
		
		JSONArray channels = new JSONArray();
		for (int i = 0; i < 5; i ++) {
			JSONObject obj = new JSONObject();
			obj.put("id", "clientId");
			obj.put("name", "Random Radio");
			obj.put("favorite", false);
			obj.put("currentTrackURI", "spotify:track:1zHlj4dQ8ZAtrayhuDDmkY");
			obj.put("currentTrackTime", 100);
			obj.put("currentTrackDuration", 204053);
			
			channels.add(obj);
		}
		
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("channels", channels);
		
		out.print(jsonObj.toString());
		out.flush();
	}

}
