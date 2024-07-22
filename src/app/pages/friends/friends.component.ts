import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FriendCardComponent } from '../../components/friend-card_historial/friend-card.component';
import { IMember } from '../../interfaces/imember';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [FriendCardComponent, CommonModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {


  members: any[] = [];
  private subscription: Subscription = new Subscription(); // Inicialización aquí

  constructor(private membersService: UsersService) { }

  ngOnInit(): void {
    this.loadKnownMembers();
  }

  loadKnownMembers(): void {
    this.subscription = this.membersService.getKnownMembers()
      .subscribe({
        next: (data) => {
          this.members = data;
          console.log('Datos de miembros recibidos:', data);
        },
        error: (error) => {
          console.error('Error fetching members:', error);
        },
        complete: () => {
          console.log('Fetching members complete.');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

