<template>
  <div class="tournament-standing">
    <h3 class="tournament-standing-title">Tabela</h3>
    <div class="tournament-standing-team-header">
      <div class="tournament-standing-team-position">Posição</div>
      <div class="tournament-standing-team-logo-header">Logo</div>
      <div class="tournament-standing-team-name">Nome</div>
      <div class="tournament-standing-team-points-header">Pontos</div>
      <div class="tournament-standing-team-matches-header">P</div>
      <div class="tournament-standing-team-wins-header">V</div>
      <div class="tournament-standing-team-draws-header">E</div>
      <div class="tournament-standing-team-losses-header">D</div>
      <div class="tournament-standing-team-pointsFavor-header">PP</div>
      <div class="tournament-standing-team-pointsAgainst-header">PC</div>
      <div class="tournament-standing-team-pointsBalance-header">SC</div>
      <div class="tournament-standing-team-average-header">%</div>
    </div>
    <v-divider class="standing-divider"></v-divider>
    <div
      class="tournament-standing-team"
      v-for="(team, i) in teams"
      :key="team.id"
      :class="getTeamClass(team, i)"
    >
      <div class="tournament-standing-team-position">
        {{ getTeamPosition(team) }}
      </div>
      <img :src="team.logo" class="tournament-standing-team-logo" />
      <div class="tournament-standing-team-name">{{ team.name }}</div>
      <div class="tournament-standing-team-points">
        {{ getTeamPoints(team) }}
      </div>
      <div class="tournament-standing-team-matches">{{ team.matches }}</div>
      <div class="tournament-standing-team-wins">{{ team.wins }}</div>
      <div class="tournament-standing-team-draws">{{ team.draws }}</div>
      <div class="tournament-standing-team-losses">{{ team.losses }}</div>
      <div class="tournament-standing-team-pointsFavor">
        {{ getFormattedValue(team.pointsFavor) }}
      </div>
      <div class="tournament-standing-team-pointsAgainst">
        {{ getFormattedValue(team.pointsAgainst) }}
      </div>
      <div class="tournament-standing-team-pointsBalance">
        {{ getFormattedValue(team.pointsBalance) }}
      </div>
      <div class="tournament-standing-team-average">
        {{ getFormattedValue(team.average) }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["teams", "type", "parameters", "currentPhase"],
  data() {
    return {};
  },
  methods: {
    getTeamClass(team, index) {
      if (this.type === "resta") {
        return team.eliminated ? "red-team" : "";
      }

      if (this.type === "pontos") {
        const relegationQuantity = this.parameters.relegationQuantity;
        const classificationQuantity = this.parameters.classificationQuantity;

        if (index < classificationQuantity) {
          return "green-team";
        }

        if (index >= this.teams.length - relegationQuantity) {
          return "red-team";
        }
      }

      if (this.type === "mesclado" && this.currentPhase === "group") {
        if (index < 2) {
          return "green-team";
        }
      }
    },
    getTeamPosition(team) {
      if (this.type === "resta") {
        if (team.eliminated) {
          return "Eliminado";
        }

        return "-";
      }

      return `${team.position}º`;
    },
    getTeamPoints(team) {
      if (this.type === "resta" && team.eliminated) {
        return "-";
      }

      if (this.type === "pontos" || this.type === "mesclado") {
        return team.points;
      }

      return `${this.getFormattedValue(team.points)}`;
    },
    getFormattedValue(value) {
      if (value || value === 0) {
        return Number(value).toFixed(2);
      }

      return "-";
    },
  },
};
</script>
<style>
.tournament-standing {
  margin-top: 10px;
}

.tournament-standing-title {
  text-align: center;
}

.standing-divider {
  background-color: #777 !important;
}

.tournament-standing-team-header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  margin-top: 20px;
}

.tournament-standing-team {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  padding: 5px;
  border: 1px solid #777;
  border-top: none;
  background: #ddd;
}

.tournament-standing-team:nth-of-type(1) {
  border-top: 1px solid #777;
}

.tournament-standing-team-position {
  width: 7%;
}

.tournament-standing-team-logo {
  height: 30px;
  width: 9%;
}

.tournament-standing-team-logo-header {
  width: 9%;
  margin-left: 6px;
}

.tournament-standing-team-name {
  width: 30%;
}

.tournament-standing-team-points,
.tournament-standing-team-matches,
.tournament-standing-team-wins,
.tournament-standing-team-draws,
.tournament-standing-team-losses {
  width: 6%;
}
.tournament-standing-team-points-header,
.tournament-standing-team-matches-header,
.tournament-standing-team-wins-header,
.tournament-standing-team-draws-header,
.tournament-standing-team-losses-header {
  width: 6%;
  display: flex;
  justify-content: space-around;
}

.tournament-standing-team-pointsFavor,
.tournament-standing-team-pointsAgainst,
.tournament-standing-team-pointsBalance,
.tournament-standing-team-average {
  width: 7%;
}

.tournament-standing-team-pointsFavor-header,
.tournament-standing-team-pointsAgainst-header,
.tournament-standing-team-pointsBalance-header,
.tournament-standing-team-average-header {
  width: 7%;
}

.tournament-standing-team-average-header {
  margin-right: 6px;
}

.green-team {
  background: rgb(1, 158, 1);
  color: #eee;
}

.red-team {
  background: rgb(116, 0, 0);
  color: #eee;
}
</style>