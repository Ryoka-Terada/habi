<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
      <Calendar :payments="payments" @setCalendarMonth="setCalendarMonth" />
    </v-container>
    <v-container>
      <v-row
        v-for="(categoryAmount, i) in categoryAmounts"
        :key="i"
        class="pl-3"
      >
        <v-col>{{ categoryAmount.name }}</v-col>
        <v-spacer />
        <v-col v-if="categoryAmount.isPay" class="pay--text text--darken-1">
          {{ categoryAmount.amount }}{{ $t('common.yen') }}
        </v-col>
        <v-col
          v-else-if="!categoryAmount.isPay"
          class="income--text text--darken-1"
        >
          {{ categoryAmount.amount }}{{ $t('common.yen') }}
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <v-footer class="pb-4" app color="rgba(107,78,113,.0)">
      <v-spacer />
      <v-btn fab elevation="5" to="/paymentDetail?target">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import moment from 'moment'
import { calendarStore } from '../store'

@Component
export default class Index extends Vue {
  /** 月の収支一覧 */
  payments: { amount: number; isPay: boolean; date: string }[] = []

  /** 選択日 */
  selectDate!: string

  /** 検索条件 */
  searchParam: { monthFirstDate: string; monthEndDate: string } = {
    monthFirstDate: '',
    monthEndDate: '',
  }

  /** カテゴリ内訳 */
  categoryAmounts: {
    parentId: string
    name: string
    isPay: boolean
    amount: number
  }[] = []

  /**
   * 月の収支一覧を取得
   */
  get paymentList() {
    calendarStore.fetchMonthPaymentList(this.searchParam)
    return 'hello'
  }

  created() {}

  /**
   * カレンダー月が変更された場合、関係値をセット
   */
  setCalendarMonth(val: any) {
    this.setBetweenDate(val)
    this.selectDate = val
  }

  /**
   * 選択された月の開始日と終了日をセット
   */
  setBetweenDate(date: string): void {
    const year = moment(date).year()
    const month = moment(date).month()
    const firstDate = new Date(year, month, 1).toLocaleDateString()
    const endDate = new Date(year, month + 1, 0).toLocaleDateString()
    this.searchParam.monthFirstDate = moment(firstDate).format('yyyy-MM-DD')
    this.searchParam.monthEndDate = moment(endDate).format('yyyy-MM-DD')
  }
}
</script>
