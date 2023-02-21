import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'
import axios from 'axios'
import { ParentCategory } from '../types/parentCategory'
import { ChildCategory } from '../types/childCategory'

config.rawError = true

@Module({ stateFactory: true, namespaced: true, name: 'category' })
export default class CategoryModule extends VuexModule {
  /**
   * 親カテゴリ一覧(支出)
   * @type {ParentCategory[]}
   */
  private parentCategoryPayList: ParentCategory[] = []

  /**
   * 親カテゴリ一覧(収入)
   * @type {ParentCategory[]}
   */
  private parentCategoryIncomeList: ParentCategory[] = []

  /**
   * 子カテゴリ一覧(支出)
   * @type {ChildCategory[]}
   */
  private childCategoryPayList: ChildCategory[] = []

  /**
   * 子カテゴリ一覧(収入)
   * @type {ChildCategory[]}
   */
  private childCategoryIncomeList: ChildCategory[] = []

  /**
   * 親カテゴリ一覧(支出)を返す
   * @return {ParentCategory[]}
   */
  get getParentCategoryPayList(): ParentCategory[] {
    return this.parentCategoryPayList
  }

  /**
   * 親カテゴリ一覧(収入)を返す
   * @return {ParentCategory[]}
   */
  get getParentCategoryIncomeList(): ParentCategory[] {
    return this.parentCategoryIncomeList
  }

  /**
   * 子カテゴリ一覧(支出)を返す
   * @return {ChildCategory[]}
   */
  get getChildCategoryPayList(): ChildCategory[] {
    return this.childCategoryPayList
  }

  /**
   * 子カテゴリ一覧(収入)を返す
   * @return {ChildCategory[]}
   */
  get getChildCategoryIncomeList(): ChildCategory[] {
    return this.childCategoryIncomeList
  }

  /**
   * 親カテゴリ一覧を取得
   */
  @Action
  async fetchParentCategoryList(_payload?: any): Promise<void> {
    await axios
      .get('api/paymentCategoryParents', _payload)
      .then((value: any) => {
        const payList: ParentCategory[] = value.data
          .filter((parentCategory: ParentCategory) => {
            return !!parentCategory.isPay
          })
          .map((parentCategory: ParentCategory) => {
            return {
              parentId: parentCategory.parentId,
              categoryName: parentCategory.categoryName,
              isPay: !!parentCategory.isPay,
              isDelete: parentCategory.isDelete,
              userId: parentCategory.userId,
              updatedAt: parentCategory.updatedAt,
              createdAt: parentCategory.createdAt,
            }
          })
        const incomeList: ParentCategory[] = value.data
          .filter((parentCategory: ParentCategory) => {
            return !parentCategory.isPay
          })
          .map((parentCategory: ParentCategory) => {
            return {
              parentId: parentCategory.parentId,
              categoryName: parentCategory.categoryName,
              isPay: !!parentCategory.isPay,
              isDelete: parentCategory.isDelete,
              userId: parentCategory.userId,
              updatedAt: parentCategory.updatedAt,
              createdAt: parentCategory.createdAt,
            }
          })
        this.setParentCategoryPayList(payList)
        this.setParentCategoryIncomeList(incomeList)
      })
  }

  /**
   * 子カテゴリ一覧を取得
   */
  @Action
  async fetchChildCategoryList(_payload?: any): Promise<void> {
    await axios
      .get('api/paymentCategoryChildren', _payload)
      .then((value: any) => {
        const payList: ChildCategory[] = value.data
          .filter((childCategory: ChildCategory) => {
            return !!childCategory.isPay
          })
          .map((childCategory: ChildCategory) => {
            return {
              childId: childCategory.childId,
              categoryName: childCategory.categoryName,
              parentId: childCategory.parentId,
              isDelete: childCategory.isDelete,
              createdAt: childCategory.createdAt,
              updatedAt: childCategory.updatedAt,
              isPay: !!childCategory.isPay,
            }
          })
        const incomeList: ChildCategory[] = value.data
          .filter((childCategory: ChildCategory) => {
            return !childCategory.isPay
          })
          .map((childCategory: ChildCategory) => {
            return {
              childId: childCategory.childId,
              categoryName: childCategory.categoryName,
              parentId: childCategory.parentId,
              isDelete: childCategory.isDelete,
              createdAt: childCategory.createdAt,
              updatedAt: childCategory.updatedAt,
              isPay: !!childCategory.isPay,
            }
          })
        this.setChildCategoryPayList(payList)
        this.setChildCategoryIncomeList(incomeList)
      })
  }

  /**
   * 親カテゴリ一覧(支出)をセット
   */
  @Mutation
  setParentCategoryPayList(list: ParentCategory[]) {
    this.parentCategoryPayList = list
  }

  /**
   * 親カテゴリ一覧(収入)をセット
   */
  @Mutation
  setParentCategoryIncomeList(list: ParentCategory[]) {
    this.parentCategoryIncomeList = list
  }

  /**
   * 子カテゴリ一覧(支出)をセット
   */
  @Mutation
  setChildCategoryPayList(list: ChildCategory[]) {
    this.childCategoryPayList = list
  }

  /**
   * 子カテゴリ一覧(収入)をセット
   */
  @Mutation
  setChildCategoryIncomeList(list: ChildCategory[]) {
    this.childCategoryIncomeList = list
  }
}
