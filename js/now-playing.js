const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "9f534ea4c9f181d613fcdc13d6a63339";

document.addEventListener("DOMContentLoaded", () => {

    let {page} = getUrlVars();

    page == undefined ? page = 1 : null;
    renderNewsMovies(page);
    renderControls(page);
})

const getUrlVars = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {

        vars[key] = value;
        console.log(vars);
    });

    return vars;
}

const getNewsMovies = (page) => {

    const url = ` ${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(err => console.error(err))
}

const renderNewsMovies = async (page) => {

    const movies = await getNewsMovies(page);
    let html = "";

    movies.forEach(movie => {
        const { id, title, poster_path } = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlMoreInfo = `../movie.html?id=${id}`

        html += `
            <div class="col-3 col-custom">
                <a href="${urlMoreInfo}" class="card custom-card">
                    <img src=${urlImage} class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h4 class="card-title text-center m-0">${title}</h4>
                    </div>
                </a>
            </div>
       `
    })

    document.getElementsByClassName('list-cards')[0].innerHTML = html;
}

const renderControls = (page) => {

    const baseUrlPage = "../now-playing.html?page=";
    const pageNumber = parseInt(page);
    const previus = pageNumber-1;
    const next = pageNumber+1;

    let html = "";

    if(page==1){
        html = `
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                    
                </li>
                <li class="page-item active">
                    <a href="${baseUrlPage+"1"}" class="page-link">1</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage+"2"}" class="page-link">2</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage+"3"}" class="page-link">3</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage+"2"}" class="page-link"><i class="fas fa-chevron-right"></i></a>
                </li>
            </ul>
        `
    }
    else{
        html = `
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="${baseUrlPage+previus}"><i class="fas fa-chevron-left"></i></a>
                    
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage+previus}" class="page-link">${previus}</a>
                </li>
                <li class="page-item active">
                    <a href="${baseUrlPage+page}" class="page-link">${page}</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage+next}" class="page-link">${next}</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage+next}" class="page-link"><i class="fas fa-chevron-right"></i></a>
                </li>
            </ul>
        `
    }

    document.getElementsByClassName('navigation')[0].innerHTML = html;
}