package sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import classes.Channel;

public class TagDataManager {

	//initializing the Driver
		static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
		static final String DB_URL = "jdbc:mysql://localhost/SpotifyDJ?user=root&password=lertom30&useSSL = false";
		
		

	public static void addChannelForTag(String tag, String clientID){
		
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String clientIDs = "";
		
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT * FROM channelTags WHERE channelTag=?");
			
			ps.setString(1, tag);
			rs = ps.executeQuery();
			if (rs.next()) {
				clientIDs = rs.getString("channelClientID");
			}else{
				clientIDs="";
			}
			System.out.println("clientIDs in channeltag "+clientIDs);
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
		

		if(clientIDs.equals("")){
			
			String channelCientIDs= "";
			try {
				
				channelCientIDs = clientID+":";
		   
				Class.forName(JDBC_DRIVER);
				conn = DriverManager.getConnection(DB_URL);
				ps = conn.prepareStatement("INSERT INTO channelTags (channelTag, channelClientID ) VALUES (?, ?);");
				ps.setString(1, tag);
				ps.setString(2, channelCientIDs);
				
				ps.executeUpdate();
				
			}catch (ClassNotFoundException cnfe) {
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
			
		}else{
			try {
				clientIDs+=clientID+":";
				Class.forName(JDBC_DRIVER);
				conn = DriverManager.getConnection(DB_URL);
				ps = conn.prepareStatement("UPDATE ChannelTags SET channelClientID='"+clientIDs+"' WHERE channelTag=?");
				ps.setString(1, tag);
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
	
	public static String[] getChannelsForTag(String tag){
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String[] clientIDs = new String[50];
		
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT * FROM channelTags WHERE channelTag=?");
			
	
			ps.setString(1, tag);
			rs = ps.executeQuery();
			if (rs.next()) {
				clientIDs = rs.getString("channelClientID").split(":");
	
			}
		}catch (ClassNotFoundException e){
			e.getStackTrace();
	
		}
		catch (SQLException e){
			e.getStackTrace();
		}finally {
			try {
				ps.close();
			} catch (SQLException e) { /* Do nothing */ }
	
			try {
				conn.close();
			} catch (SQLException e) { /* Do nothing */ }
		}
		
		return clientIDs;
		
	}
}
