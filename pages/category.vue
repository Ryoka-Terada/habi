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
        <div v-for="(categoryPay, i) in parentCategoryPayList" :key="i">
          <CategoryTable
            :parent="categoryPay"
            :childs="childCategoryInParent(categoryPay.paymentCategoryParentId)"
            :is-pay="true"
          />
        </div>
      </v-tab-item>
      <!-- 収入タブの中身 -->
      <v-tab-item>
        <div v-for="(categoryIncome, i) in parentCategoryIncomeList" :key="i">
          <CategoryTable
            :parent="categoryIncome"
            :childs="
              childCategoryInParent(categoryIncome.paymentCategoryParentId)
            "
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
import { ParentCategory } from '../types/parentCategory'
import { ChildCategory } from '../types/childCategory'

@Component
export default class Category extends Vue {
  tabPay = true
  tabIncome = false
  tab: any = this.tabPay
  categories = [this.$t('common.pay'), this.$t('common.income')]

  get parentCategoryPayList(): ParentCategory[] {
    return categoryStore.getParentCategoryPayList
  }

  get parentCategoryIncomeList(): ParentCategory[] {
    return categoryStore.getParentCategoryIncomeList
  }

  childCategoryInParent(parentCategoryId: string): ChildCategory[] {
    return categoryStore.getChildCategoryList.filter(
      (childCategory: ChildCategory) => {
        return childCategory.paymentCategoryParentId === parentCategoryId
      }
    )
  }

  /**
   * 初期表示時、親カテゴリと子カテゴリの情報を取得
   */
  async created() {
    await categoryStore.fetchParentCategoryList()
    await categoryStore.fetchChildCategoryList()
  }
}
</script>
