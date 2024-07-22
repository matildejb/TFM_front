import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { IDebts } from '../interfaces/idebts.interfaces';
import { IGroup } from '../interfaces/igroup.interfaces';
import { IMember } from '../interfaces/imember';
import { environment } from '../../environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	private baseUrl: string = `${environment.apiUrl}`;
	private profileUrl = `${this.baseUrl}/users/profile`;
	private httpClient = inject(HttpClient);
	private balanceSource = new BehaviorSubject<number | null>(null);


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
		return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/groups/delete/${id}`));
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

	getAllMembers(group_id: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<IMember>(`${this.baseUrl}/members/${group_id}/`)
		);
	}

	getMembersInMyGroups(user_id: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/members/${user_id}/known`)
		);
	}

	getMembersByGroupId(groupId: number): Promise<any> {
		return lastValueFrom(
			this.httpClient.get<any>(`${this.baseUrl}/members/${groupId}`)
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
		return lastValueFrom(this.httpClient.get<IUser>(this.profileUrl, { headers })).then(profile => {
			return profile;
		}).catch(error => {
			throw error;
		});
	}

	currentBalance = this.balanceSource.asObservable();
	updateBalance(balance: number) {
		this.balanceSource.next(balance);
	}

	createGroup(group: any): Promise<IGroup> {
		return lastValueFrom(this.httpClient.post<IGroup>(`${this.baseUrl}/groups/create`, group));
	}

}



