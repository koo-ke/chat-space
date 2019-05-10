$(function() {
  function messagehtml(message){
    var image = message.image ? `<img src=${message.image} >` : "";
      var html =
      `<div class='message'>
      <div class='upper-info'>
      <p class='upper-info__user'>
      ${message.user_name}
      </p>
      <p class='upper-info__date'>
      ${message.date}
      </p>
      </div>
      <p class='message__text'>
      ${message.content}
      </p>
      ${image}
      </div>`
      return html;
    };

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')

  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = messagehtml(data);
    $('.messages').append(html)
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
  .fail(function(data){
    alert('error');
  })
  .always(() => {
    $(".form__submit").removeAttr("disabled");
    });
  })
});
