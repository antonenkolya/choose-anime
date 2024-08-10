function showReview(id_anime){
		
		$.getJSON("http://localhost:8010/anime/reviewList.jsp?id_anime="+id_anime, 
		function(response, xhr){
			if(response.review.length > 0){
				$('#anime'+id_anime).append($('<h3/>', { id: 'reviewHead' + + id_anime }).text("Отзывы:"));
			}
			else{
				$('#anime'+id_anime).append($('<h3/>', { id: 'reviewHead' + + id_anime }).text("Отзывов пока нет..."));
			}
			for(var i = 0; i < response.review.length; i++)
			{
				let username = response.review[i].username;
				let text = response.review[i].text;
			
				//$('#anime'+id_anime).append($('<tr/>').append($('<td/>')));	
				$('#anime'+id_anime).append(addReview(id_anime, username, text));
				
			}
			let $button = $('<button/>', {
  					text: 'Свернуть отзывы',
  					id: 'hide' + id_anime ,
  					click: function() {
    				// Действия при нажатии на кнопку
    				for(var i = 0; i < response.review.length; i++)
					{
						$("#review_item" + id_anime).remove();
						
					}
					$("#reviewHead" + id_anime).remove(); 
    				$("#showreview" + id_anime).css("display", "inline"); 
    				$("#hide" + id_anime).remove(); 
  					}});
  			//$('#anime'+id_anime).append($('<tr/>').append($('<td/>')));	
  			$button.addClass("btn-sm");
			$('#anime'+id_anime).append($button);
			});
}
	
	
function addReview(id_anime, username, text){
	
    	let $review = $('<div/>');  
    	$review.attr('id', "review_item" + id_anime);
    	$review.css("width", "200px");
    	$review.css("margin-bottom", "10px");
    	$review.css("margin-top", "10px");
  		$review.append($('<tr/>')
    	.append($('<td/>', { class: 'username' }).text(username+":"))
  		);
  		$('#username').css("max-width", "200px");
  		$review.append($('<tr/>')
    	.append($('<td/>', { class: 'text' }).text(text))
  		);
  		$('#text').css("max-width", "200px");
		return $review;
}
