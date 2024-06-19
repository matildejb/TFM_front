
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() title: string = '';
  @Input() amount: number = 0
  @Input() image: string = '';
}
