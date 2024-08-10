<%@ page import="java.io.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="jakarta.servlet.*"%>


<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% 
	final String url = "jdbc:mysql://localhost:3306/anime";
    final String user = "root";
    final String password = "root_PSW3-@";
    		
		try {
	        Class.forName("com.mysql.jdbc.Driver");
	        try (Connection connection = DriverManager.getConnection(url, user, password)) {
	        
	        	Statement statement = connection.createStatement();
	        	String sql = "SELECT MAX(id_review) as \"id\" from anime.review";
	        	ResultSet num  = statement.executeQuery(sql);
	        	num.next();
	        	int id_review = num.getInt("id")+1;
	        	
	        	//вставка в таблицу review
	        	sql = "INSERT INTO anime.review values (" + id_review +", \""
	        	+request.getParameter("username")+"\", \"" + request.getParameter("text") +"\");";
	        	statement.executeUpdate(sql);
	        	//вставка в таблицу anime_review
	        	
	        	sql = "INSERT INTO anime.anime_review values (" 
	        	+ request.getParameter("id_anime") + ", " + id_review + ");";
	        	statement.executeUpdate(sql);
	        	PrintWriter outt = response.getWriter();
            	outt.print("Ваш отзыв добавлен!");                            	  
              }
                
		} 
		catch (Exception ex) {
			PrintWriter outt = response.getWriter();
        	outt.print("error..."); 
        	outt.print(ex);
            } 
		%>
