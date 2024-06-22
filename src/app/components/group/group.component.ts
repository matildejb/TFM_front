import { Component, OnInit, inject } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { IGroup } from '../../interfaces/igroup.interfaces';
import { IPayment } from '../../interfaces/ipayments.interfaces';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./group.component.css'],
  templateUrl: './group.component.html',
})
export class GroupComponent implements OnInit {
  unGroup: IGroup | null = null;
  arrPayments: IPayment[] = [];
  groupService = inject(GroupService);
  group_id: number = 0;

  // paymentService = inject(PaymentService);

  constructor(
    private route: ActivatedRoute // Inyecta ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtén el ID del grupo de la ruta
    this.route.params.subscribe(params => {
      this.group_id = +params['id'];
      this.getPayments(this.group_id);
    });
  }

  async getPayments(group_id: any): Promise<void> {
    try {
      const group = await this.groupService.getGroupById(group_id);
      console.log(group)
      if (group) {
        this.unGroup = group;
        this.arrPayments = await this.groupService.getPayments(group_id);
        console.log('Mis grupos obtenidos:', this.arrPayments);
      }
    } catch (error) {
      console.error('Error al obtener mis grupos:', error);
    }
  }

}
