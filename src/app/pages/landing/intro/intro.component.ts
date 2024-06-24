import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

   texts: string[] = ["Amigos", "Compañeros de piso", "Pareja", "Familiares"];
  currentText: string = this.texts[0];
  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.rotateText();
  }

  rotateText(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.currentText = this.texts[this.currentIndex];
    }, 3000);
  }

   ngAfterViewInit(): void {
    const options = {
      strings: ["Crea cualquier categoria de gastos."],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 6000,
      loop: true
    };

    new Typed('#typed', options);
  }
}