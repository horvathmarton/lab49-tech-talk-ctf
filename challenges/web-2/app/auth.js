function checkCredentials(username, password) {
  const passwordHash = CryptoJS.MD5(password).toString();

  if (username !== "John Smith") return false;

  console.log({ passwordHash });

  if (passwordHash !== "eff64344f3afffa7ce8f1af004d91099") return false;

  return true;
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const authenticated = checkCredentials(username, password);

  document.location = authenticated
    ? "./c813667455a8527728a58679f33119d5.html"
    : "./36d85b5d78cb95a0882d1016c816de76.html";
}
