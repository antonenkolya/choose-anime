//аналог таблицы anime
var anime = [
    [   "Атака Титанов", "Shingeki no Kyojin", "2013", "Уже многие годы человечество ведёт борьбу с титанами — огромными существами, которые не обладают особым интеллектом, зато едят людей и получают от этого удовольствие. После продолжительной борьбы остатки человечества построили высокую стену, окружившую страну людей, через которую титаны пройти не могли. С тех пор прошло сто лет, люди мирно живут под защитой стены. Но однажды подростки Эрен и Микаса становятся свидетелями страшного события — участок стены разрушается супертитаном, появившимся прямо из воздуха. Титаны нападают на город, и дети в ужасе видят, как один из монстров заживо съедает мать Эрена. Мальчик клянётся, что убьёт всех титанов и отомстит за человечество.",
        "89", "завершено", "8.7", "18+", "attack_on_titan.png", 
        //список жанров
        //["экшн", "боевик", "детектив", "фэнтези", "драма"]],
        [0, 1, 2, 3, 5]],
    [   "Клинок, рассекающий демонов", "Kimetsu no Yaiba", "2019", "Эпоха Тайсё. Ещё с древних времён ходят слухи, что в лесу обитают человекоподобные демоны, которые питаются людьми и выискивают по ночам новых жертв. Тандзиро Камадо — старший сын в семье, потерявший отца и взявший на себя заботу о родных. Однажды он уходит в соседний город, чтобы продать древесный уголь. Вернувшись утром, парень обнаруживает перед собой страшную картину: вся родня зверски убита, а единственная выжившая — младшая сестра Нэдзуко, обращённая в демона, но пока не потерявшая человечность. С этого момента начинается долгое и опасное путешествие Тандзиро и Нэдзуко, в котором мальчик намерен разыскать убийцу и узнать способ исцеления сестры.",
        "45", "онгоинг", "8.2", "18+", "demon_slayer.png",
        //["экшн", "детектив", "фэнтези", "исторический", "драма"]
        [0, 2, 3, 4, 5]]    
]
//аналог таблицы review
var review = [
    [[ "eren yeager", "шедевр...."],
    ["anonymous", "Невероятный сюжет, невероятные персонажи, невероятная рисовка - это всё про Атаку Титанов. Если вы выбираете, с какого аниме начать -  этот тайтл несомненно то, что нужно."]],
    [["tanTAN", "Танжиро мой любимый персонаж"]],
]
////аналог таблицы genres
var genres = ["экшн", "боевик", "детектив", "фэнтези", "исторический", "драма", "романтика", "философский"]


// функции файла animeList.js
function animeList(){
    $("#animeList").empty();
    console.log(anime[0][0])
    var genre_id = $("#genre-id").val()-1;
    for(var i = 0; i < anime.length; i++)
    {
        if(anime[i][9].includes(genre_id)){
            let name = anime[i][0];
            let id_anime = i;
            let name_jp = anime[i][1];
            let year = anime[i][2];
            let plot = anime[i][3];
            let ep_num = anime[i][4];
            let status = anime[i][5];
            let age = anime[i][6];
            let rating = anime[i][7];
            let img_name = anime[i][8];
            let gnrs = [];
            anime[i][9].forEach((num) => {
				gnrs.push(genres[num]);
			})
			console.log(gnrs);
			let genresInfo = gnrs.join(", ");
			
            //добавление строки
            
            $('#animeList').append(addRow(id_anime, img_name, name, name_jp, year, genresInfo, ep_num, status, age, rating, plot));
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
            
            
    }
        
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

//файл showReview.js
function showReview(id_anime){
	
    if(review[id_anime].length > 0){
		$('#anime'+id_anime).append($('<h3/>', { id: 'reviewHead' + + id_anime }).text("Отзывы:"));
	}
	else{
		$('#anime'+id_anime).append($('<tr/>').append($('<td/>')).text("Отзывов пока нет:"));
	}
	for(var i = 0; i < review[id_anime].length; i++)
	{
		let username = review[id_anime][i][0];
		let text = review[id_anime][i][1];
			
		
		$('#anime'+id_anime).append(addReview(id_anime, username, text));
				
			}
			let $button = $('<button/>', {
  					text: 'Свернуть отзывы',
  					id: 'hide' + id_anime ,
  					click: function() {
    				// Действия при нажатии на кнопку
    				for(var i = 0; i < review[id_anime].length; i++)
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


//addReview.js


var id_anime;
var username;
var text;
function createForm(id_anime1){
		id_anime = id_anime1;
    	let $form = $('<div/>');  
    	$form.attr('id', "review_form" + id_anime);
    	$form.attr('class', "review_form");
    	$form.css("width", "200px");
    	
    	
    	$form.append($('<tr/>')
    	.append($('<td/>', { class: 'head_form' }).html("<h3>Оставьте свой отзыв:</h3>"))
  		);
  		$form.append($('<tr/>')
    	.append($('<input name="username" type=text placeholder="Ваш никнейм" id="input' +id_anime +'"/>', { class: 'username_form' }).text("Введите свой никнейм:"))
  		);
  		$form.append($('<tr/>')
    	.append($('<textarea name="text" type=text placeholder="Поделитесь впечатлениями!\n(пожалуйста, не используйте кавычки)" rows="7" id="textarea' +id_anime +'"/>', {class: 'text_form' }))
  		);
  		
  		
  		$form.append($('<tr/>')
    	.append($('<button class="btn-sm" onclick="sendReview()">Поделиться</button>')).append($('<button class="btn-sm" onclick="removeForm('+ id_anime+ ')">Отменить</button>')));
    	
		return $form;
}

function removeForm(id_anime){
	$("#review_form" + id_anime).remove();
	$("#showreview" + id_anime).css("display", "inline"); 
    $("#addreview" + id_anime).css("display", "inline"); 
	}

function sendReview(){
	username = $('#input' +id_anime).val();
  	text = $('#textarea' +id_anime).val();
    let rvw = [username, text];
    review[id_anime].push(rvw);
	
	removeForm(id_anime)
				
	
}
