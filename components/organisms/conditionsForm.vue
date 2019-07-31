<template>
  <!-- イベント開催月
  管理者のニックネーム
  keyword（複数可）
  入力フォーム -->
  <div class="serch-form">
    <form action="#">
      <selectBox :selectBoxItem="selectMonth" :defaultValue="textVal" :class="nomal" />
      <keywordInput v-model="inputKeyword" :type="type" :placeholder="placeholder" :class="nomal" />
      <p>input Data is : {{ inputKeyword }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import keywordInput from '~/components/atoms/keywordInput.vue'
import selectBox from '~/components/atoms/selectBox.vue'

@Component({
  components: {
    keywordInput,
    selectBox
  }
})

export default class conditionsForm extends Vue {
  textVal: string = 'イベント開催月を選択してください'
  placeholder: string = 'イベントのタイトルや住所などを入力してください（複数可)'
  type: string = 'text'
  nomal: string = 'nomal'
  decorate: string = 'decorate'
  inputKeyword: string = ''

  selectMonth: { [k: string]: string }[] = [
    {id: "1", month: "Jan"},
    {id: "2", month: "Feb"},
    {id: "3", month: "Mar"},
    {id: "4", month: "Apr"},
    {id: "5", month: "May"},
    {id: "6", month: "Jun"},
    {id: "7", month: "Jul"},
    {id: "8", month: "Aug"},
    {id: "9", month: "Sep"},
    {id: "10", month: "Oct"},
    {id: "11", month: "Nov"},
    {id: "12", month: "Dec"}
  ]

  processingDate() {
    const today = new Date()
    const day = today.getDate()
  }
}
</script>

<style></style>
