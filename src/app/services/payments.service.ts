import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from '../../environments/environment.development';
import { lastValueFrom, Observable } from "rxjs";
import { IPayment } from "../interfaces/ipayments.interfaces";

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {

  private httpClient = inject(HttpClient);
  private groupUrl: string = `${environment.apiUrl}/groups`;
  private paymentUrl: string = `${environment.apiUrl}/payments`;
  private membersUrl: string = `${environment.apiUrl}/members`;

  grupoId: number | null = null;


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


  createPayment(payment: any): Promise<IPayment> {
    return lastValueFrom(
      this.httpClient.post<IPayment>(`${this.paymentUrl}/payments/create`, payment)
    );
  }


}