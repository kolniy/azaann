var form = document.getElementById("my-form");
const error = document.querySelector(".error-message");
const success = document.querySelector(".sent-message");
const loader = document.querySelector(".loading");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  loader.style.display = "block";
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        success.style.display = "block";
        loader.style.display = "none";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            error.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
            error.style.display = "block";
            loader.style.display = "none";
          } else {
            error.style.display = "block";
            loader.style.display = "none";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
      error.style.display = "block";
      loader.style.display = "none";
    });
}
form.addEventListener("submit", handleSubmit);
