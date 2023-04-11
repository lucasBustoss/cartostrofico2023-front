<template>
  <div class="tournament-matches">
    <h3 class="tournament-matches-title">Jogos</h3>

    <div class="tournament-matches-round">
      <v-icon
        class="round-picker"
        @click="previousRound"
        v-show="currentRound > 1"
        >{{ "mdi-arrow-left-thick" }}</v-icon
      >
      <div class="tournament-matches-round-info">
        Rodada {{ currentRound }} de {{ totalRounds }}
      </div>
      <v-icon
        class="round-picker"
        @click="nextRound"
        v-show="currentRound < totalRounds"
        >{{ "mdi-arrow-right-thick" }}</v-icon
      >
    </div>

    <div class="tournament-matches-list">
      <div class="tournament-match" v-for="(match, i) in matchesRound" :key="i">
        <div class="match-home-team">
          <img :src="match.homeTeam.logoSvg" class="match-team-logo" />
          <div class="match-team-name">{{ match.homeTeam.name }}</div>
        </div>
        <div class="match-home-team-points">
          {{ match.homeTeam.points || "0.00" }}
        </div>
        <div class="match-separator">x</div>

        <div class="match-away-team-points">
          {{ match.awayTeam.points || "0.00" }}
        </div>
        <div class="match-away-team">
          <img :src="match.awayTeam.logoSvg" class="match-team-logo" />
          <div class="match-team-name">{{ match.awayTeam.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["matches"],
  computed: {
    matchesRound() {
      const matches = this.matches.find((m) => m.round === this.currentRound);

      if (matches && matches.teams && matches.teams.length > 0) {
        return matches.teams;
      }

      return [];
    },
    totalRounds() {
      return this.matches.length;
    },
  },
  data() {
    return {
      currentRound: 1,
    };
  },
  methods: {
    nextRound() {
      if (this.currentRound < 38) {
        this.currentRound += 1;
      }
    },
    previousRound() {
      if (this.currentRound > 1) {
        this.currentRound -= 1;
      }
    },
  },
};
</script>
<style>
.tournament-matches-title {
  text-align: center;
  margin-bottom: 15px;
}

.tournament-matches-round {
  display: flex;
  justify-content: center;
}

.tournament-matches-round-info {
  padding: 0 10px;
  font-size: 0.85rem;
}

.tournament-matches-list {
  padding: 20px;
  border: 1px solid #aaa;
  margin-right: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tournament-match {
  display: flex;
  margin: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
}

.match-home-team,
.match-away-team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  font-size: 0.9rem;
}

.match-home-team-points {
  width: 15%;
}

.match-separator {
  width: 10%;
}

.match-team-name {
  font-weight: bold;
}

.match-team-logo {
  height: 30px;
}

.round-picker {
  cursor: pointer;
  font-size: 1rem !important;
}
</style>