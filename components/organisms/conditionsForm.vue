<template>
  <!-- イベント開催月
  管理者のニックネーム
  keyword（複数可）
  入力フォーム -->
  <div>
    <form action="#">
      <select class="event-month">
        <option disabled value="イベント開催月を選択してください"></option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>
      <keywordInput v-model="inputKeyword" :type="type" :placeholder="placeholder" :class="nomal" />
      <p>input Data is : {{ inputKeyword }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import keywordInput from '~/components/atoms/keywordInput.vue'

@Component({
  components: {
    keywordInput
  }
})

export default class conditionsForm extends Vue {
  placeholder: string = 'イベントのタイトルや住所などを入力してください（複数可)'
  type: string = 'text'
  nomal: string = 'nomal'
  decorate: string = 'decorate'
  inputKeyword: string = ''

  processingDate() {
    const today = new Date()
    const day = today.getDate()
  }
}
</script>

<style>

</style>
