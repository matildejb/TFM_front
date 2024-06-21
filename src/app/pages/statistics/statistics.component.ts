import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { IDebt } from '../../interfaces/idebt';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  payments: any[] = []; // Aquí almacenaremos los pagos del usuario

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loadUserPayments();
  }

  async loadUserPayments() {
    try {
      const userId = '11'; // Puedes obtener el ID del usuario de tu sesión o donde lo tengas almacenado
      const payments = await this.userService.getUserPayments(userId);
      const paymentsWithMembers = await this.getPaymentsWithMembers(payments);
      this.payments = paymentsWithMembers;
      console.log(this.payments)
    } catch (error) {
      console.error('Error al cargar los pagos del usuario:', error);
    }
  }

  async getPaymentsWithMembers(payments: any[]): Promise<any[]> {
    const paymentsWithMembersPromises = payments.map(async (payment) => {
      const groupDetails = await this.userService.getGroupDetails(payment.groupId);
      const member = await this.userService.getMemberById(groupDetails.memberId); // Suponiendo que groupDetails tiene un campo memberId que es el ID del miembro
      console.log('Member:', member); 
      return {
        ...payment,
        receiverName: member.name // Suponiendo que el miembro tiene un campo 'name'
      };
    });
    return Promise.all(paymentsWithMembersPromises);
  }
}


