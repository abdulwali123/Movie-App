const movies_container=document.querySelector('.movies-container');
const search=document.querySelector('.search');
const form=document.querySelector('.form');

const APIURL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
async function fetchMovieApi(url) {
    const response=await fetch(url)
    const respData= await response.json();
    const movies=respData.results;
    InsertMovies(movies)
}



fetchMovieApi(APIURL)



function InsertMovies(movies) {
movies.forEach(movie => {
   
    const movieEl=document.createElement('div');
    movieEl.classList.add('movie-box');
    movieEl.innerHTML=`
 
    <img src="${IMGPATH+movie.poster_path}"></div>
    <div class="movie-title">
       <h3>${movie.title}</h3>
        <span class="${checkVote(movie)}">${movie.vote_average}</span>
    </div>
    <div class="overview">
    <h3>Overview:</h3>
    <p>
    ${movie.overview}
    </p>
</div>
    
    `  
    movies_container.appendChild(movieEl);
});

}
form.addEventListener('submit',(e)=>{
    movies_container.innerHTML=`
    `
    e.preventDefault();
    const search_term=search.value;
    fetchMovieApi(SEARCHAPI+search_term)
})
function checkVote(movies) {
    if (movies.vote_average>=7) {
        return "green"
    }
    else if (movies.vote_average>=6) {
        return "yellow"
}
else{
    return "red"
}
}

