<template>
   <button :type="button" class="button" :class="nomal">search</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})

export default class utilButton extends Vue {
  @Prop() button: string
  @Prop() nomal: string
}
</script>

<style>
.button {
  display: inline-block;
  min-width: 7em;
  width: 70px;
}
.button.nomal {
  padding: 0.45em;
  text-decoration: none;
  color: #FFF;
  background: #d22c00;
  border-bottom: solid 2px #b02500;
  border-radius: 4px;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 20px;
}
</style>
