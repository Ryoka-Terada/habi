<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
      <Calendar :payments="payments" :amount-pay="amountPay" />
    </v-container>
    <v-container>
      <v-row
        v-for="(categoryAmount, i) in categoryAmounts"
        :key="i"
        class="pl-3"
      >
        <v-col>{{ categoryAmount.category }}</v-col>
        <v-spacer />
        <v-col>{{ categoryAmount.amount }}{{ $t('common.yen') }}</v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <v-footer class="pb-4" app color="rgba(107,78,113,.0)">
      <v-spacer />
      <v-btn fab elevation="5" to="/">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Index extends Vue {
  amountPay!: number
  payments: { amount: number; paymentFrag: number; date: string }[] = [
    { amount: 1000, paymentFrag: 0, date: '2022-06-10' },
    { amount: 850, paymentFrag: 0, date: '2022-05-12' },
    { amount: 2050, paymentFrag: 1, date: '2022-05-20' },
    { amount: 340, paymentFrag: 0, date: '2022-05-20' },
  ]

  categoryAmounts: { category: string; amount: number }[] = [
    { category: '食費', amount: 99999 },
    { category: '趣味', amount: 99999 },
    { category: 'その他', amount: 99999 },
  ]

  created() {
    let amountPay = 0
    this.payments.forEach((payment) => {
      payment.paymentFrag
        ? (amountPay = amountPay + 0)
        : (amountPay = amountPay + payment.amount)
    })
    this.amountPay = amountPay
  }
}
</script>
