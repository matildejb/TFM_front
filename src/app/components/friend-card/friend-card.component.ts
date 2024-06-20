import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { IMember } from '../../interfaces/imember';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() userPayments: any[] = []; // Arreglo de pagos para el usuario

  constructor() {}

  ngOnInit(): void {
    // Aquí podrías inicializar datos adicionales o manejar eventos del componente
  }
}