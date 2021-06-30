<template>
  <div class="main">
    <v-app-bar class="navbar">
      <v-btn :color="goodColor" @click="goodClick"> Git </v-btn>
      <v-btn :color="waitingColor" @click="waitingClick"> Nowe </v-btn>
      <v-btn :color="binColor" @click="binClick"> Kosz </v-btn>
    </v-app-bar>
    <mieszkania-list :good="good" :waiting="waiting" :bin="bin" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MieszkaniaList from '~/components/MieszkaniaList.vue'

export default {
  components: { MieszkaniaList },
  data() {
    return {
      good: false,
      waiting: true,
      bin: false,
    }
  },
  computed: {
    goodColor() {
      return this.good ? 'green' : ''
    },
    waitingColor() {
      return this.waiting ? 'grey' : ''
    },
    binColor() {
      return this.bin ? 'red' : ''
    },
  },
  methods: {
    ...mapMutations('mieszkania', ['setAll']),
    goodClick() {
      this.good = !this.good
    },
    waitingClick() {
      this.waiting = !this.waiting
    },
    binClick() {
      this.bin = !this.bin
    },
  },
}
</script>

<style scoped lang="scss">
.navbar {
  justify-content: center;
  display: flex;
  button {
    margin: 4px;
  }
}
</style>
