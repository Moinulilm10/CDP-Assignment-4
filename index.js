const url = "https://jsonplaceholder.typicode.com/users";

const worker = new Worker("worker.js");

worker.onmessage = function (event) {
  const users = event.data;
  displayUsers(users);
};

function displayUsers(users) {
  const userList = document.getElementById("users-data-list");
  userList.innerHTML = "";

  users.map((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td data-label="Name">${user.name}</td>
            <td data-label="Contact">${user.phone}</td>
            <td data-label="Email">${user.email}</td>
            <td data-label="City">${user.address.city}</td>
        `;
    userList.appendChild(row);
  });
}

document.querySelector(".button").addEventListener("click", function () {
  worker.postMessage(url);
});

// Add event listener for the search input field
document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  searchUsers(searchTerm);
});

function searchUsers(searchTerm) {
  const userList = document.getElementById("users-data-list");
  const rows = userList.getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    const cells = row.getElementsByTagName("td");
    let found = false;
    Array.from(cells).forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        found = true;
      }
    });
    if (found) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
