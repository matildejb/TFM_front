import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent {
  @Input() icon: string = 'fa-plane-departure';
  @Input() title: string = 'Viaje a Menorca';
  @Input() amount: string = '+210,00€';
}
