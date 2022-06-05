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

  // /**
  //  * 親カテゴリを指定された子カテゴリ一覧を返す
  //  * @return {ChildCategory[]}
  //  */
  // get getChildCategory(parentId: string): ChildCategory[] {
  //   console.log(parentId)
  //   return this.childCategoryList
  // }

  /**
   * 親カテゴリ一覧を取得
   */
  @Action
  fetchCategoryList() {
    // ここでバックエンドから親カテゴリを取得してくる
    const categoryList: ParentCategory[] = [
      { id: '1', name: '食費', isPay: true },
      { id: '2', name: '趣味', isPay: true },
      { id: '3', name: '給料', isPay: false },
    ]
    this.setParentCategoryList(categoryList)
    this.fetchChildCategoryList()
  }
  // @Action
  // fetchParentCategoryList() {
  //   // ここでバックエンドから親カテゴリを取得してくる
  //   const categoryList: ParentCategory[] = [
  //     { id: '1', name: '食費', isPay: true },
  //     { id: '2', name: '趣味', isPay: true },
  //     { id: '3', name: '給料', isPay: false },
  //   ]
  //   this.setParentCategoryList(categoryList)
  // }

  /**
   * 子カテゴリ一覧を取得
   */
  @Action
  fetchChildCategoryList(parentId?: string) {
    // ここでバックエンドから親カテゴリを取得してくる
    let categoryList: ChildCategory[] = [
      { id: '1a', name: 'ランチ', parentId: '1' },
      { id: '1b', name: 'ディナー', parentId: '1' },
      { id: '1c', name: 'おやつ', parentId: '1' },
      { id: '2a', name: '書籍', parentId: '2' },
      { id: '3a', name: '仕事', parentId: '3' },
      { id: '3b', name: '副業', parentId: '3' },
    ]
    if (parentId != null) {
      categoryList = categoryList.filter((data) => {
        return data.parentId === parentId
      })
    }
    this.setChildCategoryList(categoryList)
  }
  // fetchChildCategoryList() {
  //   // ここでバックエンドから親カテゴリを取得してくる
  //   const categoryList: ChildCategory[] = [
  //     { id: '1a', name: 'ランチ', parentId: '1' },
  //     { id: '1b', name: 'ディナー', parentId: '1' },
  //     { id: '1c', name: 'おやつ', parentId: '1' },
  //     { id: '2a', name: '書籍', parentId: '2' },
  //     { id: '3a', name: '仕事', parentId: '3' },
  //     { id: '3b', name: '副業', parentId: '3' },
  //   ]
  //   this.setChildCategoryList(categoryList)
  // }

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
}
