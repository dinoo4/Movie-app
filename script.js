// TMDB

const API_KEY = 'api_key=48dca8752b45231cade22b50b71775e1';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?${API_KEY}&sort_by=popularity.desc&page1`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = `${BASE_URL}/search/movie?${API_KEY}&page1`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL);	

function getMovies(url) {

	fetch(url).then(res => res.json()).then(data => {
			console.log(data.results)
			showMovies(data.results);
		});
}

function showMovies(data) {
		main.innerHTML = '';

		data.forEach(movie => {
			const {title, poster_path, release_date, vote_average} = movie;
			const movieEl = document.createElement('div');
			movieEl.classList.add('movie')
			movieEl.innerHTML = `
			<img src="${IMG_URL+poster_path}" alt="${title}" />

				<div class="movie-info">
					<h3>${title}</h3>
					<span class="${getColor(vote_average)}">${vote_average}</span>
				</div>

				<div class="releaseDate">
				${release_date}
				</div>

				`


				main.appendChild(movieEl);
		})
}


function getColor(vote) {
	if (vote >= 8) {
		return 'green'
	} else if (vote >= 5) {
		return 'orange'
	} else {
		return 'red'
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const searchTerm = search.value

	if(searchTerm) {
		getMovies(searchURL+'&query='+searchTerm)
	} else {
		getMovies(API_URL)
	}

})