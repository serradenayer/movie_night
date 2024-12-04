
"use strict";

$(document).ready(function () {
  $("#accordion").accordion();

  $("#carousel").slick({
    slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  });

  $("#suggestionForm").on("submit", function (e) {
    e.preventDefault();
    const suggestion = $("#suggestedMovie").val();
    localStorage.setItem("suggestedMovie", suggestion);
    displaySugestion();
  });

  function displaySuggestion() {
    const savedSuggestion = localStorage.getItem("suggestedMovie");
    if (savedSuggestion) {
      $("#storedSuggestion").text(`We hear you, we might just put on a showing of ${savedSuggestion}`);
    } else {
      $("#storedSuggestion").text("No suggestion given.");
    }
  }
  displaySuggestion();

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