<template>
  <div>
    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon dark size="50"> mdi-menu </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/calendar">
          <v-list-item-content>
            <v-list-item-title>カレンダー</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/category">
          <v-list-item-content>
            <v-list-item-title>カテゴリ管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
