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
                :value="isPay"
                :uncheck="$t('common.pay')"
                :check="$t('common.income')"
                @onChange="onChange"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div v-for="(paymentData, i) in paymentDataList" :key="i">
                <PaymentList
                  :label="
                    getParentName(paymentData.parentId) +
                    '：' +
                    paymentData.childId
                  "
                  :amount="paymentData.amount"
                  :is-pay="paymentData.isPay"
                  :list-no="i"
                  @close="close"
                />
                <!-- <PaymentList
                  v-if="paymentData.isPay !== null"
                  :label="
                    getParentName(paymentData.parentId) +
                    getChildName(paymentData.childId)
                  "
                  :amount="paymentData.amount"
                  :payment-flag="paymentData.isPay"
                  :list-no="i"
                  @close="close"
                /> -->
              </div>
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
              v-if="parentId"
              :data="childData"
              :is-pay="isPay"
              @childId="selectChildId"
            />
          </v-row>
          <v-row class="mx-3">
            <ButtonGroup
              :data="parentData"
              :is-pay="isPay"
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
import { categoryStore } from '../store'

@Component
export default class paymentDetail extends Vue {
  /** カレンダーに表示する日付 */
  date: string = ''
  isPay: boolean = true
  amount: number = 0
  parentId: string = ''
  childId: string = ''

  /** 選択された日付のデータ */
  paymentDataList: {
    parentId: string
    childId: string
    amount: number
    isPay: boolean
  }[] = []

  /** 親カテゴリデータ */
  parentData: { id: string; name: string; isPay: boolean }[] = []

  /** 子カテゴリデータ */
  childData: any[] = []

  /** 親カテゴリIDから名前を取得 */
  getParentName(id: string): string {
    if (id === '') {
      return ''
    }
    let name: string = ''
    this.parentData.forEach((data) => {
      if (data.id === id) {
        name = data.name
      }
    })
    return name
  }

  /** 子カテゴリIDから名前を取得 */
  getChildName(id: string): string {
    console.log(id)
    // if (id === '') {
    //   return ''
    // }
    // return (
    //   this.$t('common.colon') +
    //   this.childBaseData.filter((data) => {
    //     return data.childId === id
    //   })[0].label
    // )
  }

  /** 親を選択された時、表示する子データを抽出 */
  selectParentId(val: string) {
    categoryStore.fetchChildCategoryList(val)
    this.childData = categoryStore.getChildCategoryList
    this.parentId = val
  }

  /** 子データを選択されたとき */
  selectChildId(val: string) {
    this.childId = val
  }

  /** 収支カードの×を押されたとき */
  close(listNo: number) {
    this.paymentDataList.splice(listNo, 1)
  }

  /** 画面表示時 */
  created() {
    this.childData = [{ label: '', childId: '', parentId: '' }]
    // カテゴリ情報を取得
    categoryStore.fetchCategoryList()
    this.parentData = categoryStore.getParentCategoryList
    if (this.$route.query.target === null) {
      this.isPay = true
      // 日付が渡されなかったら今日の日付を選択する
      this.date = moment().format('yyyy-MM-DD')
    } else {
      // パラメータの日付をセット
      this.date = this.$route.query.target.toString()
      // 日付で検索を掛けて収支詳細を取得
      this.paymentDataList = [
        { parentId: '2', childId: '6', amount: 2200, isPay: true },
        { parentId: '1', childId: '3', amount: 500, isPay: true },
        { parentId: '3', childId: '', amount: 800, isPay: true },
        { parentId: '', childId: '', amount: 100, isPay: true },
        { parentId: '5', childId: '', amount: 800, isPay: false },
      ]
    }
  }

  addPaymentList() {
    console.log('金額は' + this.amount)
    console.log('true=支出、false=収入→' + this.isPay)
    console.log('カテゴリ大は' + this.parentId)
    console.log('カテゴリ小は' + this.childId)
    const inputData = {
      parentId: this.parentId,
      childId: this.childId,
      amount: this.amount,
      isPay: this.isPay,
    }
    this.paymentDataList.push(inputData)
  }

  updateData(status: string) {
    console.log(status)
    this.$router.push('/calendar')
  }

  changeDate(date: string) {
    this.date = date
  }

  onChange(eventVal: boolean) {
    this.isPay = eventVal
    this.parentId = ''
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
