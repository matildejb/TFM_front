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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { IDebts } from '../interfaces/idebts.interfaces';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	private baseUrl: string = `${environment.apiUrl}`;
	private profileUrl = `${this.baseUrl}/users/profile`;


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

	getMembersInMyGroups(user_id: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/members/${user_id}/known`)
		);
	}

	addMember(groupId: string, userEmail: string): Promise<any> {
		const url = `${this.baseUrl}/members/${groupId}/add`;
		return lastValueFrom(this.httpClient.post(url, { email: userEmail }));
	}

	getUserEmail(userId: number): Promise<any> {
		return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/users/email/${userId}`));
	}

	// Funcionalidad de deudas de cada usuario
	getDebtsById(group_id: number, user_id: number): Promise<IDebts[]> {
		return lastValueFrom(
			this.httpClient.get<IDebts[]>(`${this.baseUrl}/debts/${group_id}/${user_id}/`)
		);
	}

	getLoggedInUserProfile(): Promise<IUser> {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		});
		console.log('Requesting user profile...');
		return lastValueFrom(this.httpClient.get<IUser>(this.profileUrl, { headers })).then(profile => { // Obtén el perfil del usuario actual con el token almacenado en localStorage
			console.log('User profile received:', profile);
			return profile;
		}).catch(error => {
			console.error('Error fetching user profile:', error);
			throw error;
		});
	}
}



