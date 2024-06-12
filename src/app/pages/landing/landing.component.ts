import { Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [IntroComponent, CarouselComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
