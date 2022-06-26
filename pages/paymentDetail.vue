<template>
  <div>
    <v-card class="overflow-hidden">
      <validation-observer ref="obs" v-slot="ObserverProps">
        <v-app-bar absolute bottom elevate-on-scroll color="white" tile>
          <v-tabs fixed-tabs>
            <v-col
              class="secondary lighten-2 d-flex justify-center align-center"
              @click="updateData"
            >
              {{ $t('common.cancel') }}
            </v-col>
            <v-col
              v-if="isRegist"
              class="primary white--text d-flex justify-center align-center"
              @click="registData"
            >
              {{ $t('common.regist') }}
            </v-col>
            <v-col
              v-else
              class="primary white--text d-flex justify-center align-center"
              @click="updateData"
            >
              <div>
                {{ $t('common.update') }}
              </div>
            </v-col>
          </v-tabs>
        </v-app-bar>
        <v-sheet class="overflow-y-auto" max-height="850">
          <v-container style="height: 930px">
            <v-row align="center">
              <v-col cols="8" class="ml-3">
                <DatePicker :date="date" @changeDate="changeDate" />
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <Toggle
                  ref="toggle"
                  :value="listItem.isPay"
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
                      getChildName(paymentData.childId)
                    "
                    :amount="paymentData.amount"
                    :is-pay="paymentData.isPay"
                    :list-no="i"
                    @close="close"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="9" class="mx-3">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|numeric"
                  :name="$t('common.amount')"
                >
                  <v-text-field
                    v-model="listItem.amount"
                    type="Number"
                    clearable
                  />
                  <p>{{ errors[0] }}</p>
                </validation-provider>
              </v-col>
              <v-col cols="1">{{ $t('common.yen') }}</v-col>
            </v-row>
            <v-row class="mx-3">
              <v-sheet height="53">
                <ButtonGroupMini
                  v-if="listItem.parentId"
                  :data="selectChildData"
                  :is-pay="listItem.isPay"
                  @childId="selectChildId"
                />
              </v-sheet>
            </v-row>
            <v-row class="mx-3">
              <ButtonGroup
                :data="parentData"
                :is-pay="listItem.isPay"
                @parentId="selectParentId"
              />
            </v-row>
            <v-row class="mr-3">
              <v-spacer />
              <v-btn
                x-small
                fab
                elevation="3"
                :disabled="ObserverProps.invalid"
                @click="addPaymentList"
              >
                <v-icon color="primary"> mdi-plus </v-icon>
              </v-btn></v-row
            >
            <v-row>
              <v-col cols="11" class="mx-3">
                <v-textarea
                  :placeholder="$t('common.memo') + '※まだ機能作ってない'"
                ></v-textarea>
                <v-checkbox
                  class="mt-0"
                  :label="$t('discription.displayOnly', [$t('common.memo')])"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </validation-observer>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import moment from 'moment'
import { categoryStore, paymentDetailStore } from '../store'
import { PaymentDetail } from '../types/paymentDetail'
import { ParentCategory } from '../types/parentCategory'
import { ChildCategory } from '../types/childCategory'

@Component
export default class paymentDetail extends Vue {
  /** 詳細情報を出す日付 */
  date: string = ''

  /** 入力フォーム(収支カード) */
  listItem: PaymentDetail = {
    parentId: '',
    childId: '',
    amount: 0,
    isPay: true,
  }

  /** 入力フォーム初期化 */
  initializeListItem(ispay: boolean) {
    this.listItem = {
      parentId: '',
      childId: '',
      amount: 0,
      isPay: ispay,
    }
  }

  /** 登録更新ステータス */
  isRegist: boolean = true

  /** 選択された日付のデータ */
  paymentDataList: PaymentDetail[] = []

  /** 親カテゴリデータ */
  parentData: ParentCategory[] = []

  /** 子カテゴリデータ */
  selectChildData: ChildCategory[] = []

  /** イベント取得用 */
  $refs!: any

  /** 画面表示時 */
  created() {
    // カテゴリ情報(マスタ)を取得
    categoryStore.fetchParentCategoryList()
    this.parentData = categoryStore.getParentCategoryList
    this.listItem.isPay = true
    if (this.$route.query.target === null) {
      // 日付が渡されなかったら今日の日付を選択する
      this.date = moment().format('yyyy-MM-DD')
      this.isRegist = true
    } else {
      const date = this.$route.query.target.toString()
      // パラメータの日付をセット
      this.date = date
      this.selectDatePaymentDetail(date)
    }
  }

  /** 選択された日付の収支カードを取得 */
  selectDatePaymentDetail(date: string) {
    // 日付で検索を掛けて収支詳細を取得
    paymentDetailStore.fetchPaymentDetailList(date)
    const paymentDataList = paymentDetailStore.getPaymentDetailList
    if (paymentDataList == null) {
      // 値が取れなかった場合
      this.isRegist = true
    } else {
      // フロントで編集するためディープコピーで値を保持
      this.paymentDataList = JSON.parse(JSON.stringify(paymentDataList))
      this.isRegist = false
    }
  }

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
    if (id === '') {
      return ''
    }
    let name: string = ''
    categoryStore.getChildCategoryList.forEach((data) => {
      if (data.id === id) {
        name = data.name
      }
    })
    return this.$t('common.colon') + name
  }

  /** 親を選択された時、表示する子データを抽出 */
  selectParentId(val: string) {
    categoryStore.fetchSelectChildCategoryList(val)
    this.selectChildData = categoryStore.getSelectChildCategoryList
    this.listItem.parentId = val
  }

  /** 子データを選択されたとき */
  selectChildId(val: string) {
    this.listItem.childId = val
  }

  /** 収支カードの×を押されたとき */
  close(listNo: number) {
    this.paymentDataList.splice(listNo, 1)
  }

  /** 収支カードを追加されたとき */
  addPaymentList() {
    const inputData: PaymentDetail = {
      parentId: this.listItem.parentId,
      childId: this.listItem.childId,
      amount: parseInt(this.listItem.amount.toString(), 10),
      isPay: this.listItem.isPay,
    }
    this.paymentDataList.push(inputData)
    this.initializeListItem(this.listItem.isPay)
  }

  /** 登録ボタンを押されたとき */
  registData() {
    paymentDetailStore.registPaymentDetailList(this.paymentDataList)
    this.$router.push('/calendar')
  }

  /** 更新ボタンを押されたとき */
  updateData() {
    paymentDetailStore.updatePaymentDetailList(this.paymentDataList)
    this.$router.push('/calendar')
  }

  /** 日付を変更されたとき */
  changeDate(date: string) {
    this.date = date
    this.selectDatePaymentDetail(date)
  }

  /** 収支トグルを押されたとき */
  onChange(eventVal: boolean) {
    this.initializeListItem(eventVal)
  }
}
</script>
