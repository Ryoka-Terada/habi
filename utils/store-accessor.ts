/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import CategoryModule from '~/store/category'
import PaymentDetailModule from '~/store/paymentDetail'
import CalendarModule from '~/store/calendar'

let categoryStore: CategoryModule
let paymentDetailStore: PaymentDetailModule
let calendarStore: CalendarModule

function initialiseStores(store: Store<any>): void {
  categoryStore = getModule(CategoryModule, store)
  paymentDetailStore = getModule(PaymentDetailModule, store)
  calendarStore = getModule(CalendarModule, store)
}

export { initialiseStores, categoryStore, paymentDetailStore, calendarStore }
