import { Component } from '@angular/core';
import { GroupCardComponent } from '../../components/group-card/group-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [GroupCardComponent, CommonModule],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent {
  groupCards = [
    {
      icon: 'fa-plane-departure',
      title: 'Viaje a Menorca',
      amount: 210.00,
      navigateTo: '/group/1'
    },
    {
      icon: 'fa-receipt',
      title: 'Compras Súper',
      amount: -75.00,
      navigateTo: '/group/2'
    },
    {
      icon: 'fa-gift',
      title: 'Regalo cumpleaños',
      amount: 48.00,
      navigateTo: '/group/3'
    }
  ];

  get TotalBalance(): number {
    return this.groupCards.reduce((acc, groupCard) => acc + groupCard.amount, 0);
  }
}
