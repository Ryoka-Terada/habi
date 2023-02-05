<template>
  <div>
    <div style="width: 350px">
      <v-btn-toggle
        v-model="selectVal"
        class="overflow-x-auto"
        :rounded="mini"
        :background-color="
          mini ? (isPay ? 'pay lighten-1' : 'income lighten-1') : ''
        "
        @change="select"
      >
        <div v-for="(category, i) in categorys" :key="i">
          <v-btn
            :small="mini"
            class="ma-2"
            rounded
            :class="isPay ? 'pay--text' : 'income--text'"
            :value="category.id"
          >
            {{ category.name }}
          </v-btn>
        </div>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
export interface ButtonGroupOption {
  id: string
  name: string
  isPay: string
}

@Component
export default class ButtonGroup extends Vue {
  @Prop({ type: Array, required: true })
  option!: ButtonGroupOption[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  @Prop({ type: Boolean, required: false })
  mini!: boolean

  selectVal: string = ''

  get categorys(): ButtonGroupOption[] {
    return this.option.filter((data) => {
      return this.isPay ? data.isPay === 1 : data.isPay === 0
    })
  }

  select() {
    this.$emit('select', this.selectVal)
  }
}
</script>
