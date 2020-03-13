import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "../movie";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { MovieService } from "../movie.service";

@Component({
  selector: "app-person-detail",
  templateUrl: "./person-detail.component.html",
  styleUrls: ["./person-detail.component.css"]
})
export class PersonDetailComponent implements OnInit {
  @Input() person: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.movieService.getPerson(id).subscribe(person => (this.person = person));
  }

  goBack(): void {
    this.location.back();
  }
}
