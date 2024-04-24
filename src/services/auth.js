import { myConfig } from "config";

async function login(email, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:8080/api/usuarios/login", requestOptions);
    return await data.json();
  } catch (err) {
    console.warn(err);
    return null;
  }
}

async function register(name, lastname, email, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name,
    lastname,
    email,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:8080/api/usuarios/register", requestOptions);
    return await data.json();
  } catch (err) {
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


 export { login, register, validateToken, getSessionId};
