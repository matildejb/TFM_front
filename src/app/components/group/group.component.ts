import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
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
  TotalBalance: number = 0;
  user_id: number = 1;
  amountColor: string = 'green';
  showNoPaymentsMessage: boolean = false;

  // paymentService = inject(PaymentService);

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupService,
    private userService: UsersService,
  ) { }

  unUser: IUser | null = null;


  ngOnInit(): void {
    this.getMyGroups();
    // Obtén el ID del grupo de la ruta
    this.route.params.subscribe(params => {
      this.group_id = +params['id'];
      // this.getPayments(this.group_id);
      this.getPayments(this.group_id);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['amount']) {
      this.amountColor = this.amount < 0 ? 'Crimson' : 'Limegreen';
    }
  }

  async getPayments(group_id: any): Promise<void> {
    try {
      const group = await this.groupService.getGroupById(group_id);
      console.log(group)
      if (group) {
        this.unGroup = group;
        this.arrPayments = await this.groupService.getPayments(group_id);
        console.log('Mis grupos obtenidos:', this.arrPayments);
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
        console.log('Mis grupos obtenidos:', this.arrGroups);
      }
    } catch (error) {
      console.error('Error al obtener mis grupos:', error);
    }
  }

}
