function init(){
    var preferencias = JSON.parse(sessionStorage.getItem('preferencias'));
    $('#avatar').attr('src', preferencias.image);
}

$(function () {
    init();
});
