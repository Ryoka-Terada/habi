import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
} from 'vuex-module-decorators'
import { ParentCategory } from '../types/parentCategory'
import { ChildCategory } from '../types/childCategory'

config.rawError = true

@Module({ stateFactory: true, namespaced: true, name: 'category' })
export default class CategoryModule extends VuexModule {
  /**
   * 親カテゴリ一覧
   * @type {ParentCategory[]}
   */
  private parentCategoryList: ParentCategory[] = []

  /**
   * 子カテゴリ一覧
   * @type {ChildCategory[]}
   */
  private childCategoryList: ChildCategory[] = []

  /**
   * 子カテゴリ一覧(親カテゴリ指定)
   * @type {ChildCategory[]}
   */
  private selectChildCategoryList: ChildCategory[] = []

  /**
   * 親カテゴリ一覧を返す
   * @return {ParentCategory[]}
   */
  get getParentCategoryList(): ParentCategory[] {
    return this.parentCategoryList
  }

  /**
   * 子カテゴリ一覧を返す
   * @return {ChildCategory[]}
   */
  get getChildCategoryList(): ChildCategory[] {
    return this.childCategoryList
  }

  /**
   * 子カテゴリ一覧を返す
   * @return {ChildCategory[]}
   */
  get getSelectChildCategoryList(): ChildCategory[] {
    return this.selectChildCategoryList
  }

  /**
   * 親カテゴリ一覧を取得
   */
  @Action
  fetchParentCategoryList() {
    // ここでバックエンドから親カテゴリを取得してくる
    const categoryList: ParentCategory[] = [
      { id: '1', name: '食費', isPay: true },
      { id: '2', name: '趣味', isPay: true },
      { id: '3', name: '給料', isPay: false },
    ]
    this.setParentCategoryList(categoryList)
    this.fetchChildCategoryList()
  }

  /**
   * 子カテゴリ一覧を取得
   */
  @Action
  fetchChildCategoryList() {
    // ここでバックエンドから子カテゴリを取得してくる
    const categoryList: ChildCategory[] = [
      { id: '1a', name: 'ランチ', parentId: '1' },
      { id: '1b', name: 'ディナー', parentId: '1' },
      { id: '1c', name: 'おやつ', parentId: '1' },
      { id: '2a', name: '書籍', parentId: '2' },
      { id: '3a', name: '仕事', parentId: '3' },
      { id: '3b', name: '副業', parentId: '3' },
    ]
    this.setChildCategoryList(categoryList)
  }

  /**
   * 子カテゴリ一覧(親カテゴリ指定)を取得
   */
  @Action
  fetchSelectChildCategoryList(parentId: string) {
    const selectChildCategoryList = this.childCategoryList.filter((data) => {
      return data.parentId === parentId
    })
    this.setSelectChildCategoryList(selectChildCategoryList)
  }

  /**
   * 親カテゴリ一覧をセット
   */
  @Mutation
  setParentCategoryList(list: ParentCategory[]) {
    this.parentCategoryList = list
  }

  /**
   * 子カテゴリ一覧をセット
   */
  @Mutation
  setChildCategoryList(list: ChildCategory[]) {
    this.childCategoryList = list
  }

  /**
   * 子カテゴリ一覧(親カテゴリ指定)をセット
   */
  @Mutation
  setSelectChildCategoryList(list: ChildCategory[]) {
    this.selectChildCategoryList = list
  }
}
