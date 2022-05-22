<template>
  <div>
    <v-container justify="center" align="center">
      <v-row class="pr-4 mt-1"> <v-spacer /><BurgerMenu /> </v-row>
    </v-container>
    <v-tabs v-model="tab">
      <v-tab v-for="(category, i) in categories" :key="i">{{
        category.paymentName
      }}</v-tab>
    </v-tabs>
    <v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(category, k) in categories" :key="k">
          <v-simple-table v-for="(parent, i) in parents" :key="i">
            <thead v-if="parent.paymentFlag == category.paymentFlag">
              <tr>
                <th>
                  {{ parent.name }}
                </th>
              </tr>
            </thead>
            <tbody v-for="(child, j) in childs" :key="j">
              <tr
                v-if="
                  child.parentId == parent.id &&
                  parent.paymentFlag == category.paymentFlag
                "
              >
                <td>{{ child.name }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Category extends Vue {
  tab = null
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
      parentId: 2,
      name: '書籍',
    },
    {
      parentId: 3,
      name: '給料',
    },
    // {
    //   categoryParent: '食費',
    //   categoryChild: 'ディナー',
    //   paymentFlag: 1,
    // },
    // {
    //   categoryParent: '趣味',
    //   categoryChild: '書籍',
    //   paymentFlag: 1,
    // },
    // {
    //   categoryParent: '仕事',
    //   categoryChild: '給料',
    //   paymentFlag: 0,
    // },
  ]
}
</script>
