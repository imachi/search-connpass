<template>
  <input
    class="input-item"
    :type="type"
    :placeholder="placeholder"
    :class="nomal"
    :value="value"
    @input="this.$emit('input', value)"
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
}
</script>

<style>
.input-item {
  

}
.input-item .nomal {

}
.input-item .decorate {

}
</style>
