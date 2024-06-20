  import { Component, inject } from '@angular/core';
    import { CommonModule, NgFor } from '@angular/common';
    import { UsersService } from '../../services/users.service';
    import { ActivatedRoute } from '@angular/router';
import { FriendCardComponent} from '../../components/friend-card/friend-card.component';
import { IMember } from '../../interfaces/imember';
    
    @Component({
      selector: 'app-friends',
      standalone: true,
      imports: [FriendCardComponent,  CommonModule],
      templateUrl: './friends.component.html',
      styleUrl: './friends.component.css'
    })
    export class FriendsComponent {
      members: IMember[] = [];
      userId: string = '11';
      userPayments: { [userId: string]: any[] } = {}; // Objeto para almacenar pagos por usuario
    
      constructor(private memberService: UsersService) {}
    
      ngOnInit(): void {
        this.loadMembers();
      }
    
      loadMembers(): void {
        this.memberService.getMembersOfSharedGroups(this.userId)
          .then(members => {
            this.members = members;
            console.log('Miembros que comparten grupos con el usuario:', members);
    
            // Inicializar userPayments para cada usuario
            this.members.forEach(member => {
              this.userPayments[member.id.toString()] = [];
              this.loadUserPayments(member.id.toString());
            });
          })
          .catch(error => {
            console.error('Error al cargar los miembros:', error);
          });
      }
    
      loadUserPayments(userId: string): void {
        this.memberService.getUserPayments(userId)
          .then(payments => {
            this.userPayments[userId] = payments;
            console.log('Pagos para el usuario ' + userId + ':', payments);
          })
          .catch(error => {
            console.error('Error al cargar los pagos para el usuario ' + userId + ':', error);
          });
      }
    }
    

   