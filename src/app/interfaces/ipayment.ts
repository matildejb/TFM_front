export interface IPayment {
    id: number,
    amount: string,
    description: string,
    paid_by: number,
    created_at: string,
    members_groups_id: number,
    participant_amount: string
}
