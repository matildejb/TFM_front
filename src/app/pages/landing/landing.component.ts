import { Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [IntroComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
