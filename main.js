let searchButton = document.querySelector('.searchSection__button'),
    output       = document.querySelector('.output'),
    defaultImage = "defaultImage.webp",
    seeDetailsButton = document.getElementsByClassName('output__details');


searchButton.addEventListener('click', () => {
    displayMovies();
});

/* Dispaying all the movies in the same page */
function displayMovies() {
    let searchInput = document.querySelector('.searchSection__searchInput'),
    title = searchInput.value,
    url = `https://api.themoviedb.org/3/search/movie?api_key=536e40067697fdce3d9a1d866d19e92b&language=en-US&query=${title}&page=1&include_adult=false`;

    // empty the result to show new ones
    output.innerHTML = "";

    if(title) {
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            let moviesArray = data.results;
            /* For every object (movie) in the moviesArray */
            moviesArray.forEach(movie => {

                let movieTitle = movie.original_title;
                let baseMovieImageUrl = "https://image.tmdb.org/t/p/w500/";
                let fullMovieImageUrl = baseMovieImageUrl.concat(movie.poster_path);
                
                if(movie.poster_path != null) {
                    output.innerHTML += `
                        <div class="output__movie">
                            <img class="output__image" src="${fullMovieImageUrl}" alt="${movieTitle}" />
                            <p class="output__title">${movieTitle}</p>
                            <a onclick="saveMovieIdToSessionStorage(${movie.id})" class="output__details" href="#">See Details</a>
                        </div>
                    `;
                } else {
                    output.innerHTML += `
                        <div class="output__movie">
                            <img class="output__image" src="${defaultImage}" alt="${movieTitle}" />
                            <p class="output__title">${movieTitle}</p>
                            <a onclick="saveMovieIdToSessionStorage(${movie.id})" class="output__details" href="details.html">See Details</a>
                        </div>
                    `;
                }
            })
        })
        .catch( err => {
            output.textContent = "OUPSIIIE, Keyword NOT found";
            console.log(err);
        });
    } else {

        output.textContent = "Don't forget to type in the keyword in the search field above :)"

    }
}

function saveMovieIdToSessionStorage(id) {
    sessionStorage.setItem("movieId", id);
    console.log(sessionStorage.getItem('movieId'));
    // REDIRECTING
    window.location = "details.html";
}

function getMovie() {
    
    let movieIdFromSessionStorage = sessionStorage.getItem('movieId');
    console.log(movieIdFromSessionStorage);
    let url = `https://api.themoviedb.org/3/movie/${movieIdFromSessionStorage}?api_key=536e40067697fdce3d9a1d866d19e92b&language=en-US`;

    fetch(url)
    .then((response) => response.json())
    .then(data => {

        let movieName = document.getElementById('movieName');
        let popularity = document.getElementById('popularity');
        let totalVotes = document.getElementById('totalVotes');
        let originalLanguage = document.getElementById('originalLanguage');
        let voteAverage = document.getElementById('voteAverage');
        let releasedDate = document.getElementById('releasedDate');
        let description = document.getElementById('description');
        let imageTag = document.getElementById('detailsImage');
        

        // // image url
        let movieTitle = data.original_title;
        let baseMovieImageUrl = "https://image.tmdb.org/t/p/w500/";
        let fullMovieImageUrl = baseMovieImageUrl.concat(data.poster_path);

        imageTag.setAttribute('src', fullMovieImageUrl);
        // // other info
        movieName.textContent = data.original_title;
        popularity.textContent = data.popularity;
        totalVotes.textContent = data.vote_count;
        originalLanguage.textContent = data.original_language;
        voteAverage.textContent = data.vote_average;
        releasedDate.textContent = data.release_date;
        description.textContent = data.overview;



    })
    .catch( err => {
        console.log(err);
    });
}