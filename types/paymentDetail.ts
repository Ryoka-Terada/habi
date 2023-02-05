export interface PaymentDetail {
  /** 収支ID */
  paymentId: string
  /** 合計金額 */
  amount: number
  /** 収支フラグ */
  isPay: string
  /** 日付 */
  paymentDate: string
  /** 親カテゴリID */
  parentId: string
  /** 子カテゴリID */
  childId: string
}
