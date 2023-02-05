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
            <v-row align="center" class="pb-0">
              <v-col cols="9" class="mx-3 pb-0">
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
            <v-row class="mx-3 mt-0">
              <ButtonGroup
                :option="parentData"
                :is-pay="listItem.isPay"
                @select="selectParentId"
              />
            </v-row>
            <v-row class="mx-3">
              <v-sheet height="53">
                <ButtonGroup
                  v-if="listItem.parentId"
                  :option="selectChildData"
                  :is-pay="listItem.isPay"
                  :mini="true"
                  @select="selectChildId"
                />
              </v-sheet>
            </v-row>
            <v-row justify="center" class="py-3">
              <v-btn
                fab
                elevation="5"
                :disabled="ObserverProps.invalid"
                @click="addPaymentList"
              >
                <v-icon
                  :color="listItem.isPay ? 'pay lighten-1' : 'income lighten-1'"
                >
                  mdi-arrow-expand-down
                </v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-col>
                <div v-for="(paymentData, i) in paymentDataList" :key="i">
                  <PaymentList
                    :label="
                      getParentName(paymentData) + getChildName(paymentData)
                    "
                    :amount="paymentData.amount"
                    :is-pay="paymentData.isPay"
                    :list-no="i"
                    @close="close"
                  />
                </div>
              </v-col>
            </v-row>
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
import { ButtonGroupOption } from '../components/molecules/ButtonGroup.vue'

@Component
export default class paymentDetail extends Vue {
  /** 入力フォーム(収支カード) */
  listItem: PaymentDetail = {
    paymentId: '',
    parentId: '',
    childId: '',
    paymentDate: '',
    amount: 0,
    isPay: true,
  }

  /** 入力フォーム初期化 */
  initializeListItem(ispay: boolean) {
    this.listItem = {
      paymentId: '',
      parentId: '',
      childId: '',
      paymentDate: '',
      amount: 0,
      isPay: ispay,
    }
  }

  /** 登録更新ステータス */
  isRegist: boolean = true

  /** 選択された日付のデータ */
  paymentDataList: PaymentDetail[] = []

  /** 詳細情報を出す日付 */
  date: string = moment().format('yyyy-MM-DD')

  /** 親カテゴリデータ */
  get parentData(): ButtonGroupOption[] {
    return this.listItem.isPay
      ? categoryStore.getParentCategoryPayList.map(
          (parentCategoryPay: ParentCategory) => {
            return {
              id: parentCategoryPay.parentId,
              name: parentCategoryPay.categoryName,
              isPay: parentCategoryPay.isPay,
            }
          }
        )
      : categoryStore.getParentCategoryIncomeList.map(
          (parentCategoryIncome: ParentCategory) => {
            return {
              id: parentCategoryIncome.parentId,
              name: parentCategoryIncome.categoryName,
              isPay: parentCategoryIncome.isPay,
            }
          }
        )
  }

  /** 子カテゴリデータ */
  get selectChildData(): ButtonGroupOption[] {
    const childCategoryList = this.listItem.isPay
      ? categoryStore.getChildCategoryPayList
      : categoryStore.getChildCategoryIncomeList
    return childCategoryList
      .filter((childCategory: ChildCategory) => {
        return childCategory.parentId === this.listItem.parentId
      })
      .map((filteredChildCategory) => {
        return {
          id: filteredChildCategory.childId,
          name: filteredChildCategory.categoryName,
          isPay: filteredChildCategory.isPay,
        }
      })
  }

  /** イベント取得用 */
  $refs!: any

  /** 画面表示時 */
  created() {
    // カテゴリ情報(マスタ)を取得
    categoryStore.fetchParentCategoryList()
    this.initializeListItem(true)
    if (this.$route.query.target !== null) {
      const date = this.$route.query.target.toString()
      this.selectDatePaymentDetail(date)
      // パラメータの日付をセット
      this.date = date
    }
  }

  /** 選択された日付の収支カードを取得 */
  async selectDatePaymentDetail(date: string) {
    // 日付で検索を掛けて収支詳細を取得
    await paymentDetailStore.fetchPaymentDetailList(date).then(() => {
      const paymentDataList = paymentDetailStore.getPaymentDetailList
      if (paymentDataList == null) {
        // 値が取れなかった場合
        this.isRegist = true
      } else {
        // フロントで編集するためディープコピーで値を保持
        this.paymentDataList = JSON.parse(JSON.stringify(paymentDataList))
        this.isRegist = false
      }
    })
  }

  /** 親カテゴリIDから名前を取得 */
  getParentName(paymentData: PaymentDetail): string {
    if (paymentData.parentId === '') {
      return ''
    }
    let name: string = ''
    this.parentData.forEach((parent: ButtonGroupOption) => {
      if (parent.id === paymentData.parentId) {
        name = parent.name
      }
    })
    return name
  }

  /** 子カテゴリIDから名前を取得 */
  getChildName(paymentData: PaymentDetail): string {
    if (paymentData.childId === '') {
      return ''
    }
    let name: string = ''
    const chiltCategoryList = paymentData.isPay
      ? categoryStore.getChildCategoryPayList
      : categoryStore.getChildCategoryIncomeList
    chiltCategoryList.forEach((child: ChildCategory) => {
      if (child.childId === paymentData.childId) {
        name = child.categoryName
      }
    })
    return this.$t('common.colon') + name
  }

  /** 親カテゴリを選択されたとき */
  selectParentId(val: string) {
    this.listItem.parentId = val
  }

  /** 子カテゴリを選択されたとき */
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
      paymentId: '',
      parentId: this.listItem.parentId,
      childId: this.listItem.childId,
      paymentDate: this.date,
      amount: parseInt(this.listItem.amount.toString(), 10),
      isPay: this.listItem.isPay,
    }
    this.paymentDataList.unshift(inputData)
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
