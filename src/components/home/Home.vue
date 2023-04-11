<template>
  <div class="home">
    <h2 class="home-title">Campeonatos</h2>

    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>

    <v-col cols="12" v-if="tournaments.length > 0 && !create">
      <Tournaments
        :tournaments="tournaments"
        :loadingDraw="loadingDraw"
        :loadingAdd="loadingAdd"
        :loadingUpdate="loadingUpdate"
        @createTournament="createTournament"
        @drawTournament="drawTournament"
        @addTeam="addTeam"
        @updatePoints="updatePoints"
      />
    </v-col>

    <v-col v-else cols="6">
      <TournamentCreate
        @save="saveTournament"
        :create="create"
        :loadingCreate="loadingCreate"
      />
    </v-col>
  </div>
</template>
<script>
import Tournaments from "@/components/tournaments/Tournaments.vue";
import TournamentCreate from "@/components/tournaments/TournamentCreate.vue";

import api from "@/config/api";
import { showError, showSuccess } from "@/global";

import { mapState } from "vuex";

export default {
  components: { Tournaments, TournamentCreate },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      tournaments: [],
      create: false,
      loadingDraw: false,
      loadingCreate: false,
      loadingAdd: false,
      loadingUpdate: false,
    };
  },
  methods: {
    createTournament() {
      this.create = true;
    },
    async loadTournaments() {
      try {
        console.log(this.user.id);
        const response = await api.get(`/torneios?ownerId=${this.user.id}`);

        if (response && response.data) {
          this.tournaments = response.data;
        }
      } catch (err) {
        showError(err);
      }
    },
    async saveTournament(tournament) {
      try {
        this.loadingCreate = true;
        const response = await api.post("/torneios", tournament);

        if (response && response.data) {
          await this.loadTournaments();
          showSuccess("Torneio criado com sucesso!");
        }
      } catch (err) {
        showError(err);
      }

      this.loadingCreate = false;
      this.create = false;
    },
    async drawTournament(id) {
      try {
        this.loadingDraw = true;
        const response = await api.post("/torneios/sortear", { id });

        if (response && response.data) {
          await this.loadTournaments();
          showSuccess("Torneio sorteado com sucesso!");
        }
      } catch (err) {
        showError(err);
      }

      this.loadingDraw = false;
    },
    async addTeam(data) {
      try {
        this.loadingAdd = true;
        const response = await api.post("/torneios/adicionarTime", data);

        if (response && response.data) {
          await this.loadTournaments();
        }

        showSuccess("Time adicionado com sucesso!");
      } catch (err) {
        showError(err);
      }

      this.loadingAdd = false;
    },
    async updatePoints() {
      try {
        this.loadingUpdate = true;

        for (let i = 0; i < this.tournaments.length; i++) {
          const { id } = this.tournaments[i];
          await api.post("/torneios/atualizar", { id });
        }

        await this.loadTournaments();
        showSuccess("Pontos atualizados com sucesso.");
      } catch (err) {
        showError(err);
      }

      this.loadingUpdate = false;
    },
  },
  async mounted() {
    await this.loadTournaments();
  },
};
</script>
<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-title {
  text-align: center;
  margin-top: 20px;
}
</style>