
"use strict";

$(document).ready(function () {
  $("#accordion").accordion();

  $("#carousel").slick({
    slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  });

  $("#preferencesForm").on("submit", function (e) {
    e.preventDefault();
    const genre = $("#favoriteGenre").val();
    localStorage.setItem("favoriteGenre", genre);
    displayPreferences();
  });

  function displayPreferences() {
    const savedGenre = localStorage.getItem("favoriteGenre");
    if (savedGenre) {
      $("#storedGenre").text(`Your favorite genre is: ${savedGenre}`);
    } else {
      $("#storedGenre").text("No preferences saved.");
    }
  }
  displayPreferences();

// Format the date 
const today = new Date();
const dateString = today.toDateString();
document.getElementById('date').textContent = dateString;

  $("#loadMovies").on("click", function () {
    $.ajax({
      url: "scripts/movies.json",
      method: "GET",
      success: function (data) {
        let movieContent = "";
        data.movies.forEach((movie) => {
          movieContent += `
            <div>
              <h3>${movie.title}</h3>
              <h5>${movie.time}</h5>
              <p>${movie.description}</p>
            </div>
          `;
        });
        $("#movieList").html(movieContent);
      },
      error: function () {
        alert("Failed to load movies.");
      },
    });
  });
});