<template>
  <div>
    <v-card color="green">
      <v-card-actions>
        <v-row>
          <v-col cols="2">
            <v-btn icon><v-icon>mdi-close</v-icon></v-btn>
          </v-col>
          <v-col class="d-flex align-center">趣味：書籍</v-col>
          <v-col class="d-flex justify-end align-center mr-2">2000円</v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class paymentList extends Vue {}
</script>
