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
	const xhr = new XMLHttpRequest();
	let url = new URL('http://localhost:8010/anime/addReview.jsp');
	url.searchParams.set('id_anime', id_anime);
	url.searchParams.set('username', username);
	url.searchParams.set('text', text);
	
	//console.log(url);
	xhr.open('GET', url, true);
	xhr.responseType = 'text/html';
	xhr.setRequestHeader('Content-Type', 'text/html')
	xhr.send();
	xhr.onload = function () {
				if (xhr.status === 200){
				removeForm(id_anime)
				}
	
	}}