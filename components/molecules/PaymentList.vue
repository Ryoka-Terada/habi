<template>
  <v-card :color="color" class="mb-2">
    <v-card-actions>
      <v-row>
        <v-col cols="2">
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </v-col>
        <v-col class="d-flex align-center">{{ label }}</v-col>
        <v-col class="d-flex justify-end align-center mr-2">
          {{ amount }}{{ $t('common.yen') }}
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class paymentList extends Vue {
  @Prop({ type: String, required: true })
  label!: string

  @Prop({ type: Number, required: true })
  amount!: number

  @Prop({ type: Boolean, required: true })
  paymentFlag!: boolean

  @Prop({ type: Number, required: true })
  listNo!: Number

  color: string = 'green'

  created() {
    this.paymentFlag ? (this.color = 'red') : (this.color = 'green')
  }

  close() {
    this.$emit('close', this.listNo)
  }
}
</script>
