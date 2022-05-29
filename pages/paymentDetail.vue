<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        bottom
        elevate-on-scroll
        color="white"
        height="35"
        tile
      >
        <v-col class="pa-0">
          <v-btn block height="40" to="/calendar">
            {{ $t('common.cancel') }}
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-btn color="green" block height="40">
            {{ $t('common.regist') }}
          </v-btn>
        </v-col>
      </v-app-bar>
      <v-sheet id="scrolling" class="overflow-y-auto" max-height="850">
        <v-container style="height: 1000px">
          <v-row align="center">
            <v-col cols="8" class="ml-3">
              <DatePicker :date="date" @changeDate="changeDate" />
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <Toggle
                :value="paymentFlag"
                :check="$t('common.income')"
                :uncheck="$t('common.spending')"
                @onChange="onChange"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" class="ml-3">
              <v-text-field v-model="amount"></v-text-field>
            </v-col>
            <v-col cols="1">{{ $t('common.yen') }}</v-col>
          </v-row>
          <v-row class="ml-3">
            <ButtonGroupMini
              :parent-id="parentId"
              :data="childData"
              :payment-flag="paymentFlag"
            />
          </v-row>
          <v-row class="ml-3">
            <ButtonGroup
              :data="parentData"
              :payment-flag="paymentFlag"
              @parentId="selectParentId"
            />
          </v-row>
          <v-row>
            <v-col cols="11" class="ml-3">
              <v-textarea :placeholder="$t('common.memo')"></v-textarea>
              <v-checkbox
                class="mt-0"
                :label="$t('discription.displayOnly', [$t('common.memo')])"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class paymentDetail extends Vue {
  date: string | (string | null)[] = this.$route.query.target
  menu: boolean = false
  paymentFlag: boolean = false
  amount: number = 0
  parentId: string = '0'
  parentData: { label: string; value: string }[] = [
    { label: '食費', value: '1' },
    { label: '趣味', value: '2' },
    { label: 'その他', value: '3' },
    { label: 'その他2', value: '4' },
    { label: 'その他3', value: '5' },
  ]

  childData!: { label: string; value: string; parentId: string }[]
  childBaseData: { label: string; value: string; parentId: string }[] = [
    { label: 'ランチ', value: '1', parentId: '1' },
    { label: 'ディナー', value: '2', parentId: '1' },
    { label: 'おやつ', value: '3', parentId: '1' },
    { label: 'ドリンク', value: '4', parentId: '1' },
    { label: 'その他', value: '5', parentId: '1' },
    { label: '書籍', value: '6', parentId: '2' },
  ]

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

  selectParentId(val: string) {
    this.parentId = val
    const datas = [{ label: '', value: '', parentId: '' }]
    this.childBaseData.forEach((data) => {
      if (this.parentId === data.parentId) {
        datas.push(data)
      }
    })
    this.childData = datas
  }

  created() {
    if (this.date === '') {
      // 日付が渡されなかったら今日の日付選択状態で新規登録画面に飛ばす
    } else {
      // 日付で検索を掛けて収支詳細を取得
    }
  }

  changeDate(date: string) {
    this.date = date
  }

  onChange(eventVal: boolean) {
    this.paymentFlag = eventVal
  }
}
</script>
