$(function() {

  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html =  `<div class="message" data-id=${message.id}>
                    <div class="upper-info">
                      <div class="upper-info__user">${message.user_name}</div>
                      <div class="upper-info__date">${message.date}</div>
                    </div>
                      <div class="lower-message">
                        <p class="message__text">${message.content}</p>
                        <img src="${message.image.url}" class="lower-message__image" >
                      </div>
                   </div>`

      } else if (message.content) {
        var html = `<div class="message" data-id=${message.id}>
                      <div class="upper-info">
                        <div class="upper-info__user">${message.user_name}</div>
                        <div class="upper-info__date">${message.date}</div>
                      </div>
                    <div class="lower-message">
                      <p class="message__text">${message.content}</p>
                    </div>
                  </div>`

    } else if (message.image.url) {
      var html = `<div class="message" data-id=${message.id}>
                    <div class="upper-info">
                      <div class="upper-info__user">${message.user_name}</div>
                      <div class="upper-info__date">${message.date}</div>
                    </div>
                    <div class="lower-message">
                      <img src="${message.image.url}"class="lower-message__image" >
                    </div>
                  </div>`
            };
            return html;
          };

  function messagehtml(message){
    var image = message.image.url ? `<img src=${message.image.url} >` : "";
      var html =
      `<div class='message' data-id=${message.id}>
        <div class='upper-info'>
          <p class='upper-info__user'>${message.user_name}</p>
          <p class='upper-info__date'>${message.date}</p>
        </div>
          <p class='message__text'>${message.content}</p>
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
  });

    var reloadMessages = function() {
      
      var last_message_id = $('.message:last').data('message-id');
       
      pash = location.pathname
      url = pash.replace( "messages", "api/messages" );

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){

     if( message.group_id === $('.messages').data('groups-id') ) {
        insertHTML = buildMessageHTML(message);
        $('.messages').append(insertHTML)
       }
      })
    
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
    })
      
      .fail(function() {
        alert('error');
      });
    };
  
    setInterval(reloadMessages, 5000);
});
