import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'
import { categoryStore } from '../store'

config.rawError = true

@Module({ stateFactory: true, namespaced: true, name: 'calendar' })
export default class CalendarModule extends VuexModule {
  /**
   * 月の収支一覧
   */
  private monthPaymentList: { amount: number; isPay: boolean; date: string }[] =
    []

  /**
   * 月の収支カテゴリ合計
   */
  private monthCategorySummary: {
    parentId: string
    name: string
    isPay: boolean
    amount: number
  }[] = []

  /**
   * 月の収支一覧を返す
   */
  get getMonthPaymentList(): {
    amount: number
    isPay: boolean
    date: string
  }[] {
    return this.monthPaymentList
  }

  /**
   * 月の収支カテゴリ合計を返す
   */
  get getMonthCategorySummary(): {
    parentId: string
    name: string
    isPay: boolean
    amount: number
  }[] {
    return this.monthCategorySummary
  }

  /**
   * 月の収支一覧を取得
   */
  @Action
  fetchMonthPaymentList(month: string) {
    console.log(month + '月の収支一覧を取得(※便宜的に６月を返す)')
    const payments: { amount: number; isPay: boolean; date: string }[] = [
      { amount: 1000, isPay: true, date: '2022-06-10' },
      { amount: 850, isPay: true, date: '2022-06-12' },
      { amount: 2050, isPay: false, date: '2022-06-20' },
      { amount: 340, isPay: true, date: '2022-06-20' },
    ]
    this.setMonthPaymentList(payments)
  }

  /**
   * 月の収支カテゴリ合計を返す
   */
  @Action
  fetchMonthCategorySummary(month: string) {
    console.log(month + '月の収支カテゴリ合計を取得(※便宜的に６月を返す)')
    // 親カテゴリを取得
    categoryStore.fetchParentCategoryList()
    const categories = categoryStore.getParentCategoryList
    // 各親カテゴリにその月の合計額を追加
    const categorySummary: {
      parentId: string
      name: string
      isPay: boolean
      amount: number
    }[] = []
    categories.forEach((category) => {
      const amount = {
        parentId: category.id,
        name: category.name,
        isPay: category.isPay,
        amount: 99999, // ここの合計はバックエンドから取って来る
      }
      categorySummary.push(amount)
    })
    /**
     * テストデータの期待値
     *   { parentId: '1', name: '食費', isPay: true, amount: 99999 },
     *   { parentId: '2', name: '趣味', isPay: true, amount: 99999 },
     *   { parentId: '3', name: '給料', isPay: false, amount: 99999 },
     */
    this.setMonthCategorySummary(categorySummary)
  }

  /**
   * 月の収支一覧をセット
   */
  @Mutation
  setMonthPaymentList(
    list: { amount: number; isPay: boolean; date: string }[]
  ) {
    this.monthPaymentList = list
  }

  /**
   * 月の収支カテゴリ合計をセット
   */
  @Mutation
  setMonthCategorySummary(
    list: {
      parentId: string
      name: string
      isPay: boolean
      amount: number
    }[]
  ) {
    this.monthCategorySummary = list
  }
}
