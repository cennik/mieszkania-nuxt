<template>
  <div class="cont">
    <v-card v-for="m in mieszkania" :key="m.url" class="element">
      <a :href="m.url">{{ m.name }}</a>
      <div>{{ m.keywords.join(', ').replaceAll('+', ' ') }}</div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    good: {
      type: Boolean,
      default: () => false,
    },
    waiting: {
      type: Boolean,
      default: () => true,
    },
    bin: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapGetters({
      mieszkaniaRaw: 'mieszkania/mieszkania',
    }),
    mieszkania() {
      console.log(this.mieszkaniaRaw)
      return Object.values(this.mieszkaniaRaw)
    },
  },
}
</script>
<style scoped lang='scss'>
.cont {
  .element {
    margin: 5px;
  }
}
</style>
