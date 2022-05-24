<template>
  <div>
    <v-card tile flat class="mx-3">
      <v-list dense>
        <v-subheader>{{ parent }}</v-subheader>
        <div>
          <v-list-item v-for="(child, i) in childs" :key="i">
            <v-text-field
              v-model="childs[i]"
              :disabled="readOnly"
            ></v-text-field>
          </v-list-item>
        </div>
      </v-list>
      <v-container class="d-flex justify-end pa-1">
        <v-btn fab small color="green" elevation="1" @click="edit()">
          <v-icon color="white" size="20">mdi-pencil</v-icon>
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class CategoryTable extends Vue {
  @Prop({ type: String, required: true })
  parent!: string

  @Prop({ type: Array, required: true })
  childs!: string[]

  readOnly: boolean = true

  tmp!: string[]

  edit() {
    this.readOnly = !this.readOnly
    // this.$emit('editCategory', this.parent, this.childs)
  }
}
</script>
