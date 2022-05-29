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
          v-for="(button, i) in data"
          :key="i"
          class="ma-2"
          :value="button.value"
        >
          {{ button.label }}
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
  data!: { label: string; value: string }[]

  @Prop({ type: Boolean, required: true })
  paymentFlag!: boolean

  selectVal: string = ''

  get color(): string {
    return this.paymentFlag ? 'green' : 'red'
  }

  parentId() {
    this.$emit('parentId', this.selectVal)
  }
}
</script>
