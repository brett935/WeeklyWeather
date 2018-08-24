
document.addEventListener('DOMContentLoaded', function() {
  //save current input values to local storage
  $("#saveOptions").click(function(){
    localStorage.zipcode = $("#zipcode").val();

    alert("Options saved");
  });
});