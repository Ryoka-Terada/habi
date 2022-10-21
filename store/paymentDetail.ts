import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'
import { PaymentDetail } from '../types/paymentDetail'

config.rawError = true

@Module({ stateFactory: true, namespaced: true, name: 'paymentDetail' })
export default class PaymentDetailModule extends VuexModule {
  /**
   * 一日の収支リスト
   * @type {PaymentDetail[]}
   */
  private paymentDetailList: PaymentDetail[] = []

  /**
   * 一日の収支リストを返す
   * @return {PaymentDetail[]}
   */
  get getPaymentDetailList(): PaymentDetail[] {
    return this.paymentDetailList
  }

  /**
   * 一日の収支リストを取得
   */
  @Action
  async fetchPaymentDetailList(targetDate: string): Promise<void> {
    await console.log(targetDate + 'の収支リストを取得する')
    const paymentDetailList: PaymentDetail[] = [
      {
        parentId: '2',
        childId: '2a',
        amount: 2200,
        isPay: true,
      },
      {
        parentId: '1',
        childId: '1b',
        amount: 500,
        isPay: true,
      },
      {
        parentId: '3',
        childId: '3a',
        amount: 800,
        isPay: false,
      },
      { parentId: '', childId: '', amount: 100, isPay: true },
    ]
    this.setPaymentDetailList(paymentDetailList)
  }

  /**
   * 一日の収支リストを登録
   */
  @Action
  registPaymentDetailList(list: PaymentDetail[]) {
    console.log(list + 'を新規登録する')
  }

  /**
   * 一日の収支リストを更新
   */
  @Action
  updatePaymentDetailList(list: PaymentDetail[]) {
    console.log(list + 'を更新する')
  }

  /**
   * 一日の収支リストをセット
   */
  @Mutation
  setPaymentDetailList(list: PaymentDetail[]) {
    this.paymentDetailList = list
  }
}
