<template>
  <div :class="getClassInfo()">
    <v-col :cols="getColsStanding(tournament)">
      <TournamentStanding
        v-if="tournament.type === 'pontos' || tournament.type === 'resta'"
        :teams="tournament.standing"
        :type="tournament.type"
        :parameters="tournament.parameters"
      />

      <div
        v-if="
          tournament.type === 'mesclado' && tournament.currentPhase === 'group'
        "
      >
        <TournamentStanding
          :teams="getTeamsByGroup()"
          :type="tournament.type"
          :parameters="tournament.parameters"
          :currentPhase="tournament.currentPhase"
        />
      </div>

      <div
        v-if="
          tournament.type === 'mesclado' && tournament.currentPhase !== 'group'
        "
        class="tournament-playoffs"
      >
        <TournamentStandingPlayoffs v-if="showPhase" :matches="getMatches()" />
        <div class="phase-not-started" v-else>Fase não iniciada.</div>
      </div>
    </v-col>

    <v-divider
      v-if="
        tournament.type === 'pontos' ||
        (tournament.type === 'mesclado' && tournament.currentPhase === 'group')
      "
      vertical
      class="tournament-info-divider"
    ></v-divider>

    <v-col
      v-if="
        tournament.type !== 'resta' &&
        (tournament.type !== 'mesclado' ||
          (tournament.type === 'mesclado' &&
            tournament.currentPhase === 'group'))
      "
      cols="4"
    >
      <TournamentMatches :matches="getMatches()" />
    </v-col>
  </div>
</template>
<script>
import TournamentStanding from "./TournamentStanding.vue";
import TournamentMatches from "./TournamentMatches.vue";
import TournamentStandingPlayoffs from "./TournamentStandingPlayoffs.vue";

export default {
  props: ["tournament", "group", "phase", "showPhase"],
  components: {
    TournamentStanding,
    TournamentMatches,
    TournamentStandingPlayoffs,
  },
  methods: {
    getTeamsByGroup() {
      const teams = this.tournament.standing.filter(
        (s) => s.group === this.group
      );

      return teams;
    },
    getTotalRounds() {
      return this.tournament.matches.length;
    },
    getColsStanding(tournament) {
      if (
        tournament.type === "mesclado" &&
        tournament.currentPhase !== "group"
      ) {
        return 6;
      }

      if (tournament.type === "resta") {
        return 12;
      }

      return 8;
    },
    getMatches() {
      if (
        this.tournament.type === "mesclado" &&
        this.tournament.currentPhase === "group"
      ) {
        const matches = [];
        const totalRounds = this.getTotalRounds();

        for (let i = 1; i <= totalRounds; i++) {
          const matchesByRound = this.tournament.matches.find(
            (m) => m.round === i
          );

          const matchesByGroup =
            matchesByRound &&
            matchesByRound.groups.find((g) => g.group === this.group);

          if (matchesByGroup) {
            matches.push({ round: i, teams: matchesByGroup.teams });
          }
        }

        return matches;
      }

      if (
        this.tournament.type === "mesclado" &&
        this.tournament.currentPhase !== "group"
      ) {
        const matches = this.tournament.matchesPlayoffs.find(
          (mp) => mp.round === this.phase
        );

        return matches.teams;
      }

      const matches = [];
      const totalRounds = this.getTotalRounds();
      for (let i = 1; i <= totalRounds; i++) {
        const matchesByRound = this.tournament.matches.find(
          (m) => m.round === i
        );

        const matchesByGroup =
          matchesByRound &&
          matchesByRound.groups.find((g) => g.group === "todos");

        if (matchesByGroup) {
          matches.push({ round: i, teams: matchesByGroup.teams });
        }
      }

      return matches;
    },
    getClassInfo() {
      if (
        this.tournament.type === "mesclado" &&
        this.tournament.currentPhase !== "group"
      ) {
        return "tournament-info tournament-justify-center";
      }

      return "tournament-info";
    },
  },
};
</script>
<style>
.tournament-info {
  display: flex;
  margin-top: 20px;
  padding: 20px;
}

.tournament-info-divider {
  margin-right: 30px !important;
  margin: 15px !important;
}

.tournament-justify-center {
  justify-content: center;
  width: 100%;
}

.phase-not-started {
  font-size: 2rem;
  text-align: center;
}
</style>