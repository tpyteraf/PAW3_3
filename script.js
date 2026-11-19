const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn_prev = document.getElementById("prev");
const btn_next = document.getElementById("next");
const answer = document.getElementById("answer");

var offset = 0;
const limit = 10;

function fetchWithPagination() {
  answer.innerHTML = "Loading GIF...";
  const targetUrl = "https://api.giphy.com/v1/gifs/search";
  const params = new URLSearchParams({
    api_key: "5ECOJPCkp7w459sPd6C49P7cWo2ACsT1",
    q: document.getElementById("inp1").value,
    rating: "r",
    limit: limit,
    offset: offset,
  });

  fetch(targetUrl + "?" + params)
    .then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        const data = json.data;

        if (data.length == 0) {
          answer.innerHTML = "Brak wyników";
          return;
        }

        btn_prev.disabled = offset === 0;

        var content = "";

        data.forEach((gif) => {
          content += `<img src="${gif.images.fixed_width.url}">`;
        });

        answer.innerHTML = content;
      } else {
        const textError = await response.text();
        throw new Error(`Błąd serwera ${response.status}: ${textError}`);
      }
    })
    .catch((error) => {
      answer.innerHTML =
        "<p style='color: red;'>Wystąpił błąd podczas pobierania danych.</p>";
      console.error(error.message);
    });
}

btn1.addEventListener("click", function (e) {
  answer.innerHTML = "Loading GIF...";
  const targetUrl = "https://api.giphy.com/v1/gifs/random";
  const params = new URLSearchParams({
    api_key: "5ECOJPCkp7w459sPd6C49P7cWo2ACsT1",
    rating: "r",
  });

  fetch(targetUrl + "?" + params)
    .then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        console.log(json);

        answer.innerHTML = `<img src="${json.data.images.fixed_width.url}">`;
      } else {
        const textError = await response.text();
        throw new Error(`Błąd serwera ${response.status}: ${textError}`);
      }
    })
    .catch((error) => {
      answer.innerHTML =
        "<p style='color: red;'>Wystąpił błąd podczas pobierania danych.</p>";
      console.error(error.message);
    });
});

btn2.addEventListener("click", () => {
  document.getElementById("buttons").classList.remove("hidden");
  offset = 0;
  fetchWithPagination();
});

btn_prev.addEventListener("click", () => {
  if (offset > 0) offset += limit;
  fetchWithPagination();
});

btn_next.addEventListener("click", () => {
  offset += limit;
  fetchWithPagination();
});
