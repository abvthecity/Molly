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

	static User  user = null;
    
	
	public  static void createUser(String clientId, String[] clientTags, boolean isClienDJ, String[] bookmarks ){
		
		Connection conn = null;
		PreparedStatement ps = null;
		String bm="", tags="";
		try {
			

			for(int i=0; i<clientTags.length; i++){
				tags +=clientTags[i]+":";
			}
			if(bookmarks.equals("null")){
				for(int i=0; i<bookmarks.length; i++){
					bm +=bookmarks[i]+":";
				}
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
		finally {
			try {
				ps.close();
			} catch (SQLException e) { /* Do nothing */ }
	
			try {
				conn.close();
			} catch (SQLException e) { /* Do nothing */ }			
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
		finally {
			try {
				ps.close();
			} catch (SQLException e) { /* Do nothing */ }
	
			try {
				conn.close();
			} catch (SQLException e) { /* Do nothing */ }			
		}
		return user;
	}
	
	//makeDj changes the status of the user to true if it's a DJ
	public static void makeDJ(String clientID){
		
		//System.out.println("UserDataManager.createUser| " );
				
		if (user != null ) {
			
			user.setClientIsDJ(true);
			//System.out.println("UserDataManager : "+user.getIfCLientIsDJ());
			Connection conn = null;
			PreparedStatement ps = null;
			try {
				Class.forName(JDBC_DRIVER);
				conn = DriverManager.getConnection(DB_URL);
				ps = conn.prepareStatement("UPDATE Users SET clientDJ=true WHERE clientID=?");
				ps.setString(1, clientID);
				int result = ps.executeUpdate();
				if (result == 0) {
					System.out.println("UserDataManager.createUser|user: clientID " 
							+ clientID + " not in database, couldn't set as dj.");
				}
				
			} catch (SQLException sqle) {
				System.out.println ("UserDataManager SQLException: " + sqle.getMessage());
			} catch (ClassNotFoundException cnfe) {
				System.out.println ("UserDataManager ClassNotFoundException: " + cnfe.getMessage());
			} finally {
				try {
					ps.close();
				} catch (SQLException e) { /* Do nothing */ }
				try {
					conn.close();
				} catch (SQLException e) { /* Do nothing */ }
			}
		}

		
	}

}
