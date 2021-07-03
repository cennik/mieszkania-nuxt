<template>
  <v-dialog v-model="visible">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-information-outline</v-icon></v-btn
      >
    </template>
    <v-card class="cont">
      <div class="url">
        <a :href="mieszkanie.url">{{ mieszkanie.url }}</a>
      </div>
      <div class="d-flex justify-space-between">
        <span class="shop">
          {{ getShopName() }}
        </span>
        <span class="keywords">
          {{ mieszkanie.keywords.join(', ').replaceAll('+', ' ') }}
        </span>
      </div>
      <v-text-field v-model="newMieszkanie.name" label="Nazwa" />
      <v-text-field v-model="newMieszkanie.price" label="Cena" />
      <v-text-field
        v-model="newMieszkanie.PWdist"
        label="Odległość do PW(w km)"
      />
      <v-text-field
        v-model="newMieszkanie.MiMdist"
        label="Odległość do MiM(w km)"
      />
      <v-text-field v-model="newMieszkanie.PWtime" label="Czas do PW(w min)" />
      <v-text-field
        v-model="newMieszkanie.MiMtime"
        label="Czas do MiM(w min)"
      />
      <v-select
        v-model="newMieszkanie.bedrooms"
        :items="[1, 2, 3, 4, 5]"
        label="Ilość Sypialni"
        outlined
        clearable
      ></v-select>
      <v-select
        v-model="newMieszkanie.livingroom"
        :items="boolItems"
        item-text="name"
        item-value="val"
        label="Salon"
        outlined
        clearable
      ></v-select>
      <v-select
        v-model="newMieszkanie.eatplace"
        :items="boolItems"
        item-text="name"
        item-value="val"
        label="Miejsce do jedzenia"
        outlined
        clearable
      ></v-select>
      <v-select
        v-model="newMieszkanie.furnished"
        :items="boolItems"
        item-text="name"
        item-value="val"
        label="Umeblowane"
        outlined
        clearable
      ></v-select>
      <v-select
        v-model="newMieszkanie.balcony"
        :items="boolItems"
        item-text="name"
        item-value="val"
        label="Balkon"
        outlined
        clearable
      ></v-select>
      <v-select
        v-model="newMieszkanie.basement"
        :items="boolItems"
        item-text="name"
        item-value="val"
        label="Piwnica/Komórka"
        outlined
        clearable
      ></v-select>
      <v-textarea v-model="newMieszkanie.comment" label="Komentarz" outlined />
      <div class="d-flex">
        <v-select
          v-model="newMieszkanie.rating.kuba"
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          label="Ocena Kuby"
          outlined
          clearable
        ></v-select>
        <v-select
          v-model="newMieszkanie.rating.tymek"
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          label="Ocena Tymka"
          outlined
          clearable
        ></v-select>
        <v-select
          v-model="newMieszkanie.rating.szymon"
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          label="Ocena Szymona"
          outlined
          clearable
        ></v-select>
      </div>
      <v-card-actions class="justify-end">
        <v-btn outlined @click="cancel">anuluj</v-btn>
        <v-btn color="primary" @click="save">zapisz</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    mieszkanie: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    const nM = { ...this.mieszkanie, rating: { ...this.mieszkanie.rating } }
    return {
      visible: false,
      newMieszkanie: nM,
      boolItems: [
        { name: 'jest', val: true },
        { name: 'nie ma', val: false },
      ],
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({ persist: true })
  },
  methods: {
    getShopName() {
      if (this.mieszkanie.shopId === 0) return 'Szybko.pl'
      if (this.mieszkanie.shopId === 1) return 'olx.pl'
      return 'Nieznany sklep'
    },
    cancel() {
      this.visible = !this.visible
    },
    save() {
      this.socket.emit('update', this.newMieszkanie)
      this.cancel()
    },
  },
}
</script>

<style scoped lang='scss'>
.cont {
  padding: 10px;
  .url {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .shop,
  .keywords {
    font-size: 10pt;
  }
}
</style>