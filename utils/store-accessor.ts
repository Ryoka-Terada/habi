/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import CategoryModule from '~/store/category'

let categoryStore: CategoryModule

function initialiseStores(store: Store<any>): void {
  categoryStore = getModule(CategoryModule, store)
}

export { initialiseStores, categoryStore }
