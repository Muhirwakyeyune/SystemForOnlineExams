function toggle_visibility() {
    var e = document.getElementById('foo');
       e.style.display = 'none';
       e.style.display = 'block';
}
$( "button" ).click(function() {
    $( "form" ).hide( "slow" );
    e.style.display = 'none';
  });


$(document).ready(function() {
  $('.but').on('click', function() {
    $('.foo').slideToggle();
  });
});
