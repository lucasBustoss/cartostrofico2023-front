<template>
  <div class="main-app">
    <Header v-if="user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
  </div>
</template>

<script>
import Header from "./components/template/Header";
import Content from "./components/template/Content.vue";
import Loading from "./components/template/Loading.vue";

import api from "./config/api";

import { userKey } from "@/global";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: { Header, Content, Loading },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      validatingToken: true,
    };
  },
  methods: {
    ...mapMutations(["setUser", "setHeaders"]),
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", userData);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" }).catch(() => {});
        return;
      }

      const res = await api.post("/usuarios/validar", userData);
      if (res.data) {
        this.setUser(userData);
        this.setHeaders(userData);
        this.$router.push({ name: "home" }).catch(() => {});
      } else {
        this.$store.commit("setUser", null);
        this.$store.commit("setHeader", null);
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" }).catch(() => {});
      }

      this.validatingToken = false;
    },
  },
  async mounted() {
    await this.validateToken();
  },
};
</script>

<style>
</style>