<template>
  <div class="serch-form">
    <form action="#">
      <div class="select-box">
        <selectBox
          v-model="selectMonth" 
          :selectBoxItem="selectMonthData"
          :defaultValue="month"
          :class="nomal"
        />
        <selectBox
          v-model="selectPlace"
          :selectBoxItem="selectPrefectures"
          :defaultValue="place"
          :class="nomal"
        />
      </div>
      <keywordInput
        v-model="inputKeyword"
        :type="type"
        :placeholder="placeholder"
        :class="nomal"
      />
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
  selectMonth: string = ''
  selectPlace: string = ''
  inputKeyword: string = ''
  button: string = 'button'
  fetchEventData: { [k: string]: string }[] = []
  isAble: boolean = true

  selectMonthData: { [k: string]: string }[] = [
    {val: "01"},
    {val: "02"},
    {val: "03"},
    {val: "04"},
    {val: "05"},
    {val: "06"},
    {val: "07"},
    {val: "08"},
    {val: "09"},
    {val: "10"},
    {val: "11"},
    {val: "12"}
  ]

  selectPrefectures:{ [k: string]: string }[] = [
    {val: "東京都"},
    {val: "大阪府"},
    {val: "福岡県"},
    {val: "愛知県"},
    {val: "北海道"},
    {val: "神奈川県"},
    {val: "千葉県"},
    {val: "埼玉県"},
    {val: "山梨県"},
    {val: "栃木県"},
    {val: "茨城県"},
    {val: "群馬県"},
    {val: "福島県"},
    {val: "山形県"},
    {val: "宮城県"},
    {val: "岩手県"},
    {val: "秋田県"},
    {val: "青森県"},
    {val: "新潟県"},
    {val: "長野県"},
    {val: "富山県"},
    {val: "静岡県"},
    {val: "岐阜県"},
    {val: "石川県"},
    {val: "福井県"},
    {val: "滋賀県"},
    {val: "三重県"},
    {val: "京都府"},
    {val: "奈良県"},
    {val: "和歌山県"},
    {val: "兵庫県"},
    {val: "鳥取県"},
    {val: "岡山県"},
    {val: "島根県"},
    {val: "広島県"},
    {val: "山口県"},
    {val: "香川県"},
    {val: "徳島県"},
    {val: "高知県"},
    {val: "愛媛県"},
    {val: "大分県"},
    {val: "佐賀県"},
    {val: "長崎県"},
    {val: "熊本県"},
    {val: "鹿児島県"},
    {val: "宮崎県"},
    {val: "沖縄県"},
  ]

  processingDate(): string {
    const today = new Date()
    const year = today.getFullYear()
    const newYear = year.toString()
    const requestYm = newYear + this.selectMonth
    return requestYm
  }

  formatData(data): string {
    const format = new Date(data);
    return format.toLocaleDateString()
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
.select-box {
  margin-bottom: 20px;
}
</style>
