console.log('table.js loaded');

async function loadMovies() {
  try {
    const eidr = document.getElementById('eidr').value;
    const genre = document.getElementById('genre').value;

    let res;

    console.log(eidr);
    if (eidr == "" && genre == ""){
      res = await fetch('/movies');
    } else if (eidr != "" && genre == ""){
      res = await fetch(`/movies/${eidr}`);
    } else if (eidr == "" && genre != ""){
      res = await fetch(`/movies/:genre=${genre}`);
    } else{
      res = await fetch(`/movies/:eidr=${eidr}`);
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
      //cuts hours from date data type when displaying
      tdDate.textContent = String(movie.datePublished).slice(0,10);

      const tdGenre = document.createElement('td');
      tdGenre.textContent = movie.genre;

      const tdDirector = document.createElement('td');
      tdDirector.textContent = movie.directorName;

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
