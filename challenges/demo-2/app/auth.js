function checkCredentials(username, password) {
  if (username !== "John Smith") return false;

  if (password !== "p@ssw0rd!") return false;

  return true;
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const authenticated = checkCredentials(username, password);

  document.location = authenticated
    ? "./ae780585f49b94ce1444eb7d28906123.html"
    : "./95b3644556b48a25f3366d82b0e3b349.html";
}
