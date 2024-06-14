import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  msg: string = "";
  error: string = "";

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/groupsList'])
    }

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams.error === '1') {
        this.error = queryParams.error
        this.msg = "No tienes permiso para acceder a esta página, Registrate o haz login."
      }
    })
  }
}
