<%@ page import="java.io.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="jakarta.servlet.*"%>


<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% 
	final String url = "jdbc:mysql://localhost:3306/anime";
    final String user = "***";
    final String password = "***";
    		
		try {
	        Class.forName("com.mysql.jdbc.Driver");
	        try (Connection connection = DriverManager.getConnection(url, user, password)) {
	        
	        	Statement statement = connection.createStatement();
	        	String sql = "select anime.anime.name, anime.anime.name_japaneese," +
	        			"anime.anime.year, anime.anime.plot, anime.anime.episode_number," +
	        			 "anime.anime.status, anime.anime.img_name, CONCAT(anime.anime.age_limit, \"+\") as \"age_limit\"," +
	        			 "anime.anime.rating, anime.anime_genre.id_anime, GROUP_CONCAT( anime.genre.name SEPARATOR ', ' ) as \"genres\"" + 
	        			 "from anime.anime JOIN anime.anime_genre USING (id_anime) JOIN anime.genre USING (id_genre)" +
	        			"JOIN (select id_anime from anime.anime_genre where id_genre ="
	        			 + request.getParameter("id_genre") + 
	        			") t1 USING (id_anime)" +
	        			"group by id_anime";
	        	String output = "{\n\"anime\" : [\n";
	        	boolean res = statement.execute(sql);
                while (res){
                	ResultSet resultSet = statement.getResultSet();
                	int i = 0;
                	while (resultSet.next()) {
                		String name = resultSet.getString("name");
                        if (i ==0){
                        	output += "\n{\n";
                        }
                       	else{output += ",\n{\n";
                        		
                        }
                       	output += "\"name\" : \"" + name + "\",\n";

                        String name_japaneese = resultSet.getString("name_japaneese");
                        output += "\"name_japaneese\" : \"" + name_japaneese + "\",\n";
                        
                        String id_anime = resultSet.getString("id_anime");              
                        output += "\"id_anime\" : \"" + id_anime + "\",\n";
                        
                        String year = resultSet.getString("year");
                        output += "\"year\" : \"" + year.substring(0, 4) + "\",\n";
                        
                        String plot = resultSet.getString("plot");              
                        output += "\"plot\" : \"" + plot + "\",\n";
                        
                        String episode_number = resultSet.getString("episode_number");                
                        output += "\"episode_number\" : \"" + episode_number + "\",\n";
                        
                        String status = resultSet.getString("status");                
                        output += "\"status\" : \"" + status + "\",\n";
                        
                        String age_limit = resultSet.getString("age_limit");                
                        output += "\"age_limit\" : \"" + age_limit + "\",\n";
                        
                        String img_name = resultSet.getString("img_name");
                        output += "\"img_name\" : \"" + img_name + "\",\n";
                       
                        String genres = resultSet.getString("genres");
                        output += "\"genres\" : \"" + genres + "\",\n";
                        
                        String rating = resultSet.getString("rating");
                        output += "\"rating\" : \"" + rating + "\"\n";
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
