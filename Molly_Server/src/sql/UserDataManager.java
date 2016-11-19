 package sql;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import classes.User;

public  class UserDataManager {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost/SpotifyDJ?user=root&password=lertom30&useSSL = false";
	//static  ByteArrayOutputStream bout;
	//static  DataOutputStream dout;
	
//	static ByteArrayInputStream bin;
//    static DataInputStream din;
//    static BufferedReader br;
   
    
	public  static void CreateUser(String clientId, String[] clientTags, boolean isClienDJ, String[] bookmarks ){
		User  user = null;
		Connection conn = null;
		PreparedStatement ps = null;
		 String bm="", tags="";
		try {
		
//		 bout = new ByteArrayOutputStream();
//	     dout = new DataOutputStream(bout);
//	     
//	    for (String t : clientTags) {
//	        dout.writeBytes(t);
//	    }
//	    dout.close();
//	    byte[] asBytes = bout.toByteArray();
//	    
//	    for (String bm : bookmarks) {
//	        
//				dout.writeBytes(bm);
//	    }
//	    dout.close();
//	    byte[] asBytes1 = bout.toByteArray();
			
			for(int i=0; i<clientTags.length; i++){
				tags +=clientTags[i]+":";
			}
			for(int i=0; i<bookmarks.length; i++){
				bm +=bookmarks[i]+":";
			}
	   
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("INSERT INTO Users (clientID, clientTags, clientDJ, clientBookmarks) VALUES (?, ?, ?, ?);");
			ps.setString(1, clientId);
			ps.setString(2, tags);
			ps.setBoolean(3, isClienDJ);
			ps.setString(4, bm);
			ps.executeUpdate();
			user = new User(clientId, clientTags,isClienDJ, bookmarks);
			
		} 
		catch (ClassNotFoundException cnfe) {
			// TODO Auto-generated catch block
			cnfe.printStackTrace();
		}
		catch (SQLException sqle) {
			// TODO Auto-generated catch block
			sqle.printStackTrace();
		}
			
	}
	
	@SuppressWarnings("deprecation")
	public static  User getUser(String clientID){
		
		
		User user = null;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String[] tags;
		String[] bm;
		
		boolean isDJ;
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT * FROM Users WHERE clientID=?");
			
			
			tags = new String[5];
			bm = new String[50];
	        
	        
	        
			ps.setString(1, clientID);
			rs = ps.executeQuery();
			if (rs.next()) {
				tags = rs.getString("clientTags").split(":");
				bm = rs.getString("clientBookmarks").split(":");
				isDJ = rs.getBoolean("clientDJ");
				
				user= new User(clientID, tags, isDJ, bm);
				System.out.println("here   "+user.getClientID());
			}
		}catch (ClassNotFoundException e){
			e.getStackTrace();
	
		}
		catch (SQLException e){
			e.getStackTrace();
		}
		return user;
	}

}
