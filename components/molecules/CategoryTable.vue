<template>
  <div>
    <v-card tile flat class="mx-3">
      <v-list dense>
        <v-subheader :class="isPay ? 'pay--text' : 'income--text'">
          {{ parent.categoryName }}
        </v-subheader>
        <div>
          <v-list-item v-for="(child, i) in childrenData" :key="i">
            <v-text-field
              v-model="child.categoryName"
              :disabled="readOnly"
              :append-icon="readOnly ? '' : 'mdi-delete'"
              :background-color="child.isDelete ? 'secondary' : ''"
              @click:append="deleteList(i)"
            ></v-text-field>
          </v-list-item>
        </div>
        <div v-if="!readOnly" class="d-flex justify-end">
          <v-btn fab small @click="addChild()">
            <v-icon color="primary" size="20">mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-list>
      <v-container>
        <v-btn fab small elevation="3" @click="edit()">
          <v-icon v-if="readOnly" color="primary" size="20">mdi-pencil</v-icon>
          <v-icon v-else color="primary" size="20">mdi-lock</v-icon>
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ParentCategory } from '../../types/parentCategory'
import { ChildCategory } from '../../types/childCategory'
@Component
export default class CategoryTable extends Vue {
  @Prop({ type: Object, required: true })
  parent!: ParentCategory

  @Prop({ type: Array, required: true })
  children!: ChildCategory[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  readOnly: boolean = true

  /**
   * フィールド値: 子カテゴリのリスト
   */
  formChildren: ChildCategory[] = []

  /**
   * フィールド値を更新するためのgetter
   */
  get childrenData(): ChildCategory[] {
    if (this.formChildren.length === 0) {
      this.formChildren = JSON.parse(JSON.stringify(this.children))
    }
    return this.formChildren
  }

  /**
   * フィールド値を更新するためのsetter
   */
  set childrenData(val) {
    this.formChildren = val
  }

  /**
   * 子カテゴリ追加時の空の要素
   */
  emptyChildItem: ChildCategory = {
    childId: '',
    categoryName: '',
    parentId: this.parent.parentId,
    isDelete: false,
    createdAt: '',
    updatedAt: '',
    isPay: this.isPay,
  }

  /**
   * 子カテゴリを編集可能にする
   */
  edit() {
    if (!this.readOnly) {
      this.$emit('updateChildCategory', this.formChildren)
    }
    this.readOnly = !this.readOnly
  }

  /**
   * 子カテゴリの要素を削除する
   * 既存要素に関しては削除フラグを立てる
   */
  deleteList(index: number) {
    if (this.formChildren[index].childId) {
      this.formChildren[index].isDelete = !this.formChildren[index].isDelete
    } else {
      this.formChildren.splice(index, 1)
    }
    this.childrenData = this.formChildren
  }

  /**
   * 子カテゴリの要素を追加する
   */
  addChild() {
    this.formChildren.push(JSON.parse(JSON.stringify(this.emptyChildItem)))
    this.childrenData = this.formChildren
  }
}
</script>
