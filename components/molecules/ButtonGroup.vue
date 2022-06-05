<template>
  <div>
    <div style="width: 350px">
      <v-btn-toggle
        v-model="selectVal"
        class="overflow-x-auto"
        borderless
        tile
        :color="color"
        @change="parentId"
      >
        <v-btn
          v-for="(category, i) in categorys"
          :key="i"
          class="ma-2"
          :value="category.id"
        >
          {{ category.name }}
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ButtonGroup extends Vue {
  @Prop({ type: Array, required: true })
  data!: { id: string; name: string; isPay: boolean }[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  selectVal: string = ''

  get color(): string {
    return this.isPay ? 'red' : 'green'
  }

  get categorys(): { id: string; name: string; isPay: boolean }[] {
    return this.data.filter((data) => {
      return data.isPay === this.isPay
    })
  }

  parentId() {
    this.$emit('parentId', this.selectVal)
  }
}
</script>
