import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Injectable, inject } from '@angular/core';
import { IGroup } from '../interfaces/igroup.interfaces';
import { IUser } from '../interfaces/iuser.interfaces';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	private baseUrl: string = `${environment.apiUrl}`;

	private httpClient = inject(HttpClient);

	// Funcionalidad de lista de grupos
	getMyGroups(user_id: number): Promise<IGroup[]> {
		return lastValueFrom(
			this.httpClient.get<IGroup[]>(`${this.baseUrl}/groups/${user_id}`)
		);
	}

	getUserById(id: number): Promise<IUser> {
		return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
	}

	getAllUsers(): Promise<IGroup[]> {
		return lastValueFrom(
			this.httpClient.get<IGroup[]>(`${this.baseUrl}/users/userList`)
		);
	}

	getAllMembers(): Promise<IGroup[]> {
		return lastValueFrom(
			this.httpClient.get<IGroup[]>(`${this.baseUrl}/members/:group_id/`)
			// this.httpClient.get<IGroup[]>(`${this.baseUrl}/members/${group_id}/`)
		);
	}


}