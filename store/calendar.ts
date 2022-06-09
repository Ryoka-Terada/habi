import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'

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
  private monthCategorySummary: any = []

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
  get getMonthCategorySummary(): [] {
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
    console.log(month + '月の収支カテゴリ合計を取得')
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
  setMonthCategorySummary(list: []) {
    this.monthCategorySummary = list
  }
}
