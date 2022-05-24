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
      <!-- 支出タブの中身 -->
      <v-tab-item>
        <div v-for="(data, i) in datas" :key="i">
          <CategoryTable
            v-if="data.paymentFlag == tab"
            :parent="data.parent"
            :childs="data.childs"
          />
        </div>
      </v-tab-item>
      <!-- 収入タブの中身 -->
      <v-tab-item>
        <div v-for="(data, i) in datas" :key="i">
          <CategoryTable
            v-if="data.paymentFlag == tab"
            :parent="data.parent"
            :childs="data.childs"
          />
        </div>
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
      paymentFlag: 0,
    },
    {
      paymentName: '収入',
      paymentFlag: 1,
    },
  ]

  datas = [
    {
      parentId: 3,
      parent: '仕事',
      childs: ['副業', '給料'],
      paymentFlag: 1,
    },
    {
      parentId: 1,
      parent: '食費',
      childs: ['ランチ', 'ディナー'],
      paymentFlag: 0,
    },
    {
      parentId: 2,
      parent: '趣味',
      childs: ['書籍'],
      paymentFlag: 0,
    },
  ]
}
</script>
