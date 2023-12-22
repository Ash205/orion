import { Component } from '@angular/core';
import { DATA } from './data';

@Component({
  selector: 'app-movie-meter',
  standalone: true,
  imports: [],
  templateUrl: './movie-meter.component.html',
  styleUrl: './movie-meter.component.scss'
})
export class MovieMeterComponent {
  movies = [...DATA];
  availableRounds = [5, 10, 500];
  rounds = 5;
  currentRound = 1;
  currentMovies: any[] = [];

  changeMode(id: string) {
    document.querySelectorAll(".mode").forEach(mode => (mode as HTMLElement).classList.remove("active"));
    (document.querySelector("#"+id) as HTMLElement).classList.add("active");
    let index = Number(id[id.length-1]);
    this.rounds = this.availableRounds[index-1];
  }

  getRandomMovie(rating: number = 0) {
    let filteredMovies = this.movies.filter(m => m.IMDB_Rating!==rating && m.Read===false);
    let index = Math.floor(Math.random() * (filteredMovies.length + 1));
    let movie = filteredMovies[index];

    let ogIndex = this.movies.findIndex(x => x.Poster_Link===movie.Poster_Link);
    this.movies[ogIndex].Read = true;

    return movie;
  }

  setStyle() {

  }

  game() {
    if (this.currentRound > this.rounds) return ;
    this.currentMovies = [this.getRandomMovie()];
    this.currentMovies = [...this.currentMovies, this.getRandomMovie(this.currentMovies[0].IMDB_Rating)];

    this.setStyle();
  }

  onStart() {
    (document.querySelector(".start") as HTMLElement).style.display = "none";
    (document.querySelector(".game") as HTMLElement).style.display = "block";
    this.game();
  }
}
