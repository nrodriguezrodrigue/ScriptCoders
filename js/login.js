var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var exampleInputEmail1 = document.getElementById("exampleInputEmail1").value;
var exampleInputPassword1 = document.getElementById("exampleInputPassword1").value;
if ( exampleInputEmail1 == "j" && exampleInputPassword1 == "1"){
alert ("Login successfully");
window.location = "salas.html"; // Redirecting to other page.
return false;
}
else{
attempt --;// Decrementing by one.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("exampleInputEmail1").disabled = true;
document.getElementById("exampleInputPassword1").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}
