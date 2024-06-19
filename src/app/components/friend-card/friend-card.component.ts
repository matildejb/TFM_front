
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() title: string = '';
  @Input() amount: number = 0
  @Input() image: string = '';

  payments: any[] = [];
  userId: string = '11';  // Supongamos que el ID del usuario es '11'

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUserPayments();
  }

  getUserPayments(): void {
    this.usersService.getUserPayments(this.userId)
      .then(payments => {
        this.payments = payments;
      })
      .catch(error => {
        console.error('Error fetching user payments', error);
      });
  }




}
