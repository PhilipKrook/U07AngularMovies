import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { PersonDetailComponent } from "./person-detail/person-detail.component";


const routes: Routes = [
  { path: "movies", component: MoviesComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "detail/:id", component: MovieDetailComponent },
  { path: "person/:id", component: PersonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
