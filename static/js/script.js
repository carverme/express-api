//document ready function for jquery
//grabbing the form from the ejs, preventing it from defaulting to a get function,
//turning it into a PUT function, using the ajax call to pass it in as an updated object, then done.
//redirect to the main page to see the updated info.
$(document).ready(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var newData = $(this).serialize();
    var url = $(this).attr('action');
    $.ajax({
      method: 'PUT',
      url: url,
      data: newData
    }).done(function(data) {
      console.log(data);
      window.location = '/vehicles'
    });
  });
//the delete function.
  $('a').on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      console.log(data);
      window.location = '/vehicles';
    })
  });

});
