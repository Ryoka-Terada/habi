<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar absolute bottom elevate-on-scroll color="white" tile>
        <v-tabs fixed-tabs>
          <v-col
            class="cancel d-flex justify-center align-center"
            @click="updateData"
          >
            {{ $t('common.cancel') }}
          </v-col>
          <v-col
            class="regist d-flex justify-center align-center"
            @click="updateData('色々データを渡す予定')"
          >
            {{ $t('common.regist') }}
          </v-col>
        </v-tabs>
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
            <v-col>
              <PaymentList />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="9" class="mx-3">
              <v-text-field v-model="amount"></v-text-field>
            </v-col>
            <v-col cols="1">{{ $t('common.yen') }}</v-col>
          </v-row>
          <v-row class="mx-3">
            <ButtonGroupMini
              :parent-id="parentId"
              :data="childData"
              :payment-flag="paymentFlag"
              @childId="selectChildId"
            />
          </v-row>
          <v-row class="mx-3">
            <ButtonGroup
              :data="parentData"
              :payment-flag="paymentFlag"
              @parentId="selectParentId"
            />
          </v-row>
          <v-row class="mr-3">
            <v-spacer />
            <v-btn
              x-small
              fab
              color="green"
              elevation="1"
              @click="addPaymentList"
            >
              <v-icon color="white"> mdi-plus </v-icon>
            </v-btn></v-row
          >
          <v-row>
            <v-col cols="11" class="mx-3">
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
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class paymentDetail extends Vue {
  date: string | (string | null)[] = this.$route.query.target
  paymentFlag: boolean = false
  amount: number = 0
  parentId: string = '0'
  childId: string = '0'

  /** 親データ */
  parentData: { label: string; value: string }[] = [
    { label: '食費', value: '1' },
    { label: '趣味', value: '2' },
    { label: 'その他', value: '3' },
    { label: 'その他2', value: '4' },
    { label: 'その他3', value: '5' },
  ]

  /** 表示する子データ */
  childData: { label: string; value: string; parentId: string }[] = [
    { label: '', value: '', parentId: '' },
  ]

  /** 子の元データ */
  childBaseData: { label: string; value: string; parentId: string }[] = [
    { label: 'ランチ', value: '1', parentId: '1' },
    { label: 'ディナー', value: '2', parentId: '1' },
    { label: 'おやつ', value: '3', parentId: '1' },
    { label: 'ドリンク', value: '4', parentId: '1' },
    { label: 'その他', value: '5', parentId: '1' },
    { label: '書籍', value: '6', parentId: '2' },
  ]

  /** 親を選択された時、表示する子データを抽出 */
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

  /** 子データを選択されたとき */
  selectChildId(val: string) {
    this.childId = val
  }

  created() {
    if (this.date === '') {
      // 日付が渡されなかったら今日の日付選択状態で新規登録画面に飛ばす
    } else {
      // 日付で検索を掛けて収支詳細を取得
    }
  }

  addPaymentList() {
    console.log('金額は' + this.amount)
    console.log('false=支出、true=収入→' + this.paymentFlag)
    console.log('カテゴリ大は' + this.parentId)
    console.log('カテゴリ小は' + this.childId)
  }

  updateData(status: string) {
    console.log(status)
  }

  changeDate(date: string) {
    this.date = date
  }

  onChange(eventVal: boolean) {
    this.paymentFlag = eventVal
  }
}
</script>

<style scoped>
.regist {
  background-color: green;
  color: white;
}
.cancel {
  background-color: whitesmoke;
  color: grey;
}
</style>
