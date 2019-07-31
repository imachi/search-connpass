<template>
  <select class="select-month">
    <option disabled>{{ defaultValue }}</option>
    <option
      v-for="selectItem in selectBoxItem" 
      :key="selectItem.id"
      :value="selectItem.id"
    >
    {{ selectItem.month }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})

export default class selectBox extends Vue {
  @Prop() defaultValue!: string
  @Prop() selectBoxItem!: { [k: string]: string }[]
}
</script>

<style>
.select-month {
  border: none;
  outline: none;
  border-radius: 0;
  background: none;
  min-width: 5em;
  width: 30%;
  height: 3em;
}
.select-month.nomal {
  border: solid 1px #cccccc;
}
.select-month.nomal:focus {
  border: solid 1px #66cdaa;
}
.select-month.decorate {
  border-radius: 3px;
  border: solid 1px #cccccc;
}
.select-month.decorate:focus {
  border: solid 1px #fa8072;
}
</style>
