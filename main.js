const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d6de4e7bc20889decc71162a1b451efe&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// w1280 = width: 1280px
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d6de4e7bc20889decc71162a1b451efe&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  
  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''
  
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie
    
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    
    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}"/>
      <div class="movie-info">
        <h3 class="movie-title">${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `
    
    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if(vote >= 8) return 'green'
  else if(vote >= 5) return 'orange'
  else return 'red'
}

form.addEventListener('submit', event => {
  event.preventDefault()
  const searchTerm = search.value
  
  if(searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})


// Botão search
const search_container = document.querySelector('.search-container');
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  search_container.classList.toggle('active');
  if (search_container.classList.contains('active')) search.focus();
});

search.addEventListener('blur', () => {
  if (search.value === '') search_container.classList.remove('active')
})