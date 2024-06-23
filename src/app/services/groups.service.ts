// import { lastValueFrom } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment.development';
// import { Injectable, inject } from '@angular/core';
// import { IUser } from '../interfaces/iuser.interfaces';
// import { IGroup } from '../interfaces/igroup.interfaces';
// import { IPayment } from '../interfaces/ipayments.interfaces';

// @Injectable({
// 	providedIn: 'root',
// })
// export class GroupService {
// 	private baseUrl: string = `${environment.apiUrl}`;

// 	private httpClient = inject(HttpClient);

// 	// Funcionalidad de lista de grupos
// 	getMyGroups(user_id: number): Promise<IGroup[]> {
// 		return lastValueFrom(
// 			this.httpClient.get<IGroup[]>(`${this.baseUrl}/groups/${user_id}`)
// 		);
// 	}

// 	getUserById(id: number): Promise<IUser> {
// 		return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
// 	}

// 	// Funcionalidad de pagos de cada grupo
// 	getPayments(group_id: number): Promise<any> {
// 		return lastValueFrom(
// 			this.httpClient.get<IPayment>(`${this.baseUrl}/payments/${group_id}/`)
// 		);
// 	}

// 	deleteGroup(id: number): Promise<IGroup> {
// 		return lastValueFrom(this.httpClient.delete<IGroup>(`${this.baseUrl}/${id}`));
// 	}

// 	getGroupById(group_id: number): Promise<IGroup> {
// 		return lastValueFrom(
// 			this.httpClient.get<IGroup>(`${this.baseUrl}/groups/group/${group_id}/`)
// 		);
// 	}


// 	getAllUsers(): Promise<IGroup[]> {
// 		return lastValueFrom(
// 			this.httpClient.get<IGroup[]>(`${this.baseUrl}/users/userList`)
// 		);
// 	}

// 	getAllMembers(): Promise<IGroup[]> {
// 		return lastValueFrom(
// 			this.httpClient.get<IGroup[]>(`${this.baseUrl}/members/:group_id/`)
// 		);
// 	}

// 	// addMemberToGroup(group_id: number, user_id: number): Promise<IGroup> {
// 	addMember(groupId: string, userEmail: string): Promise<any> {
// 		const url = `${this.baseUrl}/groups/${groupId}/add`;
// 		return lastValueFrom(this.httpClient.post(url, { email: userEmail }));
// 	}
// }




// groups.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	private baseUrl: string = `${environment.apiUrl}`;

	// constructor(private httpClient: HttpClient) { }
	private httpClient = inject(HttpClient);

	getMyGroups(user_id: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/groups/${user_id}`)
		);
	}

	getUserById(id: number): Promise<any> {
		return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
	}

	getPayments(group_id: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/payments/${group_id}/`)
		);
	}

	deleteGroup(id: number): Promise<any> {
		return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`));
	}

	getGroupById(group_id: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/groups/group/${group_id}/`)
		);
	}

	getAllUsers(): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/users/userList`)
		);
	}

	getAllMembers(): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/members/:group_id/`)
		);
	}

	addMember(groupId: string, userEmail: string): Promise<any> {
		const url = `${this.baseUrl}/members/${groupId}/add`;
		return lastValueFrom(this.httpClient.post(url, { email: userEmail }));
	}

	getUserEmail(userId: number): Promise<any> {
		return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/users/email/${userId}`));
	}
}


// router.post('/:group_id/add', checkAdmin, addMember);
