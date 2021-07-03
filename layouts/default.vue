<template>
  <v-app>
    <Nuxt />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.socket = this.$nuxtSocket({ persist: true })
    this.socket.on('allData', (msg) => {
      const tmp = {}
      msg.forEach((e) => (tmp[e[0]] = e[1]))
      this.setAll(tmp)
    })
    this.socket.on('update', (msg) => {
      this.setOne(msg)
    })
    this.socket.on('add', (msg) => {
      this.setOne(msg)
    })
  },
  methods: {
    ...mapMutations('mieszkania', ['setAll', 'setOne']),
  },
}
</script>