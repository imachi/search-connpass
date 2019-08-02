<template>
  <div class="serch-form">
    <form action="#">
      <selectBox v-model="selectData" :selectBoxItem="selectMonth" :defaultValue="textVal" :class="nomal" />
      <keywordInput v-model="inputKeyword" :type="type" :placeholder="placeholder" :class="nomal" />
      <button type="button" class="button" @click="searchEvent">search</button>
    </form>
    <div class="event-table">
      <table>
        <tr 
          v-for="event in fetchEventData" 
          :key="event.index"
          >
          <td>{{ event.started_at }}</td>
          <td>
            <a :href="event.event_url" target="__blank">
              {{ event.title }}
            </a>
          </td>
          <td>{{ event.catch }}</td>
          <td>{{ event.address }}</td>
          <td>{{ event.limit }}</td>
        </tr>
      </table>
    </div>
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

  searchEvent(): void {
    this.requestData()
  }

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
          alert('ないよ')
        }else {
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
  display: inline-block;
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
}
form {
  margin-bottom: 20px;
}
.event-table {
  width: 100%;
  height: 300px;
  overflow-y: auto;
}
table{
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
table tr{
  border-bottom: solid 1px #eee;
  cursor: pointer;
}
table th,table td{
  text-align: center;
  width: 25%;
  padding: 15px 0;
}
</style>
