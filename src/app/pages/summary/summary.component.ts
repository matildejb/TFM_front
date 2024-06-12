import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  isGroupsModalOpen = false;
  isFriendsModalOpen = false;

  openGroupsModal() {
    this.isGroupsModalOpen = true;
    this.isFriendsModalOpen = false;
  }

  openFriendsModal() {
    this.isFriendsModalOpen = true;
    this.isGroupsModalOpen = false;
  }

  closeGroupsModal() {
    this.isGroupsModalOpen = false;
  }

  closeFriendsModal() {
    this.isFriendsModalOpen = false;
  }
}
