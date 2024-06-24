export interface IPayment {
	id?: number;
	amount: number;
	description?: string;
	paid_by: number;
	payer_name?: string;
	participants: { userId: number };
	created_at?: number;
	transaction_id?: number;
	members_groups_id?: number;
	token?: string;
}