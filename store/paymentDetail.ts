import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'
import axios from 'axios'
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
    const param: any = {
      params: {
        dateFrom: targetDate,
        dateTo: targetDate,
      },
    }
    await axios.get('api/payment', param).then((value) => {
      const paymentDetailList = value.data.map(
        (paymentDetail: PaymentDetail) => {
          return {
            paymentId: paymentDetail.paymentId,
            amount: Number(paymentDetail.amount),
            isPay: !!paymentDetail.isPay,
            paymentDate: paymentDetail.paymentDate,
            parentId: paymentDetail.parentId,
            childId: paymentDetail.childId ?? '',
          }
        }
      )
      this.setPaymentDetailList(paymentDetailList)
    })
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
