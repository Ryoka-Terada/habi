<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn color="primary" @click="prevMonth"
          ><v-icon>mdi-arrow-left-bold-outline</v-icon></v-btn
        >
      </v-col>
      <v-col cols="auto">{{ title }}</v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="nextMonth"
          ><v-icon>mdi-arrow-right-bold-outline</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-card-title>{{ amountPay }}{{ $t('common.yen') }}</v-card-title>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        locale="ja"
        :event-height="1000"
      >
        <template #day-label="{ day, weekday, date }">
          <p
            v-if="weekend.includes(weekday)"
            class="red--text text--darken-1"
            @click="show(date)"
          >
            {{ day }}
          </p>
          <p v-else @click="show(date)">{{ day }}</p>
        </template>
        <template #day="{ date }">
          <v-card height="70" flat tile @click="show(date)">
            <v-container>
              <div v-for="(payment, i) in payments" :key="i">
                <v-row v-if="payment.date == date">
                  <p v-if="payment.isPay" class="pay--text text--darken-1">
                    {{ $t('common.minus') }}{{ payment.amount }}
                  </p>
                  <p v-else class="income--text text--darken-1">
                    {{ $t('common.plus') }}{{ payment.amount }}
                  </p>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </template>
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import moment from 'moment'

@Component
export default class Calendar extends Vue {
  @Prop({ type: Array, required: true })
  payments!: { amount: number; isPay: boolean; date: string }[]

  /** 関数用 */
  $refs: any

  amountPay: number = 0

  weekend: number[] = [0, 6]

  value = moment().format('yyyy-MM-DD')

  get title() {
    return moment(this.value).format('yyyy / M')
  }

  show(date: string) {
    // paymentDetail?target=[yyyy-MM-dd] で遷移
    this.$router.push({ path: 'paymentDetail', query: { target: date } })
  }

  created() {
    // 月の合計支出額を計算
    let amountPay = 0
    this.payments.forEach((payment) => {
      payment.isPay
        ? (amountPay = amountPay + payment.amount)
        : (amountPay = amountPay + 0)
    })
    this.amountPay = amountPay
  }

  nextMonth() {
    // ここで親のカテゴリ合計取得メソッドとかを動かす
    this.$refs.calendar.next()
  }

  prevMonth() {
    // ここで親のカテゴリ合計取得メソッドとかを動かす
    this.$refs.calendar.prev()
  }
}
</script>
