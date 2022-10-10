// Your web app's Firebase configuration
//const config = JSON.stringify({
//    apiKey: "AIzaSyA8NpjKfRUjcqZirXG6K0khjTbd_FwKLSM",
//    authDomain: "prj-anim-p-appintegra.firebaseapp.com",
//    databaseURL: "https://prj-anim-p-appintegra-default-rtdb.firebaseio.com",
//    databaseURL: "https://prj-anim-p-appintegra-e2a.firebaseio.com/",
//    projectId: "prj-anim-p-appintegra",
//    storageBucket: "prj-anim-p-appintegra.appspot.com",
//    messagingSenderId: "123219769717",
//    appId: "1:123219769717:web:15a6c86f7ca661e89f7b3c"
//});

const config = JSON.stringify({
    apiKey: "AIzaSyA8NpjKfRUjcqZirXG6K0khjTbd_FwKLSM",
    authDomain: "prj-anim-p-appintegra.firebaseapp.com",
    databaseURL: "https://prj-anim-p-appintegra-widgets.firebaseio.com/",
    projectId: "prj-anim-p-appintegra",
    storageBucket: "prj-anim-p-appintegra.appspot.com",
    messagingSenderId: "123219769717",
    appId: "1:123219769717:web:15a6c86f7ca661e89f7b3c"
});

//console.log(config)

//var CryptoJS = require("crypto-js");
//var AES = require("crypto-js/aes");
import CryptoJS from "crypto-js"
//import AES from "crypto-js/aes"

const key = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
const iv1 = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
var encrypted = CryptoJS.AES.encrypt(config, key, {
    keySize: 16,
    iv: iv1,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
}) + "";

console.log(encrypted)

const content = `
import CryptoJS from "crypto-js"
import AES from "crypto-js/aes"

export default function() {
    const key = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
    const iv1 = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
    const plainText = CryptoJS.AES.decrypt('${encrypted}', key, {
        keySize: 16,
        iv: iv1,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    
    return JSON.parse(plainText.toString(CryptoJS.enc.Utf8));
}`

//fs = require('fs');
import fs from 'fs';

fs.writeFile('config-key.js', content, function (err) {
    if (err) return console.log(err);
    console.log('success');
});