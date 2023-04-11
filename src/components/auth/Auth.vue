<template>
  <div class="auth">
    <v-col cols="7">
      <AuthInfo />
    </v-col>

    <v-col cols="5">
      <AuthForm @login="login" :loadingLogin="loadingLogin" />
    </v-col>
  </div>
</template>
<script>
import AuthInfo from "./AuthInfo.vue";
import AuthForm from "./AuthForm.vue";

import api from "../../config/api";
import { userKey, showError } from "@/global";

import { mapMutations } from "vuex";

export default {
  components: { AuthInfo, AuthForm },
  data() {
    return {
      loadingLogin: false,
    };
  },
  methods: {
    ...mapMutations(["setHeaders", "setUser"]),
    async login(user) {
      try {
        this.loadingLogin = true;
        const response = await api.post("/usuarios/login", user);

        if (response.status === 200) {
          this.setHeaders(response.data);

          localStorage.setItem(userKey, JSON.stringify(response.data));

          this.setUser(response.data);

          this.$router.push({
            name: "home",
          });
        }
      } catch (e) {
        showError(e);
        this.loading = false;
      }

      this.loadingLogin = false;
    },
  },
};
</script>
<style>
.auth {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>