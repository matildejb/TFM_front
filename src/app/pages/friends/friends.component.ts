import { Component } from '@angular/core';
import { FriendCardComponent } from '../../components/friend-card/friend-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [FriendCardComponent, NgFor],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  friendCards = [
    {
      name: "Ibón",
      image: "https://placehold.co/400",
      amount: +24.36
    },
    {
      name: "Ramón",
      image: "https://placehold.co/400",
      amount: -68.50
    },
    {
      name: "María",
      image: "https://placehold.co/400",
      amount: -3
    }
  ]
}
