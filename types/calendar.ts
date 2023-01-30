export interface Calendar {
  /** 収支ID */
  paymentId: string
  /** 合計金額 */
  amount: string
  /** 収支フラグ */
  isPay: string
  /** 日付 */
  paymentDate: string
  /** 親カテゴリID */
  paymentCategoryParentId: string
  /** 子カテゴリID */
  paymentCategoryChildId: string
}
