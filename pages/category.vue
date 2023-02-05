<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
    </v-container>
    <v-tabs v-model="tab">
      <v-tab v-for="(menu, i) in tabMenu" :key="i">
        {{ menu }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- 支出タブの中身 -->
      <v-tab-item>
        <div v-for="(categoryPay, i) in parentCategoryPayList" :key="i">
          <CategoryTable
            :parent="categoryPay"
            :childs="childCategoryInParent(categoryPay.parentId, 1)"
            :is-pay="true"
          />
        </div>
      </v-tab-item>
      <!-- 収入タブの中身 -->
      <v-tab-item>
        <div v-for="(categoryIncome, i) in parentCategoryIncomeList" :key="i">
          <CategoryTable
            :parent="categoryIncome"
            :childs="childCategoryInParent(categoryIncome.parentId, 0)"
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
  /** タブの選択状態 */
  tab: any = true
  /** タブメニューリスト */
  tabMenu = [this.$t('common.pay'), this.$t('common.income')]

  /** 親カテゴリ一覧(支出) */
  get parentCategoryPayList(): ParentCategory[] {
    return categoryStore.getParentCategoryPayList
  }

  /** 親カテゴリ一覧(収入) */
  get parentCategoryIncomeList(): ParentCategory[] {
    return categoryStore.getParentCategoryIncomeList
  }

  /** 親カテゴリの中の子カテゴリを取得 */
  childCategoryInParent(
    parentCategoryId: string,
    isPay: boolean
  ): ChildCategory[] {
    const childCategoryList = isPay
      ? categoryStore.getChildCategoryPayList
      : categoryStore.getChildCategoryIncomeList
    return childCategoryList.filter((childCategory: ChildCategory) => {
      return childCategory.parentId === parentCategoryId
    })
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
