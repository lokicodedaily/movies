const seachInputElement = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const moviesSection = document.getElementById("movies-section");

// getting movie detail section element
const movieDetailsElement = document.getElementById("movie-details-section");


// to get the data from ombd api
async function getUser(movieName = "spiderman") {
  try {
    movieName = movieName === "" ? "Spiderman" : movieName;
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&apikey=a66eb111`
    );
    let data = response.data["Search"];
    displayMovies(data);
  } catch (error) {
    console.log(error);
  }
}

// function to diplay movie in form of card
function displayMovies(movies) {
  let moviesCards = movies.map((movie) => {
    let title = movie["Title"];
    let img = movie["Poster"] === "N/A" ? "./moviePoster.jpg" : movie["Poster"];
    let id = movie["imdbID"];

    return `
          <span id=${id}></span> 
          <img src="${img}" alt="movie_name" class="movie-poster" />
          <span class="movie-name">${title}</span>
        `;
  });

  moviesSection.innerHTML = "";
  for (let movieCard of moviesCards) {
    let movieCardElement = Object.assign(document.createElement("div"), {
      className: "movie-card",
    });
    movieCardElement.innerHTML = movieCard;
    movieCardElement.addEventListener("click", () => {
      displayMovieDetails(movieCardElement.firstElementChild.id);
    });
    moviesSection.appendChild(movieCardElement);
  }
}

async function displayMovieDetails(movieId) {
  try {
    // geting data using id
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=a66eb111`
    );
    const currentMovie = response.data;

    // setting image if found null
    let img =
      currentMovie["Poster"] === "N/A"
        ? "./moviePoster.jpg"
        : currentMovie["Poster"];

    // building html for movies detail section
    movieDetailsElement.innerHTML = `<div id="movie-details-poster-container">
          <img src=${img} alt="movie-poster" id="movie-details-poster">
        </div>
        <div id="details">
          <p id='movie-title'>${currentMovie.Title}</p>
          <p id="movie-description">${currentMovie.Plot}</p>
          <p id="movie-directors">Directors: <span>${currentMovie.Director}</span></p>
          <p id="movie-writers">Writers: <span>${currentMovie.Writer}</span></p>
          <p id="movie-stars">Stars: <span>${currentMovie.Actors}</span></p>
          <span id="movie-rating">IMBD Rating: <span>${currentMovie.imdbRating}</span></span>
          <span id="movie-released-year">Released year: <span>${currentMovie.Year}</span></span>
        </div>`;
    movieDetailsElement.style.display = "flex";
  } catch (error) {
    console.log(error);
  }
}

// event listener for seraching
searchBtn.addEventListener("click", () => {
  movieDetailsElement.style.display = 'none';
  getUser(seachInputElement.value);
});

// calling to get data from function
getUser();
