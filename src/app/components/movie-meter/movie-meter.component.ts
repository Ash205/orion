import { Component, OnInit } from '@angular/core';
import { DATA } from './data';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-movie-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-meter.component.html',
  styleUrl: './movie-meter.component.scss'
})
export class MovieMeterComponent implements OnInit{
  movies = [...DATA];
  availableRounds = [5, 10, 500];
  rounds = 5;
  currentRound = 1;
  currentMovies: any[][] = [];
  score = 0;
  roundMetaData: any[] = []

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.currentRound = 1;
    this.score = 0;
    this.movies = this.movies.map(m => {
      return {...m, Read: false};
    }).filter(m => m.Poster_Image !== "N/A" && m.Poster_Image);
    this.roundMetaData = [];
    for (let i=0; i<this.rounds; i++) {
      this.roundMetaData = [
        ...this.roundMetaData,
        {
          over: false,
          result: ""
        }
      ]
    }
  }

  changeRound(round: number) {
    let roundsOver = this.roundMetaData.filter(r => r.over).length;
    if (round > roundsOver+1) return ;
    this.currentRound = round;
  }

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

  onMovieSelect(index: number) {
    if (this.roundMetaData[this.currentRound-1].over) return ;
    let altIndex = index==1 ? 0 : 1;
    if (this.currentMovies[this.currentRound-1][index].IMDB_Rating > 
      this.currentMovies[this.currentRound-1][altIndex].IMDB_Rating) {
        this.score++;
        this.roundMetaData[this.currentRound-1] = {
          ...this.roundMetaData[this.currentRound-1],
          over: true,
          result: "won"
        }
      }
      else {
        this.roundMetaData[this.currentRound-1] = {
          ...this.roundMetaData[this.currentRound-1],
          over: true,
          result: "lost"
        }
      }
  }

  onNext() {
    let roundsOver = this.roundMetaData.filter(r => r.over).length;
    this.currentRound = roundsOver+1;
    this.game();

    if (this.currentRound > this.rounds) {
      (document.querySelector(".game") as HTMLElement).style.display = "none";
      (document.querySelector(".end") as HTMLElement).style.display = "flex";
      (document.querySelector(".end-background") as HTMLElement).style.display = "block";
      (document.querySelector(".container") as HTMLElement).classList.remove('container--won');
      (document.querySelector(".container") as HTMLElement).classList.remove('container--lost');
    }
  }

  game() {
    if (this.currentRound > this.rounds) return ;
    this.currentMovies[this.currentRound-1] = [this.getRandomMovie()];
    this.currentMovies[this.currentRound-1] = [...this.currentMovies[this.currentRound-1], this.getRandomMovie(this.currentMovies[this.currentRound-1][0].IMDB_Rating)];
  }

  onStart() {
    (document.querySelector(".start") as HTMLElement).style.display = "none";
    (document.querySelector(".game") as HTMLElement).style.display = "block";
    this.resetGame();
    this.game();
  }

  downloadURI(uri: string, name: string) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  }

  playAgain() {
    (document.querySelector(".end") as HTMLElement).style.display = "none";
    (document.querySelector(".end-background") as HTMLElement).style.display = "none";
    (document.querySelector(".start") as HTMLElement).style.display = "flex";
  }

  downloadAsImage() {
      var element = document.querySelector(".container") as HTMLElement;
      html2canvas(element).then(function (canvas) {
          var myImage = canvas.toDataURL();
          // downloadURI(myImage, "cartao-virtual.png");

          var link = document.createElement("a");
          link.download = "movie-meter.png";
          link.href = myImage;
          document.body.appendChild(link);
          link.click();

      });
  }
}
