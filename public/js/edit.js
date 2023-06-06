let itemId = null;
$(document).ready(function () {
  if (!isAuthenticated()) {
    redirectToLogin();
  }

  const urlParams = new URLSearchParams(window.location.search);
  itemId = urlParams.get("id");

  $.ajax({
    url: apiUrl + "/" + itemId,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    success: function (data) {
      let item = data.data;
      $("#username").val(item.username);
      $("#full_name").val(item.full_name);
      $("#gender").val(item.gender);

      if (item.profile_photo) {
        const profilePhotoPreview = document.getElementById("profile_photo_preview");
        profilePhotoPreview.src = item.profile_photo;
        profilePhotoPreview.style.display = "block";
      }
    },
    error: function () {
      console.error("Error occurred while fetching record data.");
    },
  });
});

$("#edit-form").submit(function (event) {
  event.preventDefault();

  const form = event.target;
  const username = form.elements.username.value;
  const fullName = form.elements.full_name.value;
  const gender = form.elements.gender.value;
  const profilePhoto = form.elements.profile_photo.files[0];

  const formData = new FormData();
  formData.append("username", username);
  formData.append("full_name", fullName);
  formData.append("gender", gender);
  if (profilePhoto) {
    formData.append("profile_photo", profilePhoto);
  }

  formData.append("_method", "PUT");

  $.ajax({
    url: apiUrl + "/" + itemId,
    method: "POST",
    data: formData,
    contentType: false,
    processData: false,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    success: function (response) {
      console.log(response.data);
      alert("Item updated successfully!");
      window.location.href = "/views/dashboard.html";
    },
    error: function (xhr) {
      console.error("Error occurred while creating data:", xhr.responseText);
      alert("Error occurred while updating record data. Please try again.");
    },
  });
});
