<template>
  <div>
    <div class="create-tournament">
      <v-btn
        class="update-tournament-btn"
        @click="updatePoints"
        :loading="loadingUpdate"
        >Atualizar pontos</v-btn
      >
      <v-btn class="create-tournament-btn" @click="createTournament"
        >Criar campeonato</v-btn
      >
    </div>

    <div class="tournament">
      <v-tabs
        v-model="tabTournament"
        class="tournament-selection"
        center-active
      >
        <v-tab v-for="tournament in tournaments" :key="tournament.id">
          {{ tournament.name }}
        </v-tab>
      </v-tabs>

      <div v-for="(tournament, i) in tournaments" :key="tournament.id">
        <div v-if="tabTournament === i">
          <div class="tournament-not-drawn" v-if="!tournament.drawDate">
            <div v-if="tournament.participants === tournament.teams.length">
              <div>
                Ainda não foi realizado o sorteio do campeonato. Deseja sortear?
              </div>

              <v-btn
                class="tournament-draw-button"
                :loading="loadingDraw"
                @click="drawTournament(tournament.id)"
              >
                Sortear campeonato
              </v-btn>
            </div>

            <TournamentTeams
              :tournament="tournament"
              :loadingAdd="loadingAdd"
              :currentDeleteTeamId="currentDeleteTeamId"
              @addTeam="addTeam"
              @deleteTeam="deleteTeam"
            />
          </div>
          <div v-else class="tournament-content">
            <div>
              <div class="tournament-pick-phase">
                <div
                  v-if="tournament.type === 'mesclado'"
                  class="tournament-standing-group-title"
                >
                  <v-icon
                    class="group-picker"
                    @click="previousGroup(tournament)"
                    v-show="showPreviousPicker(tournament)"
                    >{{ "mdi-arrow-left-thick" }}</v-icon
                  >
                  <div v-if="tournament.currentPhase === 'group'">
                    {{ `Grupo ${currentGroup}` }}
                  </div>
                  <div v-if="tournament.currentPhase !== 'group'">
                    {{ getCurrentPhase(currentPhase) }}
                  </div>
                  <v-icon
                    class="group-picker"
                    @click="nextGroup(tournament)"
                    v-show="showNextPicker(tournament)"
                    >{{ "mdi-arrow-right-thick" }}</v-icon
                  >
                </div>
                <div>
                  <div
                    v-if="tournament.currentPhase !== 'group'"
                    class="tournament-show-other-phase"
                    @click="showPhase(tournament, 'group')"
                  >
                    Mostrar fase de grupos
                  </div>
                  <div
                    v-if="
                      tournament.currentPhase === 'group' &&
                      tournament.matchesPlayoffs &&
                      tournament.matchesPlayoffs.length > 0
                    "
                    class="tournament-show-other-phase"
                    @click="showPhase(tournament, 'quarter')"
                  >
                    Mostrar mata-mata
                  </div>
                </div>
              </div>

              <v-divider></v-divider>
              <TournamentInfo
                :tournament="tournament"
                :group="currentGroup"
                :phase="currentPhase"
                :showPhase="showPhaseInfo(tournament)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TournamentInfo from "./Info/TournamentInfo.vue";
import TournamentTeams from "./Info/TournamentTeams.vue";

export default {
  props: [
    "tournaments",
    "loadingDraw",
    "loadingAdd",
    "loadingUpdate",
    "currentDeleteTeamId",
  ],
  components: { TournamentInfo, TournamentTeams },
  computed: {},
  data() {
    return {
      tabTournament: null,
      groups: ["A", "B", "C", "D"],
      phases: ["quarter", "semi", "final"],
      currentGroup: "A",
      currentPhase: "quarter",
    };
  },
  methods: {
    createTournament() {
      this.$emit("createTournament");
    },
    updatePoints() {
      this.$emit("updatePoints");
    },
    addTeam(data) {
      this.$emit("addTeam", data);
    },
    deleteTeam(data) {
      this.$emit("deleteTeam", data);
    },
    showPhaseInfo(tournament) {
      const index = this.phases.indexOf(this.currentPhase);
      const currentIndex = this.phases.indexOf(tournament.currentPhase);

      return currentIndex >= index;
    },
    showPhase(tournament, phase) {
      tournament.currentPhase = phase;
    },
    async drawTournament(id) {
      await this.$emit("drawTournament", id);
    },
    showPreviousPicker(tournament) {
      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase === "group"
      ) {
        const index = this.groups.indexOf(this.currentGroup);

        return index !== 0;
      }

      const index = this.phases.indexOf(this.currentPhase);

      return index !== 0;
    },
    showNextPicker(tournament) {
      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase === "group"
      ) {
        const index = this.groups.indexOf(this.currentGroup);

        return index !== 3;
      }

      const index = this.phases.indexOf(this.currentPhase);

      return index !== 3;
    },
    previousGroup(tournament) {
      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase === "group"
      ) {
        const index = this.groups.indexOf(this.currentGroup);

        if (index !== 0) {
          this.currentGroup = this.groups[index - 1];
        }
      }
      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase !== "group"
      ) {
        const index = this.phases.indexOf(this.currentPhase);

        if (index !== 0) {
          this.currentPhase = this.phases[index - 1];
        }
      }
    },
    nextGroup(tournament) {
      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase === "group"
      ) {
        const index = this.groups.indexOf(this.currentGroup);

        if (index !== 3) {
          this.currentGroup = this.groups[index + 1];
        }
      }

      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase !== "group"
      ) {
        const index = this.phases.indexOf(this.currentPhase);

        if (index !== 3) {
          this.currentPhase = this.phases[index + 1];
        }
      }
    },
    getCurrentPhase(phase) {
      if (phase === "group") {
        return "Fase de grupos";
      }

      if (phase === "quarter") {
        return "Quartas de final";
      }

      if (phase === "semi") {
        return "Semi final";
      }

      return "Final";
    },
  },
};
</script>
<style>
.tournament {
  padding: 5px;
}

.tournament-pick-phase {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tournament-show-other-phase {
  font-size: 0.8rem;
  margin-right: 20px;
  margin-bottom: 15px;
  text-decoration: underline;
  cursor: pointer;
}

.tournament-standing-group-title {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
}

.change-group {
  font-size: 1rem;
  margin: 0 10px;
}

.create-tournament {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 5px;
}

.update-tournament-btn {
  background-color: #face3b !important;
  margin-right: 15px;
}

.create-tournament-btn {
  background-color: green !important;
  color: #fff !important;
}

.tournament-selection > .v-item-group {
  background: rgba(0, 0, 0, 0.267) !important;
  color: #fff;
}

.tournament-not-drawn {
  font-size: 1.3rem;
  text-align: center;
  margin-top: 50px;
}

.tournament-draw-button {
  margin-top: 20px;
  background-color: orange !important;
}

.search-team-content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.search-team-logo > img {
  height: 40px;
}

.search-team-info {
  margin-left: 10px;
}

.group-picker {
  cursor: pointer;
  font-size: 1rem !important;
  margin: 0 10px;
}
</style>