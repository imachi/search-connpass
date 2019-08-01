<template>
  <div>
    <img src="~/assets/img/connpass_logo_2.png" width="150px" height="40px">
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

<style>
.index-temp {
  width: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.index-temp > h1 {
  margin-bottom: 30px;
  font-size: 25px;
  letter-spacing: 1px;
}
</style>
