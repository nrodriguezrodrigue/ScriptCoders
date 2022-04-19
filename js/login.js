var attempt = 3; // Variable para contar el número de intentos
// La funcion se ejecuta cuando hacemos clic en el boton
function validate(){
var exampleInputEmail1 = document.getElementById("exampleInputEmail1").value;
var exampleInputPassword1 = document.getElementById("exampleInputPassword1").value;
if ( exampleInputEmail1 == "j" && exampleInputPassword1 == "1"){
alert ("Login successfully");
window.location = "salas.html"; // Redirige a otra página
return false;
}
else{
attempt --;
alert("You have left "+attempt+" attempt;");
// inhabilita a los 3 intentos
if( attempt == 0){
document.getElementById("exampleInputEmail1").disabled = true;
document.getElementById("exampleInputPassword1").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}
