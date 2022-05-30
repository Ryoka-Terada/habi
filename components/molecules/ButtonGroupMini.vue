<template>
  <div>
    <div style="width: 350px">
      <v-btn-toggle
        v-model="selectVal"
        dense
        class="overflow-x-auto"
        :background-color="color"
        borderless
        tile
        :color="color"
        @change="childId"
      >
        <div v-for="(button, i) in data" :key="i">
          <v-btn
            v-if="parentId === button.parentId"
            small
            class="ma-2"
            :value="button.value"
          >
            {{ button.label }}
          </v-btn>
        </div>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ButtonGroupMini extends Vue {
  @Prop({ type: String, required: false })
  parentId!: string

  @Prop({ type: Array, required: false })
  data!: { label: string; value: string; parentId: string }[]

  @Prop({ type: Boolean, required: true })
  paymentFlag!: boolean

  selectVal: string = ''

  get color(): string {
    return this.paymentFlag ? 'green' : 'red'
  }

  childId() {
    this.$emit('childId', this.selectVal)
  }
}
</script>
