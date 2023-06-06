$(document).ready(function () {
  if (isAuthenticated()) {
    fetchData();
  } else {
    redirectToLogin();
  }
});

function fetchData() {
  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    success: function (data) {
      $("#data-table tbody").empty();
      data = data.data.records;

      data.forEach(function (item) {
        const row = `<tr>
                        <td>${item.username}</td>
                        <td>${item.full_name}</td>
                        <td>${item.gender}</td>
                        <td><img src=${item.profile_photo} alt="Profile Photo" class="profile-photo"</td>
                        
                        <td>
                          <button class="btn btn-sm btn-info" onclick="editItem(${item.id})">Edit</button>
                          <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                        </td>
                      </tr>`;
        $("#data-table tbody").append(row);
      });
    },
    error: function () {
      console.error("Error occurred while fetching records.");
    },
  });
}

function editItem(itemId) {
  window.location.href = "edit.html?id=" + itemId;
}

function deleteItem(itemId) {
  if (confirm("Are you sure you want to delete this record?")) {
    $.ajax({
      url: apiUrl + "/" + itemId,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      success: function (response) {
        alert("Record deleted successfully!");
        fetchData();
      },
      error: function () {
        console.error("Error occurred while deleting record.");
        alert("Error occurred while deleting record. Please try again.");
      },
    });
  }
}
