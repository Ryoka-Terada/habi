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
          v-for="(category, i) in categoryData"
          :key="i"
          class="ma-2"
          :value="category.parentId"
        >
          {{ category.label }}:{{ selectVal }}
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
  data!: { label: string; parentId: string; paymentFlag: boolean }[]

  @Prop({ type: Boolean, required: true })
  paymentFlag!: boolean

  selectVal: string = ''

  get color(): string {
    return this.paymentFlag ? 'red' : 'green'
  }

  get categoryData(): any {
    return this.data.filter((data) => {
      return data.paymentFlag === this.paymentFlag
    })
  }

  parentId() {
    this.$emit('parentId', this.selectVal)
  }
}
</script>
