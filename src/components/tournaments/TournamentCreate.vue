<template>
  <div class="tournament-create">
    <div class="tournament-create-info" v-if="!create && !show">
      Não existe nenhum torneio criado no momento.
      <v-btn @click="showForm">Criar torneio</v-btn>
    </div>
    <TournamentCreateForm
      v-else
      @save="saveTournament"
      :loadingCreate="loadingCreate"
    />
  </div>
</template>
<script>
import TournamentCreateForm from "./TournamentCreateForm.vue";

export default {
  props: ["create", "loadingCreate"],
  components: { TournamentCreateForm },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showForm() {
      this.show = true;
    },
    saveTournament(tournament) {
      this.$emit("save", tournament);
      this.show = false;
    },
  },
};
</script>
<style>
.tournament-create {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  text-align: center;
}

.tournament-create-info {
  display: flex;
  flex-direction: column;
}

.tournament-create-info > button {
  margin-top: 30px;
}
</style>