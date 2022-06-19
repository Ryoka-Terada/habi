<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
      <Calendar :payments="payments" />
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
import { calendarStore } from '../store'

@Component
export default class Index extends Vue {
  /** 月の収支一覧 */
  payments: { amount: number; isPay: boolean; date: string }[] = []

  /** カテゴリ内訳 */
  categoryAmounts: {
    parentId: string
    name: string
    isPay: boolean
    amount: number
  }[] = []

  created() {
    // 月の収支一覧を取得
    calendarStore.fetchMonthPaymentList('6')
    this.payments = calendarStore.getMonthPaymentList
    calendarStore.fetchMonthCategorySummary('6')
    this.categoryAmounts = calendarStore.getMonthCategorySummary
  }
}
</script>
