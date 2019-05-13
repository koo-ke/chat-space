$(function(){

  function box(user){
      var html =
      `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
      </div>`
      return html;
    };

    function box2(user_id,user_name){
      var html2 =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
      <p class='chat-group-user__name'>${ user_name }</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
      return html2;
    };

  $("#user-search-field").on("keyup", function() {

    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(user){
      $("#user-search-result").empty();
        if (user.length !== 0 && input.length !== 0 ) {
          user.forEach(function(user){
          var html = box(user);
            $('#user-search-result').append(html)
          });
      } else {
          box("一致するユーザーはいません");
        }
      })

    .fail(function(){
      alert('ユーザーの検索に失敗しました')
    });
    
  });

  $(function(){
    $('#user-search-result').on("click", ".chat-group-user__btn", function () {
      var user_id = $(this).attr("data-user-id");
      var user_name = $(this).attr("data-user-name");
      var html2 = box2(user_id,user_name);
      $('#chat-group-users').append(html2)
      $(this).parent().remove();
    });

    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
      
    })
  });
});
