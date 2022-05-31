<template>
  <toggle-button
    :v-model="value"
    :labels="{ checked: check, unchecked: uncheck }"
    :width="90"
    :height="35"
    :font-size="20"
    :color="{
      checked: 'green',
      unchecked: 'red',
    }"
    @change="onChange($event.value)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Toggle extends Vue {
  @Prop({ type: Boolean, required: true })
  value!: boolean

  @Prop({ type: String, required: true })
  check!: string

  @Prop({ type: String, required: true })
  uncheck!: string

  // トグルボタンの機能がデフォルト未選択（value=false）となっている
  // 要件的にデフォルト支出（value=true）としたいため、ここではあえてトグルと反対の値で親を更新する
  onChange(eventVal: boolean) {
    this.$emit('onChange', !eventVal)
  }
}
</script>
