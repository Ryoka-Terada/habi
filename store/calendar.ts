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
  fetchMonthPaymentList(_payload: any): void {
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
