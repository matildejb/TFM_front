import { Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [IntroComponent, CarouselComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
