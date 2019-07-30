<template>
  <div>
    <h1>Serch Event</h1>
    <conditionsForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import conditionsForm from '~/components/conditionsForm.vue'

@Component ({
    components: {
    conditionsForm
  }
})
export default class IndexPage extends Vue {

  async fetchData() {
    axios
      .get('https://connpass.com/api/v1/event/')
      .then()
    
  }
  created() {
    this.fetchData()
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
