import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from "rxjs";
import { IPayment } from "../interfaces/ipayments.interfaces";

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {

  private httpClient = inject(HttpClient);
  private groupUrl: string = `${environment.apiUrl}/groups`;
  private paymentUrl: string = `${environment.apiUrl}/payments`;
  private membersUrl: string = `${environment.apiUrl}/members`;

  groupId: number | null = null;


  getGroupById(groupId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.groupUrl}/group/${groupId}`)
    );
  }

  getMembersInMyGroups(user_id: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.membersUrl}/${user_id}/known`)
    );
  }

  createPayment(group_id: number, payment: any): Promise<IPayment> {
    return lastValueFrom(
      this.httpClient.post<IPayment>(`${this.paymentUrl}/${group_id}/create`, payment)
    );
  }

}