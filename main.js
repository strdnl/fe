var endpoint = "http://www.jsonstore.io/3f372cbb892d082a509f9484d4ea8f7426b30954d1a6cb2255e0a19402bbf419";

function encrypt(){
password = document.getElementById('urlinput').value;
var xorKey = 129; /// you can have other numeric values also.
    var result = "";
    for (i = 0; i < password.length; ++i) {
        result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
        return result;
    }
}

function decrypt(url){
password = url;
var xorKey = 129; /// you can have other numeric values also.
    var result = "";
    for (i = 0; i < password.length; ++i) {
        result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
        return result;
    }
}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://") || url.startsWith("data:text/");
    if(!protocol_ok){
       return url;
        
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
     var codex = CryptoJS.AES.encrypt(url, window.location.hash.substr(1));
     
    this.url = codex;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': codex,
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            var decrypted = CryptoJS.AES.decrypt(data, window.location.hash.substr(1));
            window.location.href = decrypted.toString(CryptoJS.enc.Utf8);
        }

    });
}
