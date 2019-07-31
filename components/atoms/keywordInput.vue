<template>
  <input
    class="input-item"
    :type="type"
    :placeholder="placeholder"
    :class="nomal"
    :value="value"
    @input="changeInput"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { placeholder } from '@babel/types';

@Component({})

export default class keywordInput extends Vue {
  @Prop() placeholder!: string
  @Prop() type!: string
  @Prop() nomal!: string

  value: string = ''

  changeInput(e) {
    this.$emit('input', e.target.value)
  }
}
</script>

<style>
.input-item {
  outline: none;
  border: none;
  min-width: 28em;
  width: 45%;
  height: 3em;
  cursor: pointer;
  padding: 5px;
}
.input-item.nomal {
  border: solid 1px #cccccc;
}
.input-item.nomal:focus {
  border: solid 1px #66cdaa;
}
.input-item.decorate {
  border-radius: 3px;
  border: solid 1px #cccccc;
}
.input-item.decorate:focus {
  border: solid 1px #fa8072;
}
</style>
