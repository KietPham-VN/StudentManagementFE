import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [ HomeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'FEStudent';
}
