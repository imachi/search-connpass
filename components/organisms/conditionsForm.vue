<template>
  <div class="serch-form">
    <form action="#">
      <selectBox v-model="selectData" :selectBoxItem="selectMonth" :defaultValue="textVal" :class="nomal" />
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
  textVal: string = 'イベント開催月を選択してください'
  placeholder: string = 'イベントのタイトルや住所などを入力してください（複数可)'
  type: string = 'text'
  nomal: string = 'nomal'
  decorate: string = 'decorate'
  selectData: string = ''
  inputKeyword: string = ''
  button: string = 'button'
  fetchEventData: { [k: string]: string }[] = []
  isAble: boolean = true

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
