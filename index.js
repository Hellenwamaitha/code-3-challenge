document.addEventListener('DOMContentLoaded', () => {
  // Fetch film data from the API
  const filmDataEndpoint = ' http://localhost:3000/films';
  fetch(' http://localhost:3000/films')
    .then(response => response.json())
    .then(data => {
      const films = data; // Assuming the data is an array of film objects

      // Populate the movie menu
      const filmsList = document.getElementById('films');
      films.forEach(film => {
        const filmItem = document.createElement('li');
        filmItem.classList.add('film', 'item');
        filmItem.textContent = film.title;
        filmItem.addEventListener('click', () => {
          populateMovieDetails(film);
        });
        filmsList.appendChild(filmItem);
      });

      // Initial movie details display
      if (films.length > 0) {
        populateMovieDetails(films[0]);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  // Function to populate movie details
  const populateMovieDetails = (film) => {
    const moviePoster = document.querySelector('.movie-poster');
    const movieTitle = document.querySelector('.movie-title');
    const movieRuntime = document.querySelector('.movie-runtime');
    const movieShowtime = document.querySelector('.movie-showtime');
    const availableTicketsCount = document.getElementById('available-tickets-count');
    const buyTicketBtn = document.getElementById('buy-ticket-btn');

    moviePoster.src = film.poster;
    movieTitle.textContent = film.title;
    movieRuntime.textContent = `Runtime: ${film.runtime} minutes`;
    movieShowtime.textContent = `Showtime: ${film.showtime}`;
    availableTicketsCount.textContent = film.availableTickets;

    buyTicketBtn.addEventListener('click', () => {
      if (film.availableTickets > 0) {
        film.availableTickets--;
        availableTicketsCount.textContent = film.availableTickets;
        if (film.availableTickets === 0) {
          buyTicketBtn.disabled = true;
          buyTicketBtn.textContent = 'Sold Out';
        }
      }
    });
  };
});