<template>
  <div class="tournament-standing-playoffs">
    <div
      class="tournament-standing-match"
      v-for="match in matches"
      :key="match.matchNumber"
    >
      <h4 class="tournament-standing-match-title">
        Jogo {{ match.matchNumber }}
      </h4>

      <div class="tournament-standing-match-info">
        <div class="tournament-standing-match-team">
          <img
            class="match-playoff-logo"
            :src="match.homeTeam.logoSvg"
            alt=""
          />
          <div class="match-playoff-team-name">{{ match.homeTeam.name }}</div>
          <div class="match-playoff-team-points">
            {{ Number(match.homeTeam.points).toFixed(2) || 0 }}
          </div>
        </div>
        <div class="tournament-standing-match-separator">x</div>
        <div class="tournament-standing-match-team">
          <div class="match-playoff-team-points">
            {{ Number(match.awayTeam.points).toFixed(2) || 0 }}
          </div>
          <div class="match-playoff-team-name">{{ match.awayTeam.name }}</div>
          <img
            class="match-playoff-logo"
            :src="match.awayTeam.logoSvg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["matches"],
  data() {
    return {};
  },
};
</script>
<style>
.tournament-standing-playoffs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.tournament-standing-match {
  padding: 25px;
  border: 1px solid #ddd;
  margin-top: 20px;
  width: 100%;
}

.tournament-standing-match-title {
  text-align: center;
  font-weight: lighter;
}

.tournament-standing-match-info {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.tournament-standing-match-team {
  display: flex;
  align-items: center;
  width: 45%;
}

.match-playoff-logo {
  height: 50px;
  margin: 0 20px;
  width: 10%;
}

.match-playoff-team-name,
.match-playoff-team-points {
  font-weight: bold;
  margin: 0 20px;
}

.match-playoff-team-name {
  width: 50%;
}

.match-playoff-team-points {
  width: 10%;
}
</style>