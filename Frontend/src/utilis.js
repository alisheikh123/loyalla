import {cipher_key} from './config'
var CryptoJS = require('crypto-js');

export function Decrypted_Viewer(){
    var data = localStorage.getItem("nighebanviewer");
    if(data != null){
        var bytes = CryptoJS.AES.decrypt(data, cipher_key);
    var usersList = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return usersList;
    }
    else{
        return null;
    }
}