const seachInputElement = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const moviesSection = document.getElementById("movies-section");

// to get the data from ombd api
async function getUser(movieName = "spiderman") {
  try {
    movieName = movieName === ''? 'Spiderman': movieName;
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${movieName}&page=1&apikey=a66eb111`
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
    let title = movie['Title'];
    let img = movie["Poster"] === 'N/A'? './moviePoster.jpg': movie['Poster'];

    return `<div class="movie-card">
          <img src="${img}" alt="movie_name">
          <span>${title}</span>
        </div>`;
  });

  moviesSection.innerHTML = "";
  for (let movieCard of moviesCards) {
    moviesSection.innerHTML += movieCard;
  }
}

// event listener for seraching
searchBtn.addEventListener('click', () => {
  getUser(seachInputElement.value);
})

// calling to get data from function
getUser();
