<template>
  <v-text-field :label="label" outlined></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Textbox extends Vue {
  @Prop({ type: String, required: true })
  label!: string
}
</script>
