<template>
  <v-app>
    <Nuxt />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.socket = this.$nuxtSocket({})
    this.socket.on('allData', (msg) => {
      const tmp = {}
      msg.forEach((e) => (tmp[e[0]] = e[1]))
      this.setAll(tmp)
    })
  },
  methods: {
    ...mapMutations('mieszkania', ['setAll']),
  },
}
</script>