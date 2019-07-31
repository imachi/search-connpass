<template>
  <div class="index-temp">
    <h1>Search Event</h1>
    <conditionsForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import conditionsForm from '~/components/organisms/conditionsForm.vue'

@Component ({
  components: {
    conditionsForm
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
}
</style>
