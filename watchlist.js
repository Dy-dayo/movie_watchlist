
const watchListArea = document.getElementById('watchlist-area')
let localWatchList

function renderWatchList() {
    localWatchList = JSON.parse(localStorage.getItem('toWatchArray'))
    const myWatchList = localWatchList.map(movie => {
        return `
            <div class="movie">
                <!-- movies image -->
                <img src="${movie.Poster}" alt="The Poster for the movie">
                <!--Movie Details-->
                <div> 
                    <div class="movie-name-area"> <!--Movie name and rating flex-->
                        <h3> ${movie.Title}</h3>
                        <img src="images/star.png" alt="A star that indicates that the movie is top notch" srcset="">
                        <span>${movie.imdbRating}</span>
                    </div>
                    <p class="movie-time-detail">
                        <span>${movie.Runtime}</span> 
                        <span> ${movie.Genre}</span>
                        <button class='remove-btn remove'>
                            <img src="images/remove-btn.png" alt="An icon you can click to remove movies">
                        </button> 
                        <span class="watchlist-text">Remove</span>
                    </p>
                    <p>${movie.Plot}</p>
                </div>
            </div>`
    }).join('')

    watchListArea.innerHTML = myWatchList

    if (watchListArea) {
        const removeBtn = document.getElementsByClassName("remove")
        const movie = document.getElementsByClassName("movie")
        for (let i = 0; i < removeBtn.length; i++) {
            removeBtn[i].onclick = () => {
                movie[i].style.display = 'none'
                localWatchList.splice(i,1)
                localStorage.setItem('toWatchArray', JSON.stringify(localWatchList))
            }
        }
    }
}

renderWatchList()
