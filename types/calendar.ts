// 後ほどPaymentDetailと合体させるか検討
export interface Calendar {
  /** 収支ID */
  paymentId: string
  /** 合計金額 */
  amount: number
  /** 収支フラグ */
  isPay: boolean
  /** 日付 */
  paymentDate: string
  /** 親カテゴリID */
  parentId: string
  /** 子カテゴリID */
  childId: string
}
