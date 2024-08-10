<%@ page import="java.io.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="jakarta.servlet.*"%>


<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% 
	final String url = "jdbc:mysql://localhost:3306/anime";
    final String user = "root";
    final String password = "root_PSW3-@";
    		
		try {
	        Class.forName("com.mysql.jdbc.Driver");
	        try (Connection connection = DriverManager.getConnection(url, user, password)) {
	        
	        	Statement statement = connection.createStatement();
	        	String sql = "SELECT * FROM anime.anime_review JOIN anime.review USING (id_review) WHERE "+
	        		"id_anime=" + request.getParameter("id_anime");
	        	String output = "{\n\"review\" : [\n";
	        	boolean res = statement.execute(sql);
                while (res){
                	ResultSet resultSet = statement.getResultSet();
                	int i = 0;
                	while (resultSet.next()) {
                		String username = resultSet.getString("username");
                        if (i ==0){
                        	output += "\n{\n";
                        }
                       	else{output += ",\n{\n";
                        		
                        }
                       	output += "\"username\" : \"" + username + "\",\n";
                        String text = resultSet.getString("text");
                        output += "\"text\" : \"" + text + "\"\n";
                        output += "}";
                        i=1;
                    }
                    res = statement.getMoreResults();
                    output += "\n]\n}";
                }           
                PrintWriter outt = response.getWriter();
            	outt.print(output);                           	  
              }
                
		} 
		catch (Exception ex) {
			PrintWriter outt = response.getWriter();
        	outt.print("error..."); 
        	outt.print(ex);
            } 
		%>
