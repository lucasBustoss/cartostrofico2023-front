<template>
  <div class="auth-form">
    <h2>Login</h2>
    <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          type="password"
          label="Senha"
        ></v-text-field>
  
        <v-btn type="submit" @click="login" block class="mt-2">Entrar</v-btn>
      </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.$emit('login', { email: this.email, password: this.password })
    }
  }
}
</script>
<style>
.auth-form {
  height: 100vh;
  padding: 150px;
  padding-top: 350px;
}
</style>