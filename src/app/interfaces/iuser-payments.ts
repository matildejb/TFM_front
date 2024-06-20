import { IPayment } from "./ipayment";

export interface IUserPayments {
    userId: string;
    payments: IPayment[];
}
