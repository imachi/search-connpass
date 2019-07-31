<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="valueChange"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { placeholder } from '@babel/types';

@Component({})

export default class keywordInput extends Vue {
@Prop() type!: string
@Prop() placeholder!: string

valueChange(e: any) {
  this.$emit('input', e.target.value)
}

}
</script>

<style>

</style>
