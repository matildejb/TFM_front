import { Component, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { IGroup } from '../../interfaces/igroup.interfaces';
import { IPayment } from '../../interfaces/ipayments.interfaces';
import { CommonModule } from '@angular/common';
import { MenuButtonsComponent } from '../menu/menu-buttons.components';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interfaces';


@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuButtonsComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() amount: number = 0;
  unGroup: IGroup | null = null;
  arrGroups: IGroup[] = [];
  arrPayments: IPayment[] = [];
  groupService = inject(GroupService);
  group_id: number = 0;
  payment: any;
  user_id: number | null = null;
  showNoPaymentsMessage: boolean = false;
  debts: number = 0;
  // @Output() balance: any;
  balance: any;
  groupTitle: string = '';

  // paymentService = inject(PaymentService);

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
  ) { }

  unUser: IUser | null = null;


  ngOnInit(): void {
    Promise.all([
      this.groupService.getLoggedInUserProfile(),
      new Promise(resolve => this.route.params.subscribe(params => resolve(params)))
    ]).then(([user, params]: [IUser, any]) => {
      this.user_id = user.id;
      this.group_id = +params['id'];

      this.getMyGroups();
      this.getPayments(this.group_id);
      this.getDebtsById(this.group_id, this.user_id);
    }).catch(error => {
      console.error('Error during initialization:', error);
    });
  }

  async getPayments(group_id: any): Promise<void> {
    try {
      const group = await this.groupService.getGroupById(group_id);
      if (group) {
        this.unGroup = group;
        this.arrPayments = await this.groupService.getPayments(group_id);
        console.log('Mis movimientos son:', this.arrPayments);
        this.showNoPaymentsMessage = this.arrPayments.length === 0;
      }
    } catch (error) {
      console.error('Error al obtener mis grupos:', error);
    }
  }

  async getMyGroups(): Promise<void> {
    try {
      const user = await this.userService.getProfile();
      if (user) {
        this.unUser = user;
        this.arrGroups = await this.groupService.getMyGroups(user.id);
      }
    } catch (error) {
      console.error('Error al obtener mis grupos:', error);
    }
  }

  async getDebtsById(group_id: number, user_id: any): Promise<void> {
    try {
      const user = await this.userService.getProfile();
      // this.user_id = user[0].id;
      const debts = await this.groupService.getDebtsById(group_id, user_id);
      console.log('El balance de deudas es:', debts);
      if (debts && debts.length > 0) {
        this.balance = debts[0].balance; // Asigna el balance del primer objeto de deudas a la variable balance
        // console.log('Balance actualizado:', this.balance);
      } else {
        this.balance = 0; // Si no hay deudas, asegura que el balance sea cero
      }
      this.groupService.updateBalance(this.balance);
    } catch (error) {
      console.error('Error al obtener deudas:', error);
    }
  }

  async getUserById(id: number): Promise<void> {
    try {
      const user = await this.userService.getUserById(id);
      console.log('Usuario obtenido:', user);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }

}