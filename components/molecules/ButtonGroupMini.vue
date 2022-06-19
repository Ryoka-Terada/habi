<template>
  <div>
    <div style="width: 350px">
      <v-btn-toggle
        v-model="selectVal"
        class="overflow-x-auto pa-1"
        rounded
        :background-color="isPay ? 'pay lighten-1' : 'income lighten-1'"
        @change="childId"
      >
        <div v-for="(category, i) in data" :key="i">
          <v-btn
            rounded
            small
            class="ma-2"
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
export default class ButtonGroupMini extends Vue {
  @Prop({ type: Array, required: false })
  data!: { id: string; name: string; parentId: string }[]

  @Prop({ type: Boolean, required: true })
  isPay!: boolean

  selectVal: string = ''

  childId() {
    this.$emit('childId', this.selectVal)
  }
}
</script>
