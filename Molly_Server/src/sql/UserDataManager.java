package sql;

public class UserDataManager {
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost/LoginJP?user=root&password=lertom30&useSSL = false";
	ByteArrayOutputStream bout;
	DataOutputStream dout;
	
	public static User CreateUser(String clientId, String[] clientTags, boolean isClienDJ, String[] bookmarks ){
		User  user = null;
		Connection conn = null;
		PreparedStatement ps = null;
		
		
		 bout = new ByteArrayOutputStream();
	     dout = new DataOutputStream(bout);
	     
	    for (String t : clientTags) {
	        dout.writeDouble(t);
	    }
	    byte[] asBytes = bout.toByteArray();
	    
	    for (String bm : bookmarks) {
	        dout.writeDouble(bm);
	    }
	    dout.close();
	    byte[] asBytes1 = bout.toByteArray();

	    PreparedStatement stmt = null;  // however we normally get this...
	    stmt.setBytes(1, asBytes);
		try {
			
		}
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL);
			ps = conn.prepareStatement("INSERT INTO Users (clientID, clientTags, clientDJ, clientBookmarks) VALUES (?, ?, ?, ?);");
			ps.setString(1, clientId);
			ps.setString(2, asBytes);
			ps.setString(3, isClienDJ);
			ps.setString(4, facebookID);
			
			
			
	}

}
