
class Movie {
    constructor(data) {
        Object.assign(this,data)
    }
    displayMovie() {
        const {Poster,Title,imdbRating,Runtime,Genre,imdbID,watchList,Plot} = this
        return `
                <div class="movie">
                    <!-- movies image -->
                    <img src="${Poster}" alt="The Poster for the movie">
    
                    <!--Movie Details-->
                    <div> 
                        <div class="movie-name-area"> <!--Movie name and rating flex-->
                            <h3> ${Title}</h3>
                            <img src="images/star.png" alt="A star that indicates that the movie is top notch" srcset="">
                            <span>${imdbRating}</span>
                        </div>
    
                        <p class="movie-time-detail">
                            <span>${Runtime}</span> 
                            <span> ${Genre}</span>
                            <button class='add-btn'>
                                <img src="images/add-icon.png" alt="An icon you can click to add movies" data-movie=${imdbID}>
                            </button> 
                                <span class="watchlist-text" data-movie=${imdbID}>${watchList? 'Remove':'Watchlist'}</span>
                            </span>
                        </p>
                        <p>${Plot}</p>
                    </div>
                </div>
            `
    }

}
export default Movie