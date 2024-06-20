import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { IMember } from '../../interfaces/imember';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {
  @Input() title: string = '';

  userIds: string[] = [];
  members: IMember[] = [];

  // Objeto para almacenar los pagos por cada usuario
  userPayments: { [userId: string]: any[] } = {};

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.members = this.usersService.getMembers();
    this.userIds = this.members.map(member => member.id.toString());

    // Inicializar userPayments para cada userId
    this.userIds.forEach(userId => {
      this.userPayments[userId] = []; // Inicializamos el array de pagos vacío
      this.loadUserPayments(userId); // Cargamos los pagos para cada userId
    });
  }

  loadUserPayments(userId: string): void {
    this.usersService.getUserPayments(userId)
      .then(payments => {
        // Actualizamos userPayments con los pagos obtenidos para este userId
        this.userPayments[userId] = payments;
      })
      .catch(error => {
        console.error('Error fetching user payments for userId:', userId, error);
      });
  }
}