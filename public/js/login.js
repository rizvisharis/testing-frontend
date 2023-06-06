$(document).ready(function () {
  function performLogin(email, password) {
    $.ajax({
      url: loginUrl,
      method: "POST",
      data: { email: email, password: password },
      headers: {
        Accept: "application/json",
      },
      success: function (response) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/views/dashboard.html";
      },
      error: function (xhr) {
        console.error("Error occurred while creating data:", xhr.responseText);
        alert("Invalid email or password");
      },
    });
  }

  $("#login-form").submit(function (event) {
    event.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    performLogin(email, password);
  });
});
