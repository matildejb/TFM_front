  import { Component, inject } from '@angular/core';
    import { CommonModule, NgFor } from '@angular/common';
    import { UsersService } from '../../services/users.service';
    import { ActivatedRoute } from '@angular/router';
import { FriendCardComponent} from '../../components/friend-card_historial/friend-card.component';
import { IMember } from '../../interfaces/imember';
    
    @Component({
      selector: 'app-friends',
      standalone: true,
      imports: [FriendCardComponent,  CommonModule],
      templateUrl: './friends.component.html',
      styleUrl: './friends.component.css'
    })
    export class FriendsComponent {
      amigos: any[] = [];
      loading: boolean = false;

      constructor(private servicio: UsersService) { }
      ngOnInit(): void {
        this.fetchFriendsList();
      }
    
      async fetchFriendsList() {
        try {
          this.loading = true;
          this.amigos = await this.servicio.getMembersOfSharedGroupsForLoggedInUser();
          console.log('Amigos:', this.amigos);
        } catch (error) {
          console.error('Error fetching friends list in component:', error);
        } finally {
          this.loading = false;
        }
      }
    }