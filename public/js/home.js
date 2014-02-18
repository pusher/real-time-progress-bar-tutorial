$(document).ready(function(){
  // Fake Random User Unique ID, I usually use Mixpanel or Kissmetrics UID here will a fallback function for people who block their JS libraries
  var uID = Math.floor((Math.random()*100)+1)


  // Instantiate Pusher
  var pusher = new Pusher('0b4b9a3e205f2d9f7766') // Change it to your Pusher APP Key
  var channel = pusher.subscribe('signup_process_'+uID) // The Channel you want to subscribe to

  channel.bind('update', function(data) { // Bind to an event on our channel, in our case, update
    var messageBox = $('#create-account-form-with-realtime').children('.messages')
    var progressBar = $('#realtime-progress-bar')

    progressBar.width(data.progress+"%")
    messageBox.html(data.message)

    // Process is complete,Do whatever you want now, maybe redirect them to their freshly created account?
    if (data.progress == 100) {
      messageBox.html('Was it better with this process?')
    }
  });

  // Submit the forms using AJAX, nothing to see here.
  $('form').submit(function (e) {
    e.preventDefault();
    var name = $('#name').val() || "Bob"
    var form = this
    var btn = $(form).find('button')
    var progressBar = $(form).find('.progress')
    progressBar.removeClass('hide')
    btn.prop('disabled', true)

    $.post( $(form).attr('action'),{name: name, uid: uID} , function () {
    }).done(function(response) {
      btn.prop('disabled', false)

      progressBar.toggleClass('active')
      if (!$(form).attr('id')) {
        $(form).children('.messages').html(response)
      }
    })
  })
})