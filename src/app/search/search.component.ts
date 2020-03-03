import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
      <input name="Movie" ngModel required #movie="ngModel">
      <input name="Actor" ngModel required #actor="ngModel">
    </form>

    <p>Movie value: {{ movie.value }}</p>
    <p>Actor value: {{ actor.value }}</p>

    `,
})
export class SearchComponent implements OnInit {
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
  constructor() { }

  ngOnInit(): void {
  }
}