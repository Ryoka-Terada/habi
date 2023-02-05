import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'
import axios from 'axios'
import { categoryStore } from '../store'
import { ParentCategory } from '../types/parentCategory'
import { Calendar } from '../types/calendar'

config.rawError = true

@Module({ stateFactory: true, namespaced: true, name: 'calendar' })
export default class CalendarModule extends VuexModule {
  /**
   * 月の収支一覧
   */
  private monthPaymentList: Calendar[] = []

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
  get getMonthPaymentList(): Calendar[] {
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
  fetchMonthPaymentList(_payload: any) {
    const param: any = {
      params: {
        dateFrom: _payload.monthFirstDate,
        dateTo: _payload.monthEndDate,
      },
    }
    axios.get('api/payment', param).then((value) => {
      const payments = value.data.map((calendar: Calendar) => {
        return {
          paymentId: calendar.paymentId,
          amount: Number(calendar.amount),
          isPay: !!calendar.isPay,
          paymentDate: calendar.paymentDate,
          parentId: calendar.parentId,
          childId: calendar.childId ?? '',
        }
      })
      this.setMonthPaymentList(payments)
    })
  }

  /**
   * 月の収支カテゴリ合計を返す
   */
  @Action
  fetchMonthCategorySummary(month: string) {
    console.log(month + '月の収支カテゴリ合計を取得(※便宜的に６月を返す)')
    // 親カテゴリを取得
    categoryStore.fetchParentCategoryList()
    const categories = categoryStore.getParentCategoryPayList
    // 各親カテゴリにその月の合計額を追加
    const categorySummary: {
      parentId: string
      name: string
      isPay: boolean
      amount: number
    }[] = []
    categories.forEach((parent: ParentCategory) => {
      const amount = {
        parentId: parent.parentId,
        name: parent.categoryName,
        isPay: !!parent.isPay,
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
  setMonthPaymentList(list: Calendar[]) {
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
