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
        <div v-for="(category, i) in data" :key="i">
          <v-btn small class="ma-2" :value="category.id">
            {{ category.name }}:{{ selectVal }}
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
  @Prop({ type: Array, required: false })
  data!: { id: string; name: string; parentId: string }[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  selectVal: string = ''

  get color(): string {
    return this.isPay ? 'red' : 'green'
  }

  childId() {
    this.$emit('childId', this.selectVal)
  }
}
</script>
