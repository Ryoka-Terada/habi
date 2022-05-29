<template>
  <v-container>
    <v-row justify="center">
      <v-card-title>{{ $t('appName') }}</v-card-title>
    </v-row>
    <v-row justify="center" class="form">
      <v-col cols="9">
        <Textbox :label="$t('common.mail')" />
      </v-col>
    </v-row>
    <v-row justify="center" class="form">
      <v-col cols="9">
        <Textbox :label="$t('common.password')" />
      </v-col>
    </v-row>
    <v-row justify="center" dense>
      <v-col cols="9">
        <v-checkbox :label="$t('common.holdLogin')"></v-checkbox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary" to="calendar">{{ $t('common.login') }}</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Index extends Vue {}
</script>

<style scoped>
.form {
  height: 80px;
}
</style>
