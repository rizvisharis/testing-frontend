const apiUrl = "http://127.0.0.1:80/api/v1/record";
const loginUrl = "http://127.0.0.1:80/api/v1/auth";

function redirectToLogin() {
  window.location.href = "/views/login.html";
}

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token !== null;
}
