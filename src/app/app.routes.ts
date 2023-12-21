import { Routes } from '@angular/router';
import { MovieMeterComponent } from './components/movie-meter/movie-meter.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'movie-meter', component: MovieMeterComponent},
    {path: '**', redirectTo:'/home'}
];
