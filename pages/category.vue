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
        <div v-for="(categoryPay, i) in categoryPayList" :key="i">
          <CategoryTable
            :parent="categoryPay.parent"
            :children="categoryPay.children"
            :is-pay="true"
            @updateChildCategory="updateChildCategory"
          />
        </div>
      </v-tab-item>
      <!-- 収入タブの中身 -->
      <v-tab-item>
        <div v-for="(categoryIncome, i) in categoryIncomeList" :key="i">
          <CategoryTable
            :parent="categoryIncome.parent"
            :children="categoryIncome.children"
            :is-pay="false"
            @updateChildCategory="updateChildCategory"
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
export interface CategoryList {
  parent: ParentCategory
  children: ChildCategory[]
}

@Component
export default class Category extends Vue {
  /** タブの選択状態 */
  tab: any = true
  /** タブメニューリスト */
  tabMenu = [this.$t('common.pay'), this.$t('common.income')]

  /** カテゴリ一覧(支出) */
  get categoryPayList(): CategoryList[] {
    return categoryStore.getParentCategoryPayList.map((parentCategory) => {
      const childrenInParent = categoryStore.getChildCategoryPayList.filter(
        (childCategory) => {
          return childCategory.parentId === parentCategory.parentId
        }
      )
      return {
        parent: parentCategory,
        children: childrenInParent,
      }
    })
  }

  /** カテゴリ一覧(収入) */
  get categoryIncomeList(): CategoryList[] {
    return categoryStore.getParentCategoryIncomeList.map((parentCategory) => {
      const childrenInParent = categoryStore.getChildCategoryIncomeList.filter(
        (childCategory) => {
          return childCategory.parentId === parentCategory.parentId
        }
      )
      return {
        parent: parentCategory,
        children: childrenInParent,
      }
    })
  }

  /**
   * 編集完了した子カテゴリを更新
   */
  updateChildCategory(formChildren: ChildCategory[]) {
    const insertTargets: ChildCategory[] = []
    const updateTargets: ChildCategory[] = []
    const deleteTargets: ChildCategory[] = []
    formChildren.forEach((child) => {
      if (!child.childId) {
        insertTargets.push(child)
      } else if (child.isDelete) {
        deleteTargets.push(child)
      } else {
        updateTargets.push(child)
      }
    })
    // TODO：それぞれにAPIを呼ぶ
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
