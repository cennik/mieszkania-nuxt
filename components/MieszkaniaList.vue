<template>
  <div class="cont">
    <v-card
      v-for="m in mieszkania"
      :key="m.url"
      class="element"
      :class="{ good: m.state == 1, bin: m.state == -1 }"
    >
      <v-card-title
        ><a :href="m.url">{{ m.name }}</a></v-card-title
      >
      <v-card-subtitle>
        <div class="keywords">
          {{ m.keywords.join(', ').replaceAll('+', ' ') }}
        </div>
      </v-card-subtitle>
      <v-card-text>
        <div class="informations">
          {{ formatInfoString(m) }}
        </div>
        <div class="comment">
          {{ m.comment }}
        </div>
        <div class="rating">
          {{ formatRating(m) }}
        </div>
      </v-card-text>
      <v-card-actions class="d-flex">
        <v-btn icon @click="setState(m, 1)"><v-icon>mdi-check</v-icon></v-btn>
        <v-btn icon @click="setState(m, -1)"><v-icon>mdi-delete</v-icon></v-btn>
        <v-spacer />
        <mieszkania-edit :mieszkanie="m" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MieszkaniaEdit from './MieszkaniaEdit.vue'

export default {
  components: { MieszkaniaEdit },
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
      return Object.values(this.mieszkaniaRaw).filter((e) => {
        if (this.good && e.state === 1) return true
        if (this.bin && e.state === -1) return true
        if (this.waiting && e.state === 0) return true
        return false
      })
    },
  },
  methods: {
    setState(mieszkanie, state) {
      this.$nuxtSocket({}).emit('update', { ...mieszkanie, state })
    },
    formatInfoString(m) {
      let str = ''
      if (m.price) str += m.price + 'zł, '
      if (m.PWdist || m.PWtime) {
        str += 'PW: ('
        if (m.PWdist) str += m.PWdist + 'km, '
        if (m.PWtime) str += m.PWtime + 'min, '
        str += '), '
      }
      if (m.PWdist || m.PWtime) {
        str += 'MiM: ('
        if (m.MiMdist) str += m.MiMdist + 'km, '
        if (m.MiMtime) str += m.MiMtime + 'min, '
        str += '), '
      }
      if (m.bedrooms) str += m.bedrooms + ' sypialni, '
      if (m.livingroom) str += 'salon, '
      if (m.eatplace) str += 'miejsce do jedzenia, '
      if (m.furnished) str += 'umeblowane, '
      if (m.balcony) str += 'balkon, '
      if (m.basement) str += 'piwnica/komórka, '
      if (str.length > 2) str = str.substring(0, str.length - 2)
      return str
    },
    formatRating(m) {
      let str = ''
      if (m.rating) {
        if (m.rating.kuba != null) str += 'kuba:' + m.rating.kuba + ', '
        if (m.rating.tymek != null) str += 'tymek:' + m.rating.tymek + ', '
        if (m.rating.szymon != null) str += 'szymon:' + m.rating.szymon + ', '
      }
      if (str.length > 2) str = str.substring(0, str.length - 2)
      return str
    },
  },
}
</script>
<style scoped lang='scss'>
.cont {
  .good {
    background: #00cc00;
  }
  .bin {
    background: red;
  }
  .element {
    margin: 5px;
    padding: 10px;
    a {
      font-size: 20pt;
      text-decoration: none;
    }
    .keywords {
      font-size: 11pt;
    }
    .informations {
      margin: 3px 0;
    }
  }
}
</style>
