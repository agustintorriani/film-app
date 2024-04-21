// async function getConsultas(token) {
//   var myHeaders = new Headers();
//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   try {
//     let res = await fetch(`http://localhost:8080/api/consultas?token=${token}`, requestOptions);
//     let json = await res.json();

//     return json;
//   } catch (err) {
//     console.warn(err);
//   }
// }

// export { getConsultas };
