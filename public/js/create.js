$(document).ready(function () {
  if (!isAuthenticated()) {
    redirectToLogin();
  }
  $("#create-form").submit(function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const fullName = $("#full_name").val();
    const gender = $("#gender").val();
    const profilePhoto = $("#profile_photo").prop("files")[0];

    const formData = new FormData();
    formData.append("username", username);
    formData.append("full_name", fullName);
    formData.append("gender", gender);
    formData.append("profile_photo", profilePhoto);

    $.ajax({
      url: apiUrl,
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      success: function () {
        alert("Data created successfully!");
        window.location.href = "/views/dashboard.html";
      },
      error: function (xhr) {
        // console.error('Error occurred while creating data:', xhr.responseText);
        alert("Error occurred while creating record. Please try again.");
      },
    });
  });
});
