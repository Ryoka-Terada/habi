<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
    </v-container>
    <v-tabs v-model="tab">
      <v-tab v-for="(category, i) in categories" :key="i">
        {{ category.paymentName }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(category, k) in categories" :key="k">
        <v-card v-for="(parent, i) in parents" :key="i" tile flat class="mx-3">
          <v-list v-if="parent.paymentFlag == category.paymentFlag" dense>
            <v-subheader>{{ parent.name }}</v-subheader>
            <div v-for="(child, j) in childs" :key="j">
              <v-list-item
                v-if="
                  child.parentId == parent.id &&
                  parent.paymentFlag == category.paymentFlag
                "
              >
                <v-text-field
                  :value="child.name"
                  :disabled="disabled"
                ></v-text-field>
              </v-list-item>
            </div>
          </v-list>
          <v-container
            v-if="parent.paymentFlag == category.paymentFlag"
            class="d-flex justify-end pa-1"
          >
            <v-btn
              fab
              small
              color="green"
              elevation="1"
              @click="editCategory(parent.id)"
            >
              <v-icon color="white" size="20">mdi-pencil</v-icon>
            </v-btn>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Category extends Vue {
  tab: any = null
  disabled: boolean = true
  categories = [
    {
      paymentName: '支出',
      paymentFlag: 1,
    },
    {
      paymentName: '収入',
      paymentFlag: 0,
    },
  ]

  parents = [
    {
      id: 1,
      name: '食費',
      paymentFlag: 1,
    },
    {
      id: 2,
      name: '趣味',
      paymentFlag: 1,
    },
    {
      id: 3,
      name: '仕事',
      paymentFlag: 0,
    },
  ]

  childs = [
    {
      parentId: 1,
      name: 'ランチ',
    },
    {
      parentId: 1,
      name: 'ディナー',
    },
    {
      parentId: 3,
      name: '副業',
    },
    {
      parentId: 2,
      name: '書籍',
    },
    {
      parentId: 3,
      name: '給料',
    },
  ]

  editCategory(parentId: number) {
    console.log('hello:' + parentId)
    this.disabled = !this.disabled
  }
}
</script>
