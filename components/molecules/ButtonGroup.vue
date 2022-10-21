<template>
  <div>
    <div style="width: 350px">
      <v-btn-toggle
        v-model="selectVal"
        class="overflow-x-auto"
        @change="select"
      >
        <div v-for="(category, i) in categorys" :key="i">
          <v-btn
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

@Component
export default class ButtonGroup extends Vue {
  @Prop({ type: Array, required: true })
  option!: { id: string; name: string; isPay: boolean }[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  selectVal: string = ''

  get categorys(): { id: string; name: string; isPay: boolean }[] {
    return this.option.filter((data) => {
      return data.isPay === this.isPay
    })
  }

  select() {
    this.$emit('select', this.selectVal)
  }
}
</script>
