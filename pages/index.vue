<template>
  <div class="main">
    <v-app-bar fixed class="navbar">
      <v-btn :color="goodColor" @click="goodClick"> Git({{ goodNum }}) </v-btn>
      <v-btn :color="waitingColor" @click="waitingClick">
        Nowe({{ waitingNum }})
      </v-btn>
      <v-btn :color="binColor" @click="binClick"> Kosz({{ binNum }}) </v-btn>
      <div class="pageSelectCont d-flex flex-nowrap">
        <v-select
          v-model="page"
          :items="pages"
          label="Strona"
          :value="0"
          class="pageSelect"
        ></v-select
        ><v-select
          v-model="onPage"
          :items="[10, 20, 30, 50, 100, 200, 500]"
          label="Na Stronie"
          :value="0"
          class="pageNumSelect"
        ></v-select>
      </div>
    </v-app-bar>
    <mieszkania-list :mieszkania="mieszkaniaArray" class="listM" />
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
      page: 0,
      onPage: 10,
    }
  },
  computed: {
    ...mapGetters({
      mieszkania: 'mieszkania/mieszkania',
    }),
    mieszkaniaArray() {
      return Object.values(this.mieszkania)
        .filter((e) => {
          if (this.good && e.state === 1) return true
          if (this.bin && e.state === -1) return true
          if (this.waiting && e.state === 0) return true
          return false
        })
        .sort((a, b) => {
          const priceA = a.price | 0;
          const priceB = b.price | 0;
          if(priceA < priceB) return -1;
          if(priceA > priceB) return 1;
          return 0;
        })
        .slice(this.page * this.onPage, (this.page + 1) * this.onPage);
    },
    mieszkaniaLength() {
      return Object.values(this.mieszkania).filter((e) => {
        if (this.good && e.state === 1) return true
        if (this.bin && e.state === -1) return true
        if (this.waiting && e.state === 0) return true
        return false
      }).length
    },
    pages() {
      const x = [0]
      for (let i = 1; i <= (this.mieszkaniaLength - 1) / this.onPage; i++)
        x.push(i)
      return x
    },
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
  watch: {
    mieszkaniaLength(v) {
      this.page = Math.min(
        this.page,
        Math.max(0, Math.floor((v - 1) / this.onPage))
      )
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
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  button {
    margin: 4px;
  }
}
.listM {
  margin-top: 60px;
}
.pageSelectCont {
  margin-top: 30px;
}
.pageSelect {
  width: 50px;
}
.pageNumSelect {
  width: 70px;
}
</style>
