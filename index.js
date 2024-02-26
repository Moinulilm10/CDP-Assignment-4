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
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>
                <button type="button" class="btn btn-primary">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        `;
    userList.appendChild(row);
  });
}

document.querySelector(".button").addEventListener("click", function () {
  worker.postMessage(url);
});
