// import { Injectable } from '@angular/core';
// import { lastValueFrom } from 'rxjs';
// import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
// import { IUser } from '../interfaces/iuser.interfaces';

// @Injectable({
// 	providedIn: 'root'
// })
// export class GroupService {
// 	private groups = [
// 		{
// 			id: 1,
// 			icon: 'fa-plane-departure',
// 			title: 'Viaje a Menorca',
// 			amount: 210.00,
// 			time: '2024-05-06 12:00:00',
// 			transactions: [
// 				{ user: 'Ibon', concept: 'Billetes de avión', time: '2024-06-05 12:05:08', amount: 50 },
// 				{ user: 'Ramon', concept: 'Comida', time: '2024-06-05 12:05:08', amount: 30 },
// 				{ user: 'Julia', concept: 'Reserva de hotel', time: '2024-06-05 12:05:08', amount: 60 },
// 				{ user: 'María', concept: 'Museos y monumentos', time: '2024-06-05 12:05:08', amount: 20 },
// 				{ user: 'Matilde', concept: 'Trenes y autobuses', time: '2024-06-05 12:05:08', amount: 25 },
// 				{ user: 'Alberto', concept: 'Fiesta y copas', time: '2024-06-05 12:05:08', amount: 25 }
// 			]
// 		},
// 	];

// 	private baseUrl = 'http://localhost:3000';

// 	constructor(private httpClient: HttpClient) { }

// 	getGroups() {
// 		return this.groups;
// 	}

// 	getGroupById(id: number) {
// 		return this.groups.find(group => group.id === id);
// 	}

// 	getTotalBalance() {
// 		return this.groups.reduce((acc, group) => acc + group.amount, 0);
// 	}

// 	getAllUsers(): Promise<IUser> {
// 		return lastValueFrom(
// 			this.httpClient.get<any>(`${this.baseUrl}/userList`));
// 	}

// 	searchUser(query: any): Promise<{ results: any[] }> {
// 		return lastValueFrom(
// 			this.httpClient.get<{ results: any[] }>(`${this.baseUrl}/getAllUsers`, { params: query })
// 		);
// 	}
// }

import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser.interfaces';
import { IGroup } from '../interfaces/igroup.interfaces';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	private baseUrl = 'http://localhost:3000';

	constructor(private httpClient: HttpClient) { }

	getAllUsers(): Promise<IUser[]> {
		return lastValueFrom(
			this.httpClient.get<IUser[]>(`${this.baseUrl}/userList`)
		);
	}

	searchUser(query: any): Promise<{ results: any[] }> {
		return lastValueFrom(
			this.httpClient.get<{ results: any[] }>(`${this.baseUrl}/getAllUsers`, { params: query })
		);
	}

	deleteGroup(id: number): Promise<IGroup> {
    return lastValueFrom(this.httpClient.delete<IGroup>(`${this.baseUrl}/${id}`));
  }
}
