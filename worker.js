onmessage = function (event) {
  fetch(event.data)
    .then((response) => response.json())
    .then((data) => {
      postMessage(data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
};
