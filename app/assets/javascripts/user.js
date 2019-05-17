$(function(){

  function add_user(user){
      var html =
      `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
      </div>`
      return html;
    };

    function add_user_remove(user_id,user_name){
      var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
      <p class='chat-group-user__name'>${ user_name }</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
      return html;
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
          var html = add_user(user);
            $('#user-search-result').append(html)
          });
      } else {
          add_user("一致するユーザーはいません");
        }
      })

    .fail(function(){
      alert('ユーザーの検索に失敗しました')
    });
  });

    $('#user-search-result').on("click", ".chat-group-user__btn", function () {
      var user_id = $(this).data("user-id");
      var user_name = $(this).data("user-name");
      var html = add_user_remove(user_id,user_name);
      $('#chat-group-users').append(html)
      $(this).parent().remove();
    });

    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
      
  })
});
