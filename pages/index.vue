<template>
  <div class="main">
    <v-app-bar class="navbar">
      <v-btn :color="goodColor" @click="goodClick"> Git({{ goodNum }}) </v-btn>
      <v-btn :color="waitingColor" @click="waitingClick">
        Nowe({{ waitingNum }})
      </v-btn>
      <v-btn :color="binColor" @click="binClick"> Kosz({{ binNum }}) </v-btn>
    </v-app-bar>
    <mieszkania-list :good="good" :waiting="waiting" :bin="bin" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
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
    ...mapGetters({
      mieszkania: 'mieszkania/mieszkania',
    }),
    goodColor() {
      return this.good ? '#00cc00' : ''
    },
    waitingColor() {
      return this.waiting ? 'grey' : ''
    },
    binColor() {
      return this.bin ? 'red' : ''
    },
    goodNum() {
      return Object.values(this.mieszkania).filter((e) => e.state === 1).length
    },
    waitingNum() {
      return Object.values(this.mieszkania).filter((e) => e.state === 0).length
    },
    binNum() {
      return Object.values(this.mieszkania).filter((e) => e.state === -1).length
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
