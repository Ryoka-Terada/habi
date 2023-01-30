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
            @click="clickDay(date)"
          >
            {{ day }}
          </p>
          <p v-else @click="clickDay(date)">{{ day }}</p>
        </template>
        <template #day="{ date }">
          <v-card height="70" flat tile @click="clickDay(date)">
            <v-container>
              <div v-for="(payment, i) in payments" :key="i">
                <v-row v-if="payment.paymentDate == date">
                  <p v-if="payment.isPay" class="pay--text text--darken-1">
                    {{ $t('common.minus') }}{{ Number(payment.amount) }}
                  </p>
                  <p v-else class="income--text text--darken-1">
                    {{ $t('common.plus') }}{{ Number(payment.amount) }}
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
import { Calendar } from '~/types/calendar'

@Component
export default class CommonCalendar extends Vue {
  /** 月の収支一覧 */
  @Prop({ type: Array, required: true })
  payments!: Calendar[]

  /** 関数用 */
  $refs: any

  weekend: number[] = [0, 6]

  value = moment().format('yyyy-MM-DD')

  get title() {
    return moment(this.value).format('yyyy / M')
  }

  /** 合計支出額 */
  get amountPay() {
    let amountPay = 0
    this.payments.forEach((payment) => {
      payment.isPay
        ? (amountPay = amountPay + Number(payment.amount))
        : (amountPay = amountPay + 0)
    })
    return amountPay
  }

  /** 日付を押下時 */
  clickDay(date: string) {
    this.$emit('showDateDetail', date)
  }

  created() {
    this.$emit('setCalendarMonth', this.value)
  }

  nextMonth() {
    // ここで親のカテゴリ合計取得メソッドとかを動かす
    this.$refs.calendar.next()
    this.$emit('setCalendarMonth', this.value)
  }

  prevMonth() {
    // ここで親のカテゴリ合計取得メソッドとかを動かす
    this.$refs.calendar.prev()
    this.$emit('setCalendarMonth', this.value)
  }
}
</script>
