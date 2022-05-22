<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn color="primary" @click="$refs.calendar.prev()"
          ><v-icon>mdi-arrow-left-bold-outline</v-icon></v-btn
        >
      </v-col>
      <v-col cols="auto">{{ title }}</v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="$refs.calendar.next()"
          ><v-icon>mdi-arrow-right-bold-outline</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-card-title>{{ amountPay }}{{ $t('common.yen') }}</v-card-title>
    <v-sheet height="600">
      <v-calendar ref="calendar" v-model="value" locale="ja" event-height="80">
        <template #day-label="{ day, weekday }">
          <p v-if="weekend.includes(weekday)" class="text-pay">
            {{ day }}
          </p>
          <p v-else>{{ day }}</p>
        </template>
        <template #day="{ date }">
          <v-container>
            <div v-for="(payment, i) in payments" :key="i">
              <v-row v-if="payment.date == date">
                <p v-if="payment.paymentFrag" class="text-income pl-2">
                  {{ $t('common.plus') }}{{ payment.amount }}
                </p>
                <p v-else class="text-pay pl-2">
                  {{ $t('common.minus') }}{{ payment.amount }}
                </p>
              </v-row>
            </div>
          </v-container>
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
  payments!: { amount: number; paymentFrag: number; date: string }[]

  @Prop({ type: Number, required: true })
  amountPay!: number

  weekend: number[] = [0, 6]

  value = moment().format('yyyy-MM-DD')

  get title() {
    return moment(this.value).format('yyyy / M')
  }
}
</script>

<style scoped>
.text-pay {
  color: red;
}
.text-income {
  color: green;
}
</style>
