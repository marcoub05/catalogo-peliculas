const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "9f534ea4c9f181d613fcdc13d6a63339";
let MOVIE_ID = "";

document.addEventListener("DOMContentLoaded", () => {

    MOVIE_ID = getUrlVars().id;
    renderMovieDetails(MOVIE_ID);
});

const getUrlVars = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {

        vars[key] = value;
        console.log(vars);
    });

    return vars;
}

const getMovieDetails = (movieId) => {

    const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => console.error(err))
}

const renderMovieDetails = async (movieId) => {

    const movieDetails = await getMovieDetails(movieId);
    const { backdrop_path, poster_path, title, overview, release_date, genres } = movieDetails;
    renderBackground(backdrop_path);
    renderPoster(poster_path, title);
    renderMovieData(title, overview, genres, release_date);
    getTeaser();
}

const renderBackground = (backdrop_path) => {
    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    document.getElementsByClassName('movie-info')[0].style.backgroundImage = `url('${urlImage}')`;
}

const renderPoster = (poster_path, title) => {

    const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
    const html = `
        <img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}">
    `;

    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;
}

const renderMovieData = (title, overview, genres, release_date) => {

    const dataSplit = release_date.split('-');

    let htmlGenres = "";
    genres.forEach(element => {
        htmlGenres += `
            <li>${element.name}</li>
        `
    });

    const html = `
        <h1>${title}
        <span class="date-any">${dataSplit[0]}</span>
        <span class="teaser" data-toggle="modal" data-target="#video-teaser">
        <i class="fas fa-play"></i>Ver trailer</span>
        </h1>
        <h5>General</h5>
        <p>${overview}</p>
        <h5>Generos</h5>
        <ul>
        ${htmlGenres}
        </ul>
    `

    document.getElementsByClassName('movie-info__data')[0].innerHTML = html;
}

const getTeaser = () => {
    const url = ` ${URL_PATH}/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(result => renderTeaser(result))
        .catch(err => console.error(err));
}

const renderTeaser = (objVideo) => {

    console.log(objVideo);
    let keyVideo = "";
    objVideo.results.forEach(video=>{
        if(video.type==="Trailer" && video.site==="YouTube"){
            keyVideo = video.key;
        }
    })

    let urlIframe = "";
    if(keyVideo!==""){
        urlIframe = `
        <iframe width="100%" height="440px" src="https://www.youtube.com/embed/${keyVideo}"
        frameborder="0" allow="accelerometer"; autoplay; ecrypted-media;
        gryscope; picture-in-pincture"allowfullscreen></iframe>
        `
    }
    else{
        urlIframe = "<div class='no-teaser'>No tiene trailer</div>"
    }

    document.getElementsByClassName('video-teaser-iframe')[0].innerHTML = urlIframe;

}