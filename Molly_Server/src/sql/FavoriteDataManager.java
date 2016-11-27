package sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class FavoriteDataManager {

	//initializing the Driver
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost/SpotifyDJ?user=root&password=root&useSSL = false";

	public static void addFavorite(String clientID, String channelID){

		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		if(checkUserExists( clientID) && checkUserExists( channelID) ){

			try {
				Class.forName(JDBC_DRIVER);
				conn = DriverManager.getConnection(DB_URL);
				ps = conn.prepareStatement("INSERT INTO Favorite (clientID, channelID ) VALUES (?, ?);");
				ps.setString(1, clientID);
				ps.setString(2, channelID);
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
		}
	}



	public static boolean checkUserExists(String clientID){

		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		int i =0;
		boolean flag = false;

try {

			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT * FROM Users WHERE clientID=?");

			ps.setString(1, clientID);
			rs = ps.executeQuery();
			if (rs.next()) {
				flag = true;
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



		return flag;
	}


	public static String[] getFavorites(String clientID){
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String[] favorites = new String[50];
		int i =0;

try {

			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("SELECT * FROM Favorite WHERE clientID=?");

			ps.setString(1, clientID);
			rs = ps.executeQuery();
			while (rs.next()) {
				favorites[i] = rs.getString("channelID");
				i++;
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


		return favorites;
	}

}
