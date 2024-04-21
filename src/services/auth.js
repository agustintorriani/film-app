// async function login(email, password) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     email: email,
//     password: password,
//   });

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   try {
//     let data = await fetch("http://localhost:8080/api/usuarios/login", requestOptions);
//     return await data.json();
//   } catch (err) {
//     console.warn(err);
//     return null;
//   }
// }

// async function register(name, lastname, email, password) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     name,
//     lastname,
//     email,
//     password,
//   });

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   try {
//     let data = await fetch("http://localhost:8080/api/usuarios/register", requestOptions);
//     return await data.json();
//   } catch (err) {
//     console.warn(err);
//     return null;
//   }
// }

// async function validateToken(token) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify({ token }),
//     redirect: "follow",
//   };

//   try {
//     let res = await fetch("http://localhost:8080/api/auth/verification", requestOptions);
//     return await res.json();
//   } catch (err) {
//     console.warn(err);
//   }
// }

// export { login, register, validateToken };
