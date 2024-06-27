import { myConfig } from "config";
// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({ b: 512 });
// const publicKey =  myConfig.publicKey;
// const privateKey = myConfig.privateKey;
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

async function login(email, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-acces-token", window.sessionStorage.getItem("token"));
  myHeaders.append("Accept","*/*");
  myHeaders.append("Connection","keep-alive");
  myHeaders.append("Accept-Encoding","gzip, deflate, br");

    // const publicKey = myConfig.publicKey;

    // const publicKey = `-----BEGIN PUBLIC KEY-----
    // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvl+G9CHJ/gRQWSFG1aI8
    // Q5Ru3JF9u5lVdPPG8EFSq5ar9RBLG1BZgHDLUymqPshKZ3IqVVf9aBO2zS5Vj0Fu
    // WWt97bRVW2VuT1u9KgAxcd0UwEdSokzmScsAn4A7szNOKOeg5sG08bqRR2VfbwWu
    // Snw4yU6+fN2bV5EjxE5c2TZR8QzrP9P69r0yH9F0U8GppAcz/J8TiOiLTCTgVmGb
    // lftDi94GVfrYYAub/BtXjic3JJXX2pyVeXG8nPlLdh52e6TrnPz9Ft2fDqDeeM5o
    // rLb5zNCQPE0rfzY7vg8xj2cP+DCj2rdHp7kCgys2XyxD1ryRk7yZfZNHQ0R2eDAK
    // WwIDAQAB
    // -----END PUBLIC KEY-----`;
    // const enc = new JSEncrypt();
    // enc.setPublicKey(publicKey);

    const secretKey = 'torritoKey';
    var raw = JSON.stringify({
      email: email,
      password: CryptoJS.AES.encrypt(password, secretKey).toString(),
      //password: password,
    });


  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:4000/api/usuarios/login", requestOptions);
    let prueba = await data.json();
    window.sessionStorage.setItem("userId", prueba.data.user._id);
    window.sessionStorage.setItem("token", prueba.data.token);
    return prueba;
  } catch (err) {
    // console.warn(err);
    return null;
  }
}

async function register(registrationData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  var raw = JSON.stringify({
    email: registrationData.email,
    password: registrationData.password,
    usuario: registrationData.usuario,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:4000/api/usuarios/register", requestOptions);
    let prueba = await data.json();

    if(prueba.success){
      window.sessionStorage.setItem("userId", prueba.createdUser.user._id);
      window.sessionStorage.setItem("token", prueba.createdUser.token);
    }
    return prueba;
  } catch (err) {
    console.log("errorcito");
    console.warn(err);
    return null;
  }
}

async function validateToken(token) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ token }),
    redirect: "follow",
  };

  try {
    let res = await fetch("http://localhost:8080/api/auth/verification", requestOptions);
    return await res.json();
  } catch (err) {
    console.warn(err);
  }
}

async function getSessionId() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var requestOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + myConfig.themoviedb.token, 
    }
  };

  try {
    let res = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new", requestOptions);
    let res1 = await res.json();
    window.sessionStorage.setItem("sessionId", res1.guest_session_id);

    return res1;
  } catch (err) {
    console.warn("eerrrr",err);
  }
}

async function resetPassword(password,token) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-access-token", token);
  myHeaders.append("Accept","*/*");
  myHeaders.append("Connection","keep-alive");
  myHeaders.append("Accept-Encoding","gzip, deflate, br");

  
  var raw = JSON.stringify({
    userId: window.sessionStorage.getItem("userId"),
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:4000/api/usuarios/reset-password", requestOptions);
    let prueba = await data.json();
    return prueba;
  } catch (err) {
    // console.warn(err);
    return null;
  }
}

async function sendEmailResetPassword(email) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-acces-token", window.sessionStorage.getItem("token"));
  myHeaders.append("Accept","*/*");
  myHeaders.append("Connection","keep-alive");
  myHeaders.append("Accept-Encoding","gzip, deflate, br");

  
  var raw = JSON.stringify({
    email: email,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:4000/api/usuarios/send-reset-password-email", requestOptions);
    let prueba = await data.json();
    return prueba;
  } catch (err) {
    // console.warn(err);
    return null;
  }
}

 export { login, register, validateToken, getSessionId, sendEmailResetPassword,resetPassword};
