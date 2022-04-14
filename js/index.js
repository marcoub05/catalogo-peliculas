const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "9f534ea4c9f181d613fcdc13d6a63339";

document.addEventListener("DOMContentLoaded", () => {

    renderNewMovies();
    // renderPopularMovies();
    // renderTopRatedMovies();
    renderListMovies('popular','now-playing__list');
    renderListMovies('top_rated','top-rated-playing__list');
});

const getMovies = (type)=>{
    const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(err => console.error(err))
}

const getNewsMovies = () => {

    const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`

    return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(err => console.error(err))
}



const renderListMovies = async(type,classLoc)=>{

    const movies = await getMovies(type);

    let html = "";

    movies.forEach((movie, index)=>{
        const {id, title, poster_path} = movie;

        const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        
        if(index<5){
           
            html+=`
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
                </li>
            `
        }
    })

    document.getElementsByClassName(classLoc)[0].innerHTML = html;
}

const renderNewMovies = async () => {

    const newMovies = await getMovies('now_playing');

    let html = "";

    newMovies.forEach((movie, index) => {

        const { id, title, overview, backdrop_path } = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;

        const urlMovie = `../movie.html?id=${id}`;
        html += `
            <div class="carousel-item ${index == 0 ? "active" : null}" style="background-image: url('${urlImage}')">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Más información</a>
                </div> 
            </div>
        `
    });

    html += `
        <a class="carousel-control-prev" href="#carousel-new-movies" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel-new-movies" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    `

    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;
}

const getPopularMovies = ()=>{
    const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

    return fetch(url)
    .then(response=>response.json())
    .then(result =>result.results)
    .catch(err=>console.error(err));
}

const renderPopularMovies = async()=>{

    const movies = await getMovies('popular');

    let html = "";

    movies.forEach((movie, index)=>{
        const {id, title, poster_path} = movie;

        const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        
        if(index<5){
           
            html+=`
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
                </li>
            `
        }
    })

    document.getElementsByClassName('now-playing__list')[0].innerHTML = html;
}

const getTopRatedMovies = () =>{
    const url = `${URL_PATH}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

    return fetch(url)
    .then(response=>response.json())
    .then(result=> result.results)
    .catch(err=>console.error(err))
}

const renderTopRatedMovies = async()=>{
    const movies = await getMovies('top_rated');

    let html = "";
    movies.forEach((movie,index)=>{
        const{id,title,poster_path} = movie;

        const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        if(index<5){
            
            html+=`
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
                </li>
            `
        }
    })

    document.getElementsByClassName('top-rated-playing__list')[0].innerHTML = html;
}