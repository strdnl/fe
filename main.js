var endpoint = "http://www.jsonstore.io/3f372cbb892d082a509f9484d4ea8f7426b30954d1a6cb2255e0a19402bbf419";
var chkhash = "3f372cbb892d082a5";
// var chkhash = CryptoJS.AES.encrypt(window.location.hash.substr(1), window.location.hash.substr(1), endpoint).toString();

function encrypt(url){
var chk = CryptoJS.AES.encrypt(window.location.hash.substr(1), window.location.hash.substr(1), endpoint).toString();
    var codex = CryptoJS.AES.encrypt(url, endpoint, chk, window.location.hash.substr(1)).toString();

    return codex;
}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://") || url.startsWith("data:text/");
    if(!protocol_ok){
        var newurl = "http://"+url;
       return newurl;
        
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
    this.url = url;
    var chkhash = CryptoJS.AES.encrypt(window.location.hash.substr(1), window.location.hash.substr(1), endpoint).toString();

    $.ajax({
        'url': endpoint + "/" + chkhash,
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
   var longurl = encrypt(longurl)
    send_request(longurl);
}

// var hashh = window.location.hash.substr(1)
    var cunt = CryptoJS.AES.encrypt(window.location.hash.substr(1), window.location.hash.substr(1), endpoint).toString();

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + cunt, function (data) {
        data = data["result"];
        var decrypted = CryptoJS.AES.decrypt(data, endpoint, chkhash, window.location.hash.substr(1));

        if (decrypted != null) {
            
            window.location.href = decrypted.toString(CryptoJS.enc.Utf8);
        }

    });
}
