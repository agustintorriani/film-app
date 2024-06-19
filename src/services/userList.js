async function addToList(userId, listId, filmId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-acces-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmU1YzY1NzcxYTZjNTQ5ZGRhZjEyNSIsImlhdCI6MTcxODUwODY0NSwiZXhwIjoxNzE4NTk1MDQ1fQ.OPxEWTCVaOcyxHt6RVF8G0-mq-dqBB0V5xbotv8FM3k");
  myHeaders.append("Accept","*/*");
  myHeaders.append("Connection","keep-alive");
  myHeaders.append("Accept-Encoding","gzip, deflate, br");

  var raw = JSON.stringify({
    userId: userId,
    listId: listId,
    filmId: filmId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:4000/api/userList/managerList", requestOptions);
    let res = await data.json();
    return res;
  } catch (err) {
    // console.warn(err);
    return null;
  }
}

async function getListByFilm(userId, filmId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmU3MDMxNmE1OTM3YzRjY2NjYzcyOCIsImlhdCI6MTcxODc3NTUyOSwiZXhwIjoxNzE4ODYxOTI5fQ.Bzn1x4zu1cuHj7GG317o4UQyx2ZiVv6AcF0IZ2DVsVw");
  myHeaders.append("Accept","*/*");
  myHeaders.append("Connection","keep-alive");
  myHeaders.append("Accept-Encoding","gzip, deflate, br");

  var raw = JSON.stringify({
    userId: userId,
    filmId: filmId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let data = await fetch("http://localhost:4000/api/userList/getListByFilm", requestOptions);
    let res = await data.json();
    return res;
  } catch (err) {
    // console.warn(err);
    return null;
  }
}


 export { addToList, getListByFilm };
