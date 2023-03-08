import Movie from "./movie.js"
const movieArea = document.getElementById('movie-area')
const search = document.getElementById('search')
const form = document.getElementById('form')
let movieIDs = []
let searchedMovies = []


if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        getMovieId()
    })
}


// Getting movie from api//

function getMovieId() {
    movieIDs = []
    const searchValue = search.value
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=31a5e553`)
        .then(res => res.json())
        .then(data => {
            for (let movie of data.Search) {
                movieIDs.push(movie.imdbID)
            }
            form.reset()
            getMovie()
        })

}

function getMovie() {
    searchedMovies = []
    for (let movie of movieIDs) {
        fetch(`https://www.omdbapi.com/?i=${movie}&apikey=31a5e553`)
            .then(res => res.json())
            .then(data => {

                if (!searchedMovies.includes(data)) {
                    searchedMovies.push({ ...data, watchList: false })
                    setMovieHtml()
                }
            })
    }

}

function setMovieHtml() {
    localStorage.setItem('prevSearch', JSON.stringify(searchedMovies))
    const Movies = searchedMovies.map(movie => {
        return new Movie(movie).displayMovie()
    }).join('')
    movieArea.innerHTML = Movies
    return Movies
}

// To render the prevSearch of a user.
function getOldMovie() {
    let oldMovies = JSON.parse(localStorage.getItem('prevSearch'))
    if (oldMovies.length > 0) {
        const Movies = oldMovies.map(movie => {
            return new Movie(movie).displayMovie()
        }).join('')
        movieArea.innerHTML = Movies
    }
}
// The if statement to make sure it only renders when the page is at index.html that has the  movieArea div
if (movieArea) {
    getOldMovie()
}


// for rerenders when movies are selected
function render() {
    movieArea.innerHTML = setMovieHtml()
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.movie) {
        makeWatchlist(e.target.dataset.movie)
    }
})

let toWatchArray = []


function makeWatchlist(id) {

    if (!searchedMovies.length > 0) {
        searchedMovies = JSON.parse(localStorage.getItem('prevSearch'))
    }
    const makeToWatch = searchedMovies.filter(search => {
        return search.imdbID === id
    })[0]

    makeToWatch.watchList = !makeToWatch.watchList
    render()

    const toWatch = searchedMovies.filter(search => {
        return search.watchList
    })

    if (localStorage.getItem('toWatchArray')) {
        toWatchArray = JSON.parse(localStorage.getItem('toWatchArray'))
    }

    for (let movie of toWatch) {
        if (!toWatchArray.includes(movie)) {
            toWatchArray.unshift(movie)
        }
    }
    let myMovies = toWatchArray.slice(0,8)

    localStorage.setItem('toWatchArray', JSON.stringify(myMovies))
}


