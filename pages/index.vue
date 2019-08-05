<template>
  <div>
    <div class="event-img">
      <img src="~/assets/img/connpass_logo_2.png">
    </div>
    <div class="index-temp">
      <h1>Search Event</h1>
      <conditionsForm />
      <resultsData />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import conditionsForm from '~/components/organisms/conditionsForm.vue'
import resultsData from '~/components/organisms/resultsData.vue'

@Component ({
  components: {
    conditionsForm,
    resultsData
  }
})
export default class IndexPage extends Vue {

}
</script>

<style scoped>
.index-temp {
  width: 80%;
  margin: auto;
  padding-bottom: 50px;
}
.index-temp > h1 {
  margin-bottom: 20px;
  font-size: 25px;
  letter-spacing: 1px;
}
.event-img {
  display: inline-block;
  width: 200px;
  height: 40px;
  margin: 20px 30px;
}
</style>
