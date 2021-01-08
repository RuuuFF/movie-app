// Atribui a "API_URL" o link da api (sem o número da página)  
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d6de4e7bc20889decc71162a1b451efe&page='
// Atribui a "IMG_PATH" a url para fazer a busca pela imagem (o "código" da imagem será concatenada mais tarde)
// w1280 = width: 1280px
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
// Atribui a "SEARCH_API" a url para fazer as pesquisas (o termo procurado vais ser concatenado no final)
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d6de4e7bc20889decc71162a1b451efe&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

let page = '1'

// Chama a função assim que a página é carregada passando "API_URL" + "page" (que tem o valor de '1')
getMovies(API_URL + page)


// Função "getMovies"
async function getMovies(url) {
  // Faz um HTTP request passando a url
  const res = await fetch(url)
  // Trata o resultado
  const data = await res.json()
  
  console.log(data)
  
  // Chama a função "showMovies" passando o objeto "data.results" ("results" é um array com objetos dentro)
  showMovies(data.results)
}


// Função "showMovies" que recebe "data.results" como "movies"
function showMovies(movies) {
  // Limpa tudo que tem dentro do elemento "main"
  main.innerHTML = ''
  
  // Executa uma função cada item dentro do array "movies"
  movies.forEach(movie => {
    // Pega "title", "poster_path", "vote_average" e "overview" de dentro de movie, os "transformando" em uma variável
    const { title, poster_path, vote_average, overview } = movie
    
    // Cria uma tag "div"
    const movieEl = document.createElement('div')
    // Adiciona a classe "movie" ao elemento criado
    movieEl.classList.add('movie')
    
    // Adiciona HTML dentro da div criada
    // Na imagem ele ele utiliza "IMG_PATH" com "poster_path" para acessar a url da imagem e "title" para o alt
    // "title" insere o título do item
    // Chama a função "getClassByRate" passando "vote_average", que, dependendo do valor, retorna a classe (red, orange ou green)
    // Insere "vote_average" no campo "span"
    // Adiciona o texto contido em "overview"
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
    
    // Adiciona "movieEl" criado na tag "main"
    main.appendChild(movieEl)
    
    // Irá repetir isso em todos os itens dentro do array
  })
}

// Função "getClassByRate" que recebe "vote_average" na chamada onde cria os itens
function getClassByRate(vote) {
  // Se vote for maior ou igual a 8, retorna 'green'
  if(vote >= 8) return 'green'
  // Se for maior ou igual a 5, retorna 'orange'
  else if(vote >= 5) return 'orange'
  // Se não for nenhuma das duas condições, retorna 'red'
  else return 'red'
}

// Adiciona um ouvidor de eventos do tipo "submit" no formulário, passando seu evento
form.addEventListener('submit', event => {
  // Cancela o evento
  event.preventDefault()
  // Pega o valor dentro de "search" e o atribui para a variável "searchTerm"
  const searchTerm = search.value
  
  // Se "searchTerm" tiver algum valor, retorna true E (&&) "searchTerm" não for igual a "''" (nada), retorna true
  if(searchTerm && searchTerm !== '') {
    // Chama a função "getMovies" passando "SEARCH_API" + "searchTerm"
    getMovies(SEARCH_API + searchTerm)
    // Limpa o valor dentro de "search"
    search.value = ''
  } else {
    // Recarrega a página
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