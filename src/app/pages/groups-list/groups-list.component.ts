import { Component } from '@angular/core';
import { GroupCardComponent } from '../../components/group-card/group-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [GroupCardComponent, GroupsListComponent, CommonModule],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent {
  groupCards = [
    {
      icon: 'fa-plane-departure',
      title: 'Viaje a Menorca',
      time: '2024-05-18 16:50:23',
      amount: 210.00,
      navigateTo: '/group/1'
    },
    {
      icon: 'fa-receipt',
      title: 'Compras Súper',
      time: '2024-05-06 12:25:37',
      amount: -75.00,
      navigateTo: '/group/2'
    },
    {
      icon: 'fa-gift',
      title: 'Regalo cumpleaños',
      time: '2024-05-12 15:16:08',
      amount: 75.00,
      navigateTo: '/group/3'
    }
  ];

  get TotalBalance(): number {
    return this.groupCards.reduce((acc, groupCard) => acc + groupCard.amount, 0);
  }
}