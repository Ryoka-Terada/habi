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
   * 子カテゴリ一覧
   * @type {ChildCategory[]}
   */
  private childCategoryList: ChildCategory[] = []

  /**
   * 子カテゴリ一覧(親カテゴリ指定)
   * @type {ChildCategory[]}
   */
  // private selectChildCategoryList: ChildCategory[] = []

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
   * 子カテゴリ一覧を返す
   * @return {ChildCategory[]}
   */
  get getChildCategoryList(): ChildCategory[] {
    return this.childCategoryList
  }

  // /**
  //  * 子カテゴリ一覧を返す
  //  * @return {ChildCategory[]}
  //  */
  // get getSelectChildCategoryList(): ChildCategory[] {
  //   return this.selectChildCategoryList
  // }

  /**
   * 親カテゴリ一覧を取得
   */
  @Action
  fetchParentCategoryList(_payload?: any) {
    axios.get('api/paymentCategoryParent', _payload).then((value: any) => {
      const payList: ParentCategory[] = value.data.filter(
        (parentCategory: ParentCategory) => {
          return parentCategory.isPay
        }
      )
      const incomeList: ParentCategory[] = value.data.filter(
        (parentCategory: ParentCategory) => {
          return !parentCategory.isPay
        }
      )
      this.setParentCategoryPayList(payList)
      this.setParentCategoryIncomeList(incomeList)
    })
  }

  /**
   * 子カテゴリ一覧を取得
   */
  @Action
  fetchChildCategoryList(_payload?: any) {
    axios.get('api/paymentCategoryChild', _payload).then((value: any) => {
      this.setChildCategoryList(value.data)
    })
  }

  /**
   * 子カテゴリ一覧(親カテゴリ指定)を取得
   */
  // @Action
  // fetchSelectChildCategoryList(parentId: string) {
  //   const selectChildCategoryList = this.childCategoryList.filter((data) => {
  //     return data.parentId === parentId
  //   })
  //   this.setSelectChildCategoryList(selectChildCategoryList)
  // }

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
   * 子カテゴリ一覧をセット
   */
  @Mutation
  setChildCategoryList(list: ChildCategory[]) {
    this.childCategoryList = list
  }

  // /**
  //  * 子カテゴリ一覧(親カテゴリ指定)をセット
  //  */
  // @Mutation
  // setSelectChildCategoryList(list: ChildCategory[]) {
  //   this.selectChildCategoryList = list
  // }
}
