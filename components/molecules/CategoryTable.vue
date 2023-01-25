<template>
  <div>
    <v-card tile flat class="mx-3">
      <v-list dense>
        <v-subheader :class="isPay ? 'pay--text' : 'income--text'">
          {{ parent.categoryName }}
        </v-subheader>
        <div>
          <v-list-item v-for="(child, i) in childs" :key="i">
            <v-text-field
              v-model="child.categoryName"
              :disabled="readOnly"
            ></v-text-field>
          </v-list-item>
        </div>
      </v-list>
      <v-container class="d-flex justify-end pa-1">
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
  childs!: ChildCategory[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  readOnly: boolean = true

  edit() {
    this.readOnly = !this.readOnly
  }
}
</script>
