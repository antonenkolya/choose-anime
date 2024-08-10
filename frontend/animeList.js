//require("showReview.js")

function animeList(){
		$("#animeList").empty();
		var genre_id = $("#genre-id").val();
		$.getJSON("http://localhost:8010/anime/animeList.jsp?id_genre="+genre_id, 
		function(response, xhr){
			for(var i = 0; i < response.anime.length; i++)
			{
				let name = response.anime[i].name;
				let id_anime = response.anime[i].id_anime;
				let name_jp = response.anime[i].name_japaneese;
				let year = response.anime[i].year;
				let plot = response.anime[i].plot;
				let ep_num = response.anime[i].episode_number;
				let status = response.anime[i].status;
				let age = response.anime[i].age_limit;
				let rating = response.anime[i].rating;
				let img_name = response.anime[i].img_name;
				let genres = response.anime[i].genres;
				console.log(name, img_name, year, id_anime);
				
				//поиск отзывов
				
				//добавление строки
				
				$('#animeList').append(addRow(id_anime, img_name, name, name_jp, year, genres, ep_num, status, age, rating, plot));
				let $button = $('<button/>', {
  					text: 'Читать отзывы',
  					id: 'showreview' + id_anime,
  					click: function() {
    				// Действия при нажатии на кнопк
    				//this.hide();
    				$button.css("display", "none"); 
    				showReview(id_anime);
    				
  					}
				});
				$button.addClass("btn-sm");
				$('#animeList').append($button);
				
				let $button1 = $('<button/>', {
  					text: 'Оставить отзыв',
  					id: 'addreview' + id_anime,
  					
  					click: function() {
    				// Действия при нажатии на кнопку
    				//alert(id_anime);
    				$("#addreview" + id_anime).css("display", "none"); 
    				$("#showreview" + id_anime).css("display", "none"); 
    				$('#anime'+id_anime).append(createForm(id_anime));
    				
  					}
				});
				$button1.addClass("btn-sm");
				$('#animeList').append($button1);
				
			}
			
		});
				
	}
	
	function addRow(id_anime, img_name, name, name_jp, year, genres, ep_num, status, age, rating, plot){
    	let $table = $('<div/>');  
    	$table.attr('id', "anime" + id_anime);
    	$table.attr('class', "anime");
    	let img_id = 'img'+ id_anime; 
    	   	
  		$table.append($('<tr/>')
    	.append($('<td/>', { rowspan: 11, padding: 0, class: 'posterContainer', id: img_id}).append($('<img id="poster">').attr('src', 'img/'+img_name)))
    	.append($('<td/>', { id: 'name' }).html("<h1>" + name + "</h1>"))
  		); 
  		  		
  		$table.append($('<tr/>')
    	.append($('<td/>', { id: 'namejpn' }).text(name_jp))
  		);
  		
  		$table.append($('<tr/>')
    	.append($('<td/>', { id: 'year' }).html("<strong>Год выхода:</strong> "+year))
  		);
  
		$table.append($('<tr/>')
		.append($('<td/>', { id: 'episodenumber' }).html("<strong>Количество эпизодов:</strong> "+ep_num))
		);
		
		$table.append($('<tr/>')
		.append($('<td/>', { id: 'status' }).html("<strong>Статус:</strong> "+status))
		);
		
		$table.append($('<tr/>')
		.append($('<td/>', { id: 'age' }).html("<strong>Ограничение: </strong>"+age))
		);  
		$table.append($('<tr/>')
		.append($('<td/>', { id: 'genres' }).html("<strong>Жанры:</strong> "+genres))
		);
		$table.append($('<tr/>')
		.append($('<td/>', { id: 'rating' }).html("<strong>Оценка:</strong> "+rating))
		);
		  
		$table.append($('<tr/>')
		.append($('<td/>', { rowspan: 2, id: 'plot' }).text(plot))
		);
		
		$table.append($('<tr/>')
		.append($('<td/>'))
		);
		
		return $table;
}

