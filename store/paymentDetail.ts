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
    await axios.get('api/payments', param).then((value) => {
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
  async updatePaymentDetailList(_payload: any) {
    const param: any = _payload
    let error = false
    await axios
      .post('api/payments', param)
      .catch(() => {
        error = true
      })
      .then(() => {
        if (!error) {
          // console.log(_payload[0].paymentDate)
        }
      })
  }

  /**
   * 一日の収支リストをセット
   */
  @Mutation
  setPaymentDetailList(list: PaymentDetail[]) {
    this.paymentDetailList = list
  }
}
