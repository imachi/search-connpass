<template>
  <div class="serch-form">
    <form action="#">
      <selectBox v-model="selectData" :selectBoxItem="selectMonth" :defaultValue="textVal" :class="nomal" />
      <keywordInput v-model="inputKeyword" :type="type" :placeholder="placeholder" :class="nomal" />
      <utilButton :type="button" :class="nomal" @click="searchEvent" />
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import keywordInput from '~/components/atoms/keywordInput.vue'
import selectBox from '~/components/atoms/selectBox.vue'
import utilButton from '~/components/atoms/utilButton.vue'

@Component({
  components: {
    keywordInput,
    selectBox,
    utilButton
  }
})

export default class conditionsForm extends Vue {
  textVal: string = 'イベント開催月を選択してください'
  placeholder: string = 'イベントのタイトルや住所などを入力してください（複数可)'
  type: string = 'text'
  nomal: string = 'nomal'
  decorate: string = 'decorate'
  selectData: string = ''
  inputKeyword: string = ''
  button: string = 'button'

  selectMonth: { [k: string]: string }[] = [
    {id: "01", month: "Jan"},
    {id: "02", month: "Feb"},
    {id: "03", month: "Mar"},
    {id: "04", month: "Apr"},
    {id: "05", month: "May"},
    {id: "06", month: "Jun"},
    {id: "07", month: "Jul"},
    {id: "08", month: "Aug"},
    {id: "09", month: "Sep"},
    {id: "10", month: "Oct"},
    {id: "11", month: "Nov"},
    {id: "12", month: "Dec"}
  ]

  searchEvent() {
    this.requestData()
  }

  processingDate(): string {
    const today = new Date()
    const year = today.getFullYear()
    const newYear = year.toString()
    const requestYm = newYear + this.selectData
    return requestYm
  }

  async requestData() {
    axios
      .get('/api',
        {
          params: {
            ym: this.processingDate(),
            keyword_or: this.inputKeyword
          }
        }
      )
      .then(res => {
        if(res.data.results_returned == 0) {
          //検索結果0件の場合
          alert('ないよ')
        }else {
          this.$emit(res.data)
        }
      })
      .catch(err => {
        console.error('error')
      })
  }
}
</script>

<style></style>
