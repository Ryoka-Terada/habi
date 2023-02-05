<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn color="primary" @click="monthTransition(0)"
          ><v-icon>mdi-arrow-left-bold-outline</v-icon></v-btn
        >
      </v-col>
      <v-col cols="auto">{{ title }}</v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="monthTransition(1)"
          ><v-icon>mdi-arrow-right-bold-outline</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-card-title class="red--text text--darken-1">
      {{ $t('common.minus') }}{{ amountPay }}{{ $t('common.yen') }}
    </v-card-title>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="today"
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
              <div v-for="(calendarItem, i) in calendarItemList" :key="i">
                <v-row v-if="calendarItem.date == date">
                  <p v-if="calendarItem.isPay" class="pay--text text--darken-1">
                    {{ $t('common.minus') }}{{ calendarItem.amount }}
                  </p>
                  <p v-else class="income--text text--darken-1">
                    {{ $t('common.plus') }}{{ calendarItem.amount }}
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
export interface CalendarItemList {
  date: string
  amount: number
  isPay: boolean
}

@Component
export default class CommonCalendar extends Vue {
  /** 月の収支一覧 */
  @Prop({ type: Array, required: true })
  payments!: Calendar[]

  /** 関数用 */
  $refs: any

  /** 土曜日曜算出用変数 */
  weekend: number[] = [0, 6]

  /** 今日の日付 */
  today = moment().format('yyyy-MM-DD')

  /** 表示中の年月 */
  get title() {
    return moment(this.today).format('yyyy / M')
  }

  /** 合計支出額 */
  get amountPay() {
    let amountPay = 0
    this.payments.forEach((payment) => {
      payment.isPay
        ? (amountPay = amountPay + payment.amount)
        : (amountPay = amountPay + 0)
    })
    return amountPay
  }

  /** 日付と収支フラグが重複していたらまとめる */
  get calendarItemList(): CalendarItemList[] {
    const calendarItemList: CalendarItemList[] = []
    for (let i = 0; i < this.payments.length; i++) {
      // 日付と収支フラグの組み合わせが既に算出済だったらスキップ
      const isAddedDate: boolean = calendarItemList.some(
        (el) =>
          el.date === this.payments[i].paymentDate &&
          el.isPay === this.payments[i].isPay
      )
      if (isAddedDate) {
        continue
      }
      // 日付と収支フラグが同じレコードが複数あれば加算する
      const payments = this.payments.filter((el) => {
        return (
          el.paymentDate === this.payments[i].paymentDate &&
          el.isPay === this.payments[i].isPay
        )
      })
      if (payments.length > 1) {
        let amountPay = 0
        payments.forEach((payment) => {
          amountPay += payment.amount
        })
        calendarItemList.push({
          amount: amountPay,
          date: payments[0].paymentDate,
          isPay: payments[0].isPay,
        })
      } else {
        calendarItemList.push({
          amount: payments[0].amount,
          date: payments[0].paymentDate,
          isPay: payments[0].isPay,
        })
      }
    }
    return calendarItemList
  }

  created() {
    this.$emit('setCalendarMonth', this.today)
  }

  /** カレンダー月変更時 */
  monthTransition(isNext: boolean) {
    // ここで親のカテゴリ合計取得メソッドとかを動かす
    isNext ? this.$refs.calendar.next() : this.$refs.calendar.prev()
    this.$emit('setCalendarMonth', this.today)
  }

  /** 日付を押下時 */
  clickDay(date: string) {
    this.$emit('showDateDetail', date)
  }
}
</script>
