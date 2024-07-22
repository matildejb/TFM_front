import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { IDebt } from '../../interfaces/idebt';
import { FriendCardComponent } from '../../components/friend-card_historial/friend-card.component';
import { IMember } from '../../interfaces/imember';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [RouterLink, CommonModule, FriendCardComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  members: IMember[] = [];
  userPayments: { [userId: string]: any[] } = {}; // Objeto para almacenar pagos por usuario


  constructor(private memberService: UsersService) { }


  ngOnInit(): void {
    this.loadUserProfileAndMembers();
  }


  private async loadUserProfileAndMembers(): Promise<void> {
    try {
      const userProfile = await this.memberService.getLoggedInUserProfile();
      const userId = userProfile.id.toString();
      this.loadMembers(userId);
    } catch (error) {
      console.error('Error al obtener el perfil del usuario logado:', error);
    }
  }


  private loadMembers(userId: string): void {
    this.memberService.getMembersOfSharedGroups(userId)
      .then(members => {
        this.members = members;
        console.log('Miembros que comparten grupos con el usuario:', members);


        this.members.forEach(member => {
          this.userPayments[member.id.toString()] = [];
          this.loadUserPayments(member.id.toString());
        });
      })
      .catch(error => {
        console.error('Error al cargar los miembros:', error);
      });
  }


  private loadUserPayments(userId: string): void {
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



