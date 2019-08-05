<template>
  <div class="serch-form">
    <form action="#">
      <selectBox v-model="selectData" :selectBoxItem="selectMonth" :defaultValue="month" :class="nomal" />
      <selectBox v-modal="selectPlace" :selectBoxItem="selectPrefectures" :defaultValue="place" :class="nomal" />
      <keywordInput v-model="inputKeyword" :type="type" :placeholder="placeholder" :class="nomal" />
      <button type="button" class="button" @click="requestData">search</button>
    </form>
    <div class="event-table" :class="{'is-open': isAble}">
      <table>
        <tr 
          v-for="event in fetchEventData" 
          :key="event.index"
          >
          <th>
            <a :href="event.event_url" target="__blank">
              {{ event.title }}
            </a>
          </th>
          <td>{{ event.started_at }}</td>
          <td>{{ event.catch }}</td>
          <td>{{ event.address }}</td>
        </tr>
      </table>
    </div>
    <div v-if="!isAble" class="not-found-message">イベントがありません</div>
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
  place: string = '都道府県を選択してください'
  month: string = 'イベント開催月を選択してください'
  placeholder: string = 'イベントのタイトルや住所などを入力してください（複数可)'
  type: string = 'text'
  nomal: string = 'nomal'
  decorate: string = 'decorate'
  selectPlace: string = ''
  selectData: string = ''
  inputKeyword: string = ''
  button: string = 'button'
  fetchEventData: { [k: string]: string }[] = []
  isAble: boolean = true

  selectMonth: { [k: string]: string }[] = [
    {id: "01", val: "Jan"},
    {id: "02", val: "Feb"},
    {id: "03", val: "Mar"},
    {id: "04", val: "Apr"},
    {id: "05", val: "May"},
    {id: "06", val: "Jun"},
    {id: "07", val: "Jul"},
    {id: "08", val: "Aug"},
    {id: "09", val: "Sep"},
    {id: "10", val: "Oct"},
    {id: "11", val: "Nov"},
    {id: "12", val: "Dec"}
  ]

  selectPrefectures:{ [k: string]: string }[] = [
    {id: "1", val: "東京都"},
    {id: "2", val: "大阪府"},
    {id: "3", val: "福岡県"},
    {id: "4", val: "愛知県"},
    {id: "5", val: "北海道"},
    {id: "6", val: "神奈川県"},
    {id: "7", val: "千葉県"},
    {id: "8", val: "埼玉県"},
    {id: "9", val: "山梨県"},
    {id: "10", val: "栃木県"},
    {id: "11", val: "茨城県"},
    {id: "12", val: "群馬県"},
    {id: "13", val: "福島県"},
    {id: "14", val: "山形県"},
    {id: "15", val: "宮城県"},
    {id: "16", val: "岩手県"},
    {id: "17", val: "秋田県"},
    {id: "18", val: "青森県"},
    {id: "19", val: "新潟県"},
    {id: "20", val: "長野県"},
    {id: "21", val: "富山県"},
    {id: "22", val: "静岡県"},
    {id: "23", val: "岐阜県"},
    {id: "24", val: "石川県"},
    {id: "25", val: "福井県"},
    {id: "26", val: "滋賀県"},
    {id: "27", val: "三重県"},
    {id: "28", val: "京都府"},
    // {id: "29", val: "奈良県"},
    {id: "30", val: "和歌山県"},
    {id: "31", val: "兵庫県"},
    {id: "32", val: "鳥取県"},
    {id: "33", val: "岡山県"},
    {id: "34", val: "島根県"},
    {id: "35", val: "広島県"},
    {id: "36", val: "山口県"},
    {id: "37", val: "香川県"},
    {id: "38", val: "徳島県"},
    {id: "39", val: "高知県"},
    {id: "40", val: "愛媛県"},
    {id: "41", val: "大分県"},
    {id: "42", val: "佐賀県"},
    {id: "43", val: "長崎県"},
    {id: "44", val: "熊本県"},
    {id: "45", val: "鹿児島県"},
    {id: "46", val: "宮崎県"},
    {id: "47", val: "沖縄県"},
  ]

  processingDate(): string {
    const today = new Date()
    const year = today.getFullYear()
    const newYear = year.toString()
    const requestYm = newYear + this.selectData
    return requestYm
  }

  formatData(data): string {
    const format = new Date(data);
    return format.toDateString()
  }

  async requestData(): Promise<any> {
    axios
      .get('/api',
        {
          params: {
            keyword: this.selectPlace,
            ym: this.processingDate(),
            keyword_or: this.inputKeyword
          }
        }
      )
      .then(res => {
        if(res.data.results_returned == 0) {
          //検索結果0件の場合
          this.isAble = false
        }else {
          this.isAble = true
          res.data.events.forEach(current => {
            current.started_at = this.formatData(current.started_at)
          })
          this.fetchEventData = res.data.events
        }
      })
      .catch(err => {
        console.error('error')
      })
  }
}
</script>

<style scoped>
.button {
  display: block;
  min-width: 7em;
  width: 70px;
  padding: 0.45em;
  text-decoration: none;
  color: #FFF;
  background: #d22c00;
  border-bottom: solid 2px #b02500;
  border-radius: 4px;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 20px;
  appearance: none;
  outline: none;
}
form {
  margin-bottom: 30px;
}
table {
  background-color: #ffffff;
}
.event-table {
  display: none;
  width: 100%;
  height: 400px;
  overflow-y: auto;
}
.event-table.is-open {
  display: block;
}
.event-table table{
  border-collapse: collapse;
  border-spacing: 0;
}
.event-table table tr{
  border-bottom: solid 1px #eeeeee;
}
.event-table table th,table td{
  text-align: center;
  padding: 20px 5px;
}
.event-table table th {
  width: 20%;
  font-size: 14px;
  cursor: pointer;
}
.event-table table td {
  width: 25%;
  font-size: 12px;
}
.event-table table th:hover {
  border-bottom: solid 1px #d22c00;
}
.not-found-message {
  width: 14em;
  padding: 10px;
  text-align: center;
  margin: auto;
  border-bottom: solid 1px #d22c00;
  letter-spacing: 2px;
}
</style>
