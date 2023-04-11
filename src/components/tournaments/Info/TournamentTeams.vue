<template>
  <div>
    <div v-if="tournament.teams.length !== tournament.participants">
      <v-col cols="12" class="tournament-add-team-header">
        <h2 class="tournament-add-team-header-title">Adicionar time</h2>
      </v-col>
      <v-col cols="12" class="tournament-add-team">
        <autocomplete
          ref="team-autocomplete"
          :get-result-value="getResultTeam"
          :search="fetchTeam"
          :debounce-time="500"
          placeholder="Digite para listar um time"
          @submit="handleTeam"
          class="tournament-add-team-input"
        >
          <template #result="{ result, props }">
            <li v-bind="props">
              <div class="search-team-content">
                <div class="search-team-logo">
                  <img :src="result.logoSvg" />
                </div>
                <div class="search-team-info">
                  <div class="wiki-title">
                    {{ result.name }}
                  </div>
                  <div class="wiki-snippet" v-html="result.coach" />
                </div>
              </div>
            </li>
          </template>
        </autocomplete>

        <v-btn
          class="tournament-add-team-button"
          @click="addTeam"
          :loading="loadingAdd"
          >Adicionar</v-btn
        >
      </v-col>

      <v-divider></v-divider>
    </div>

    <h3 class="tournament-list-teams-title">
      Times incluídos - {{ tournament.teams.length }} de
      {{ tournament.participants }}
      {{ tournament.teams.length !== 1 ? "times" : "time" }}
    </h3>

    <div class="tournament-list-teams-header">
      <v-col cols="1" class="tournament-team-logo"> Logo </v-col>
      <v-col cols="3" class="tournament-team-name"> Nome do time </v-col>
      <v-col cols="2" class="tournament-team-coach"> Treinador </v-col>
      <v-col cols="2" class="tournament-team-delete"> Excluir? </v-col>
    </div>

    <div
      class="tournament-list-teams"
      v-for="team in tournament.teams"
      :key="team.teamId"
    >
      <v-col cols="1" class="tournament-team-logo">
        <img :src="team.logoSvg" />
      </v-col>
      <v-col cols="3" class="tournament-team-name">
        <div>{{ team.name }}</div>
      </v-col>
      <v-col cols="2" class="tournament-team-coach">{{ team.coach }}</v-col>
      <v-col cols="1" class="tournament-team-delete"
        ><v-btn class="button-delete" @click="deleteTeam(team)"
          >Excluir</v-btn
        ></v-col
      >
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
import { showError } from "@/global";

export default {
  props: ["tournament", "loadingAdd"],
  data() {
    return {
      searchTeams: [],
      selectedTeam: null,
    };
  },
  methods: {
    getResultTeam(team) {
      return team.name;
    },
    async fetchTeam(filtro) {
      if (!filtro || filtro.length < 1) return [];

      try {
        this.searchTeams = [];
        this.selectedTeam = null;
        const response = await api.get(`torneios/cartola?name=${filtro}`);

        if (response && response.data) {
          const teams = response.data;

          for (let i = 0; i < teams.length; i++) {
            const team = teams[i];

            if (!this.tournament.teams.some((t) => t.name === team.name)) {
              this.searchTeams.push(team);
            }
          }

          return this.searchTeams;
        }
      } catch (err) {
        showError(err);
      }
    },
    handleTeam(result) {
      this.selectedTeam = this.searchTeams.find(
        (st) => st.name === result.name
      );
    },
    addTeam() {
      if (this.selectedTeam) {
        this.$emit("addTeam", {
          tournamentId: this.tournament.id,
          name: this.selectedTeam.name,
        });

        this.selectedTeam = null;
        this.$refs["team-autocomplete"].value = "";
      }
    },
    deleteTeam(team) {
      this.$emit("deleteTeam", {
        tournamentId: this.tournament.id,
        teamId: team.teamId,
      });
    },
  },
};
</script>
<style>
.tournament-list-teams-title {
  font-size: 1.5rem;
  margin-top: 30px;
}

.tournament-list-teams-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.tournament-list-teams {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  margin: 20px;
}

.tournament-team-logo,
.tournament-team-name,
.tournament-team-coach {
  border-top: 1px solid #777;
  border-bottom: 1px solid #777;
}

.tournament-team-logo > img {
  height: 30px;
}

.tournament-team-logo {
  border-left: 1px solid #777;
  display: flex;
  height: 2.3rem;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
}

.tournament-team-name,
.tournament-team-coach {
  display: flex;
  height: 2.3rem;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #777;
  padding: 300px !important;
}

.tournament-team-delete {
  border: 1px solid #777;
  height: 37px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.button-delete {
  font-size: 0.6rem !important;
  height: 25px !important;
  background: rgb(201, 71, 71) !important;
  color: #fff !important;
}

.tournament-add-team-header-title {
  margin-bottom: 10px;
}

.tournament-add-team {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.tournament-add-team-input {
  width: 35%;
}

.tournament-add-team-button {
  width: 6%;
  padding: 22px !important;
  margin-left: 25px;
  background: #face3b !important;
}
</style>