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
                :uncheck="$t('common.spending')"
                :check="$t('common.income')"
                @onChange="onChange"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div v-for="(paymentData, i) in paymentDataList" :key="i">
                <PaymentList
                  v-if="paymentData.paymentFlag !== null"
                  :label="
                    getParentName(paymentData.parentId) +
                    getChildName(paymentData.childId)
                  "
                  :amount="paymentData.amount"
                  :payment-flag="paymentData.paymentFlag"
                  :list-no="i"
                  @close="close"
                />
              </div>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col>
              <PaymentList
                label="趣味：書籍old"
                amount="2000"
                :payment-flag="true"
              />
            </v-col>
          </v-row> -->
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
import moment from 'moment'

@Component
export default class paymentDetail extends Vue {
  /** カレンダーに表示する日付 */
  date: string = ''
  paymentFlag: boolean = true
  amount: number = 0
  parentId: string = '0'
  childId: string = '0'

  /** 選択された日付のデータ */
  paymentDataList: {
    parentId: string
    childId: string
    amount: number
    paymentFlag: boolean
  }[] = [{ parentId: '', childId: '', amount: 0, paymentFlag: true }]

  /** 親データ */
  parentData: { label: string; parentId: string; paymentFlag: boolean }[] = [
    { label: '食費', parentId: '1', paymentFlag: true },
    { label: '趣味', parentId: '2', paymentFlag: true },
    { label: 'その他', parentId: '3', paymentFlag: true },
    { label: 'その他2', parentId: '4', paymentFlag: true },
    { label: 'その他3', parentId: '5', paymentFlag: false }, // 収入
  ]

  /** 画面に表示する子データ */
  childData: { label: string; childId: string; parentId: string }[] = [
    { label: '', childId: '', parentId: '' },
  ]

  /** 子の元データ */
  childBaseData: { label: string; childId: string; parentId: string }[] = [
    { label: 'ランチ', childId: '1', parentId: '1' },
    { label: 'ディナー', childId: '2', parentId: '1' },
    { label: 'おやつ', childId: '3', parentId: '1' },
    { label: 'ドリンク', childId: '4', parentId: '1' },
    { label: 'その他', childId: '5', parentId: '1' },
    { label: '書籍', childId: '6', parentId: '2' },
  ]

  /** 親を選択された時、表示する子データを抽出 */
  selectParentId(val: string) {
    this.parentId = val
    // childBaseDataのparentIdがthis.parentIdと一致する配列のみchildDataに入れる
    this.childData = this.childBaseData.filter((data) => {
      return data.parentId === this.parentId
    })
  }

  /** 親カテゴリIDから名前を取得 */
  getParentName(id: string): string {
    if (id === '') {
      return ''
    }
    return this.parentData.filter((data) => {
      return data.parentId === id
    })[0].label
  }

  /** 子カテゴリIDから名前を取得 */
  getChildName(id: string): string {
    if (id === '') {
      return ''
    }
    return (
      this.$t('common.colon') +
      this.childBaseData.filter((data) => {
        return data.childId === id
      })[0].label
    )
  }

  /** 子データを選択されたとき */
  selectChildId(val: string) {
    this.childId = val
  }

  /** 収支カードの×を押されたとき */
  close(listNo: number) {
    this.paymentDataList.splice(listNo, 1, {
      parentId: '',
      childId: '',
      amount: 0,
      paymentFlag: null,
    })
  }

  created() {
    if (this.$route.query.target === null) {
      // 日付が渡されなかったら今日の日付を選択する
      this.date = moment().format('yyyy-MM-DD')
    } else {
      // パラメータの日付をセット
      this.date = this.$route.query.target.toString()
      // 日付で検索を掛けて収支詳細を取得
      this.paymentDataList = [
        { parentId: '2', childId: '6', amount: 2200, paymentFlag: true },
        { parentId: '1', childId: '3', amount: 500, paymentFlag: true },
        { parentId: '3', childId: '', amount: 800, paymentFlag: true },
        { parentId: '', childId: '', amount: 100, paymentFlag: true },
        { parentId: '5', childId: '', amount: 800, paymentFlag: false },
      ]
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
    this.$router.push('/calendar')
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
