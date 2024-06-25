import { CommonModule } from '@angular/common';
import {
	Component,
	Input,
	OnInit,
	Output,
	SimpleChanges,
	inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/iuser.interfaces';
import { IGroup } from '../../interfaces/igroup.interfaces';
import { UsersService } from '../../services/users.service';
import { GroupComponent } from '../group/group.component';
import { IPayment } from '../../interfaces/ipayments.interfaces';

@Component({
	selector: 'app-group-card',
	standalone: true,
	imports: [CommonModule, RouterLink, GroupComponent],
	templateUrl: './group-card.component.html',
	styleUrls: ['./group-card.component.css'],
})
export class GroupCardComponent implements OnInit {
	arrGroups: IGroup[] = [];
	group_id: number = 0;
	// user_id: number = 1;
	user_id: number | null = null;
	@Input() navigateTo: number | null = null;
	@Input() amount: number = 0;
	// balance: number = 0;
	//   @Input() balance: any;
	debts: number = 0;
	groupTitle: string = '';
	unGroup: IGroup | null = null;
	arrPayments: IPayment[] = [];
	payment: any;
	showNoPaymentsMessage: boolean = false;
	receivedBalance: any;
	balance: any;

	groupService = inject(GroupService);

	constructor(
		private http: HttpClient,
		private userService: UsersService,
		private route: ActivatedRoute
	) { }

	unUser: IUser | null = null;
	amountColor: string = 'green';

	ngOnChanges(changes: SimpleChanges) {
		if (changes['amount']) {
			this.amountColor =
				this.amount !== null && this.amount < 0 ? 'Crimson' : 'Limegreen';
		}
	}

	ngOnInit(): void {
		this.groupService.currentBalance.subscribe((balance) => {
			this.receivedBalance = balance;
		});

		// this.groupService.balance$.subscribe(balance => {
		// 	this.balance = balance; // Suscribe al balance del servicio para actualizarlo en el componente
		// });
		// this.route.params.subscribe(params => {
		// 	this.group_id = +params['id'];
		// 	if (this.user_id !== null) {
		// 		this.getDebtsById(this.group_id, this.user_id);
		// 	}
		// });

		this.getMyGroups();
		// Obtén el ID del grupo de la ruta
		this.route.params.subscribe((params) => {
			this.group_id = +params['id'];
			//   if (this.user_id !== null) {
			//     this.getDebtsById(this.group_id, this.user_id); // Obtén las deudas del usuario con el ID obtenido de la ruta
			//   }
			// this.getPayments(this.group_id);
		});
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

	// async getDebtsById(group_id: number, user_id: number): Promise<void> {
	// 	try {
	// 		const debts = await this.groupService.getDebtsById(group_id, user_id);
	// 		console
	// 		if (debts && debts.length > 0) {
	// 			this.balance = debts[0].balance; // Asigna el balance del primer objeto de deudas a la variable balance
	// 			console.log('Balance actualizado:', this.balance);
	// 		} else {
	// 			this.balance = 0; // Si no hay deudas, asegura que el balance sea cero
	// 		}
	// 	} catch (error) {
	// 		console.error('Error al obtener deudas:', error);
	// 	}
	// }
	//   async getDebtsById(group_id: number, user_id: number): Promise<void> {
	//     try {
	//       const debts = await this.groupService.getDebtsById(group_id, user_id);
	//       if (debts && debts.length > 0) {
	//         this.balance = debts[0].balance; // Asigna el balance del primer objeto de deudas a la variable balance
	//         console.log('Balance actualizado:', this.balance);
	//       } else {
	//         this.balance = 0; // Si no hay deudas, asegura que el balance sea cero
	//       }
	//     } catch (error) {
	//       console.error('Error al obtener deudas:', error);
	//     }
	//   }
}