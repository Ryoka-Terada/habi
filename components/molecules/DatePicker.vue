<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="formatDate"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="inputValue"
      no-title
      locale="jp-ja"
      :day-format="(date) => new Date(date).getDate()"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class DatePicker extends Vue {
  @Prop({ type: String, required: true })
  date!: string

  menu: boolean = false

  get formatDate(): string {
    const date = JSON.parse(JSON.stringify(this.date))
    const [year, month, day] = date.split('-')
    return (
      year +
      this.$t('common.year') +
      month +
      this.$t('common.month') +
      day +
      this.$t('common.day')
    )
  }

  get inputValue(): string {
    return this.date
  }

  set inputValue(val: string) {
    this.$emit('changeDate', val)
    this.menu = false
  }
}
</script>
