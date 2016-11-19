package sql;



import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import classes.Channel;
import classes.User;


public class ChannelDataManager {

	
	
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost/SpotifyDJ?user=root&password=lertom30&useSSL = false";
	static Channel channel;
	
	public  static void CreateChannel(String clientId, String[] channelTags, int channelsSubscriberNum, int channelLikesNum ){
		channel = new Channel(clientId, channelTags, channelsSubscriberNum, channelLikesNum);
		Connection conn = null;
		PreparedStatement ps = null;
		String tags="";
		int likes, subscribes;
		
		try {
		
			for(int i=0; i<channelTags.length; i++){
				tags +=channelTags[i]+":";
			}
			
	   
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("INSERT INTO Channels (clientID, channelTags, subscribersNum, likesNum) VALUES (?, ?, ?, ?);");
			ps.setString(1, clientId);
			ps.setString(2, tags);
			ps.setInt(3, channelsSubscriberNum);
			ps.setInt(4, channelLikesNum);
			ps.executeUpdate();
			channel = new Channel(clientId, channelTags, channelsSubscriberNum, channelLikesNum);
			
			
			
		}catch (ClassNotFoundException cnfe) {
			// TODO Auto-generated catch block
			cnfe.printStackTrace();
		}
		catch (SQLException sqle) {
			// TODO Auto-generated catch block
			sqle.printStackTrace();
		}
	}
	
	
public static Channel getChannel(String clientID){
		
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String[] tags;
		int likes, subscribers;
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT * FROM Channels WHERE clientID=?");
			
	
			tags = new String[5];
		
			ps.setString(1, clientID);
			rs = ps.executeQuery();
			if (rs.next()) {
				tags = rs.getString("clientTags").split(":");
				likes = rs.getInt("likesNum");
				subscribers = rs.getInt("subscribersNum");
				channel= new Channel(clientID, tags, subscribers, likes);
				System.out.println("here   "+channel.getClientID());
			}
		}catch (ClassNotFoundException e){
			e.getStackTrace();
	
		}
		catch (SQLException e){
			e.getStackTrace();
		}
		
		return channel;
	}

	public static int getLikes(String clientID){
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		int likes=0;
		boolean isDJ;
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT channelLikesNum FROM Channels WHERE clientID=?");
			
	        
			ps.setString(1, clientID);
			rs = ps.executeQuery();
			if (rs.next()) {
				
				likes = rs.getInt(0);
			}
		}catch (ClassNotFoundException e){
			e.getStackTrace();
	
		}
		catch (SQLException e){
			e.getStackTrace();
		}
		
		return likes;
	}
	
	
	
	public static void addLikes(String clientID){
		
		
			int likes = getLikes(clientID);
			channel.setNumChannelLikes(likes);
			//System.out.println("UserDataManager : "+user.getIfCLientIsDJ());
			Connection conn = null;
			PreparedStatement ps = null;
			try {
				Class.forName(JDBC_DRIVER);
				conn = DriverManager.getConnection(DB_URL);
				ps = conn.prepareStatement("UPDATE Users SET likesNum="+likes+" WHERE clientID=?");
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
	
		
public static int getNumChannelSubscribers(String clientID){
			
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		int subs=0;
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT channelSubscribersNum FROM Channels WHERE clientID=?");
			
	        
			ps.setString(1, clientID);
			rs = ps.executeQuery();
			if (rs.next()) {
				
				subs = rs.getInt(0);
			}
		}catch (ClassNotFoundException e){
			e.getStackTrace();
	
		}
		catch (SQLException e){
			e.getStackTrace();
		}
		
		return subs;
	}
	
	
	public static void addNumChannelSubscribers(String clientID){
		
		
			int sub = getLikes(clientID);
			channel.setNumChannelSubscribers(sub);
			//System.out.println("UserDataManager : "+user.getIfCLientIsDJ());
			Connection conn = null;
			PreparedStatement ps = null;
			try {
				Class.forName(JDBC_DRIVER);
				conn = DriverManager.getConnection(DB_URL);
				ps = conn.prepareStatement("UPDATE Users SET subscribersNum="+sub+" WHERE clientID=?");
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
