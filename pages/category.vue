<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
    </v-container>
    <v-tabs v-model="tab">
      <v-tab v-for="(category, i) in categories" :key="i">
        {{ category }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- 支出タブの中身 -->
      <v-tab-item>
        <div v-for="(data, i) in payDatas" :key="i">
          <CategoryTable
            :parent="data.parent"
            :childs="data.childs"
            :is-pay="true"
          />
        </div>
      </v-tab-item>
      <!-- 収入タブの中身 -->
      <v-tab-item>
        <div v-for="(data, i) in incomeDatas" :key="i">
          <CategoryTable
            :parent="data.parent"
            :childs="data.childs"
            :is-pay="false"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { categoryStore } from '../store'
export interface CategoryList {
  parentId: string
  parent: string
  childs: string[]
}
@Component
export default class Category extends Vue {
  tabPay = true
  tabIncome = false
  tab: any = this.tabPay
  categories = [this.$t('common.pay'), this.$t('common.income')]

  payDatas!: { parentId: string; parent: string; childs: string[] }[]
  incomeDatas!: { parentId: string; parent: string; childs: string[] }[]

  /**
   * 初期表示時、親カテゴリと子カテゴリの情報を取得
   */
  created() {
    categoryStore.fetchParentCategoryList()
    const payDatas: CategoryList[] = []
    const incomeDatas: CategoryList[] = []
    categoryStore.getParentCategoryList.forEach((parentCategory) => {
      const id = parentCategory.id
      const childList: string[] = []
      categoryStore.getChildCategoryList.forEach((childCategory) => {
        if (id === childCategory.parentId) {
          childList.push(childCategory.name)
        }
      })
      if (parentCategory.isPay) {
        payDatas.push({
          parentId: id,
          parent: parentCategory.name,
          childs: childList,
        })
      } else {
        incomeDatas.push({
          parentId: id,
          parent: parentCategory.name,
          childs: childList,
        })
      }
    })
    this.payDatas = payDatas
    this.incomeDatas = incomeDatas
  }
}
</script>
