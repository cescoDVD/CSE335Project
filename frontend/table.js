console.log('table.js loaded');

async function loadMovies() {
  try {
    const eidr = document.getElementById('eidr').value.trim();
    const genre = document.getElementById('genre').value.trim();

    let res;

    console.log(eidr);
    if (eidr == "" && genre == ""){
      res = await fetch('/movies');
    } else if (eidr != ""){
      res = await fetch(`/movies/?:eidr=${eidr}`);
    } else if (eidr == "" && genre != ""){
      res = await fetch(`/movies/?:genre=${genre}`);
    }


    console.log('status', res.status);
    const movies = await res.json();
    console.log('movies', movies);

    const tbody = document.getElementById('movies-body');
    tbody.innerHTML = '';

    movies.forEach(movie => {
      const tr = document.createElement('tr');

      const tdTitle = document.createElement('td');
      tdTitle.textContent = movie.title;

      const tdDate = document.createElement('td');
      tdDate.textContent = movie.datePublished;

      const tdGenre = document.createElement('td');
      tdGenre.textContent = movie.genre;

      const tdDirector = document.createElement('td');
      tdDirector.textContent = movie.directorID;

      tr.appendChild(tdTitle);
      tr.appendChild(tdDate);
      tr.appendChild(tdGenre);
      tr.appendChild(tdDirector);

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('loadMovies error', err);
  }
}

window.addEventListener('DOMContentLoaded', loadMovies);
