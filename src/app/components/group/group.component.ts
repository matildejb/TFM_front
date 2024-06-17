import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  groupId: number = 0;
  groupData: any;
  title: string = '';
  TotalBalance: number = 0;
  transactions: any[] = [];

  groups = [
    {
      id: 1,
      icon: 'fa-plane-departure',
      title: 'Viaje a Menorca',
      amount: 210.00,
      time: '2024-05-06 12:00:00',
      transactions: [
        { user: 'Ibon', concept: 'Billetes de avión', time: '2024-06-05 12:05:08', amount: 50 },
        { user: 'Ramon', concept: 'Comida', time: '2024-06-05 12:05:08', amount: 30 },
        { user: 'Julia', concept: 'Reserva de hotel', time: '2024-06-05 12:05:08', amount: 60 },
        { user: 'María', concept: 'Museos y monumentos', time: '2024-06-05 12:05:08', amount: 20 },
        { user: 'Matilde', concept: 'Trenes y autobuses', time: '2024-06-05 12:05:08', amount: 25 },
        { user: 'Alberto', concept: 'Fiesta y copas', time: '2024-06-05 12:05:08', amount: 25 }
      ]
    },
    {
      id: 2,
      icon: 'fa-receipt',
      title: 'Compras Súper',
      amount: -75.00,
      time: '2024-05-06 12:00:00',
      transactions: [
        { user: 'Ibon', concept: 'Productos del desayuno', time: '2024-06-05 12:05:08', amount: 10 },
        { user: 'Ramon', concept: 'Frutas y verduras', time: '2024-06-05 12:05:08', amount: 20 },
        { user: 'Julia', concept: 'Carne y pescado', time: '2024-06-05 12:05:08', amount: 25 },
        { user: 'María', concept: 'Bebidas', time: '2024-06-05 12:05:08', amount: 10 },
        { user: 'Matilde', concept: 'Productos de higiene', time: '2024-06-05 12:05:08', amount: 50 },
        { user: 'Tú', concept: 'Compras en el súper', time: '2024-06-05 12:05:08', amount: -70 }
      ]
    },
    {
      id: 3,
      icon: 'fa-gift',
      title: 'Regalo cumpleaños',
      amount: 28.00,
      time: '2024-05-06 12:00:00',
      transactions: [
        { user: 'Ibon', concept: 'Contribución al regalo', time: '2024-06-05 12:05:08', amount: 10 },
        { user: 'Ramon', concept: 'Contribución al regalo', time: '2024-06-05 12:05:08', amount: 15 },
        { user: 'Julia', concept: 'Contribución al regalo', time: '2024-06-05 12:05:08', amount: 10 },
        { user: 'María', concept: 'Contribución al regalo', time: '2024-06-05 12:05:08', amount: 5 },
        { user: 'Matilde', concept: 'Contribución al regalo', time: '2024-06-05 12:05:08', amount: 5 },
        { user: 'Tú', concept: 'Aportación adicional', time: '2024-06-05 12:05:08', amount: 48 }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = +params['id'];
      this.groupData = this.groups.find(group => group.id === this.groupId);
      this.title = this.groupData.title;
      this.TotalBalance = this.groupData.amount;
      this.transactions = this.groupData.transactions;
      this.TotalBalance = this.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    });
  }
}