import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GroupService } from '../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/iuser.interfaces';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-group-card',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './group-card.component.html',
	styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
	arrGroups: any[] = [];
	user_id: number = 1;

	constructor(
		private http: HttpClient,
		private groupService: GroupService,
		private userService: UsersService,
	) { }

	unUser: IUser | null = null;

	ngOnInit(): void {
		this.getMyGroups();
	}

	async getMyGroups(): Promise<void> {
		try {
			this.arrGroups = await this.groupService.getMyGroups(this.user_id);
			console.log('Mis grupos obtenidos:', this.arrGroups);
		} catch (error) {
			console.error('Error al obtener mis grupos:', error);
		}
	}
}