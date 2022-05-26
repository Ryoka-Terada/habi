<template>
  <div>
    <v-col cols="12" sm="6" md="4">
      <DatePicker :date="date" />
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class paymentDetail extends Vue {
  date: string | (string | null)[] = this.$route.query.target
  menu: boolean = false

  get formatDate(): string {
    const date = this.date.toString()
    const [year, month, day] = date.split('-')
    return (
      year +
      this.$t('common.year') +
      month +
      this.$t('common.month') +
      day +
      this.$t('common.day')
    )
  }

  created() {
    if (this.date === '') {
      // 日付が渡されなかったら今日の日付選択状態で新規登録画面に飛ばす
    } else {
      // 日付で検索を掛けて収支詳細を取得
    }
  }
}
</script>
