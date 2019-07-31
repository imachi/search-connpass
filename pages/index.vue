<template>
  <div>
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

<style></style>
