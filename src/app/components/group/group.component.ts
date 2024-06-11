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
      details: 'Nuestro viaje a Menorca será una escapada inolvidable. Descubriremos sus calas de aguas cristalinas, exploraremos pueblos encantadores como Ciutadella y Mahón, y nos maravillaremos con su rica historia en sitios como la Fortaleza de la Mola. Disfrutaremos de la gastronomía local, realizaremos excursiones en kayak y nos relajaremos bajo el resplandor de las estrellas. Será una experiencia que atesoraremos para siempre.',
      transactions: [
        { user: 'Ibon', userImage: 'path_to_image', concept: 'Billetes de avión', amount: 50, description: 'Compra de billetes de avión para todos' },
        { user: 'Ramon', userImage: 'path_to_image', concept: 'Comida', amount: 30, description: 'Compra de comida para el viaje' },
        { user: 'Julia', userImage: 'path_to_image', concept: 'Reserva de hotel', amount: 60, description: 'Reserva del hotel para todos' },
        { user: 'María', userImage: 'path_to_image', concept: 'Museos y monumentos', amount: 20, description: 'Entradas a museos y monumentos' },
        { user: 'Matilde', userImage: 'path_to_image', concept: 'Trenes y autobuses', amount: 25, description: 'Tickets de trenes y autobuses' },
        { user: 'Alberto', userImage: 'path_to_image', concept: 'Fiesta y copas', amount: 25, description: 'Gastos en fiesta y copas' }
      ]
    },
    {
      id: 2,
      icon: 'fa-receipt',
      title: 'Compras Súper',
      amount: -75.00,
      details: 'Necesidades del supermercado para el viaje',
      transactions: [
        { user: 'Ibon', userImage: 'path_to_image', concept: 'Productos del desayuno', amount: 10, description: 'Compra de productos para el desayuno' },
        { user: 'Ramon', userImage: 'path_to_image', concept: 'Frutas y verduras', amount: 20, description: 'Compra de frutas y verduras frescas' },
        { user: 'Julia', userImage: 'path_to_image', concept: 'Carne y pescado', amount: 25, description: 'Compra de carne y pescado para las comidas' },
        { user: 'María', userImage: 'path_to_image', concept: 'Bebidas', amount: 10, description: 'Compra de bebidas para el viaje' },
        { user: 'Matilde', userImage: 'path_to_image', concept: 'Productos de higiene', amount: 5, description: 'Compra de productos de higiene personal' },
        { user: 'Tú', userImage: 'path_to_image', concept: 'Compras en el súper', amount: -70, description: 'Pago de las compras en el supermercado para todos' }
      ]
    },
    {
      id: 3,
      icon: 'fa-gift',
      title: 'Regalo cumpleaños',
      amount: 48.00,
      details: 'Detalles del regalo de cumpleaños para ti',
      transactions: [
        { user: 'Ibon', userImage: 'path_to_image', concept: 'Contribución al regalo', amount: 10, description: 'Contribución al regalo de cumpleaños' },
        { user: 'Ramon', userImage: 'path_to_image', concept: 'Contribución al regalo', amount: 15, description: 'Contribución al regalo de cumpleaños' },
        { user: 'Julia', userImage: 'path_to_image', concept: 'Contribución al regalo', amount: 10, description: 'Contribución al regalo de cumpleaños' },
        { user: 'María', userImage: 'path_to_image', concept: 'Contribución al regalo', amount: 5, description: 'Contribución al regalo de cumpleaños' },
        { user: 'Matilde', userImage: 'path_to_image', concept: 'Contribución al regalo', amount: 5, description: 'Contribución al regalo de cumpleaños' },
        { user: 'Tú', userImage: 'path_to_image', concept: 'Aportación adicional', amount: 48, description: 'Aportación adicional al regalo de cumpleaños' }
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
    });
  }
}
