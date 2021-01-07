const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d6de4e7bc20889decc71162a1b451efe&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// w1280 = width: 1280px
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d6de4e7bc20889decc71162a1b451efe&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

let page = '1'

// Chama os filmes iniciais
getMovies(API_URL + page)

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



// Botão "search" e "get random page"
const search_container = document.querySelector('.search-container');
const btn = document.querySelector('.btn');
const randomPage = document.getElementById('random-page')
const randomMovie = document.getElementById('random-movie')


// Adiciona um ouvidor de eventos do tipo clique em "btn"
btn.addEventListener('click', () => {
  // Alterna (coloca/tira) a classe "active" em "search_container"
  search_container.classList.toggle('active');
  
  // Se "search_container" tiver a classe "active", o input "search" ganha foco
  if (search_container.classList.contains('active')) {
    search.focus();
    
    // Se a tela do documento for menor que 580 (pixel), ele entra
    if (document.body.clientWidth <= 580) {
      // Adiciona a classe "hidden" em "randomPage"
      randomPage.classList.add('hidden')
    } else {
      // Se não, remove
      randomPage.classList.remove('hidden')
    }
  }
});


// Aficiona ou ouvidor de eventos do tipo "blur" no input 'search' (quando perde o foco)
search.addEventListener('blur', () => {
  // Se "search" for igual a "" (nada) ele entra e remove a classe active de "search_container" e remove a classe "hidden" de "randomPage"
  if (search.value === '') { search_container.classList.remove('active')
    randomPage.classList.remove('hidden')
  }
})


// Adiciona um ouvidor de eventos do tipo clique no botão "randomPage"
randomPage.addEventListener('click', () => {
  // Chama a função "clearRandomMovie"
  clearRandomMovie()
  
  // Atribui a page algum valor aleatório entre 1 e 50
  page = Math.floor(Math.random() * 50) + 1
  // Adiciona o número da página ao título
  document.getElementsByTagName('title')[0].innerText = `Movie App - ${page}`
  
  // Chama a função "getMovies" passando o valor de "API_URL" + "page"
  getMovies(API_URL + page)
})


// Adiciona um ouvidor de eventos no botão "random-movie"
randomMovie.addEventListener('click', randomSelect)


// Função "clearRandomMovie"
function clearRandomMovie() {
  // Pega todos os elementos com a classe ".movie"
  const movies = document.querySelectorAll('.movie')
  // Remove a classe "highlight" dos itens dentro de "movies"
  movies.forEach(movie => movie.classList.remove('highlight'))
}


// Função que seleciona o filme com uma "animação"
function randomSelect() {
  // Chama a função "clearRandomMovie"
  clearRandomMovie()
  
  // Seta o tempo como 30ms
  const time = 30
  
  // Executa uma função a cada intervalo de 100ms na variável "interval"
  const interval = setInterval(() => {
    // Chama a função "pickRandomMovie" e armazena o valor do seu retorno em "randomMovie"
    const randomMovie = pickRandomMovie()
    
    // Chama a função "highlightMovie" com o retorno de "randomMovie"
    highlightMovie(randomMovie)
    
    // Chama a função "unHighlightMovie" passando o retorno de "randomMovie"
    setTimeout(() => unHighlightMovie(randomMovie), 100)
  }, 100)
  
  
  // Executa a função após "time * 100" (valor de time (que é 30) * 100)
  setTimeout(() => {
    // Interrompe o intervalo de "interval"
    clearInterval(interval)
    
    // Executa uma função após 100ms
    setTimeout(() => {
      // Chama a função "pickRandomMovie" e armazena o valor do seu retorno em "randomMovie"
      const randomMovie = pickRandomMovie()
      
      // Chama "highlightMovie" com o valor de "randomMovie"
      highlightMovie(randomMovie)
      
      // Faz a tela rolar até o elemento selecionado
      randomMovie.scrollIntoView()
    }, 100)
  }, time * 100)
}


// Função que seleciona alguma tag aleatória com a classe "movie"
function pickRandomMovie() {
  // Pega todos os elementos com a classe "movie" do documento
  const movies = document.querySelectorAll('.movie')

  // Retorna algum item de "movies" tendo seu índice como um número aleatório entre 0 e o comprimeiro de "movies"
  return movies[Math.floor(Math.random() * movies.length)]
}


// Função que adiciona a classe "highlight"
function highlightMovie(movie) {
  movie.classList.add('highlight')
}

// Função que remove a classe "highlight"
function unHighlightMovie(movie) {
  movie.classList.remove('highlight')
}