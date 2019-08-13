<template>
  <select class="select-data" @change="selectChangeVal">
    <option>{{ defaultValue }}</option>
    <option
      v-for="selectItem in selectBoxItem" 
      :key="selectItem.index"
      :value="selectItem.val"
    >
    {{ selectItem.val }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { constants } from 'crypto';

@Component({})

export default class selectBox extends Vue {
  @Prop() defaultValue!: string
  @Prop() selectBoxItem!: { [k: string]: string }[]

  selectChangeVal(e) {
    this.$emit('input', e.target.value)
  }
}
</script>

<style scoped>
.select-data {
  border: 0;
  border-radius: 0;
  background: none;
  min-width: 5em;
  width: 30%;
  height: 4em;
  background-color: #ffffff;
  font-size: 11px;
}
.select-data.nomal {
  outline: 1px solid #cccccc;
}
.select-data.nomal:focus {
  outline: solid 1px #66cdaa;
}
.select-data.decorate {
  border-radius: 3px;
  border: solid 1px #cccccc;
}
.select-data.decorate:focus {
  border: solid 1px #fa8072;
}
</style>
