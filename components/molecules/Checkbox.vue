<template>
  <v-checkbox :label="label"></v-checkbox>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Textbox extends Vue {
  @Prop({ type: String, required: true })
  label!: string
}
</script>
