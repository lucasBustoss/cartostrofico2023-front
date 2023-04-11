<template>
  <div class="tournament-create-form">
    <form>
      <h3 class="tournament-create-form-data-title">Dados do campeonato</h3>
      <div class="tournament-create-form-section">
        <v-col cols="5">
          <v-text-field
            v-model="tournament.name"
            label="Nome do campeonato"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="5">
          <v-text-field
            v-model="tournament.participants"
            :disabled="tournament.type === 'mesclado'"
            label="Participantes"
            required
          ></v-text-field>
        </v-col>
      </div>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <div class="tournament-create-form-section">
        <v-col cols="6">
          <v-radio-group
            v-model="tournament.type"
            label="Tipo do torneio"
            class="tournament-create-form-type"
          >
            <v-radio
              class="tournament-create-form-type-button"
              label="Pontos corridos"
              @change="changeType('group')"
              value="pontos"
              required
            ></v-radio>
            <v-radio
              class="tournament-create-form-type-button"
              label="Grupos + mata-mata"
              @change="changeType('mesclado')"
              value="mesclado"
              required
            ></v-radio>
            <v-radio
              class="tournament-create-form-type-button"
              label="Resta 1"
              @change="changeType('resta')"
              value="resta"
              required
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="6">
          <div class="tournament-create-form-awards">
            <v-text-field
              v-for="(award, i) in tournament.awards"
              :key="i"
              :label="'Premiação para o ' + Number(i + 1) + 'º lugar'"
              v-model="award.award"
              required
            ></v-text-field>
          </div>
        </v-col>
      </div>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <h3 class="tournament-create-form-parameters-title">Parâmetros</h3>
      <div class="tournament-create-form-parameters">
        <v-col cols="7">
          <v-text-field
            v-model="tournament.parameters.drawOffset"
            label="Limite para empate (entre 0.00 e 99.99)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-if="tournament.type === 'pontos'"
            v-model="tournament.parameters.relegationQuantity"
            label="Quantidade de times rebaixados"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-if="tournament.type === 'pontos'"
            v-model="tournament.parameters.classificationQuantity"
            label="Quantidade de times que classificam para a Libertadores"
            required
          ></v-text-field>
        </v-col>
      </div>

      <div
        v-if="
          tournament.type === 'mesclado' &&
          tournament.parameters &&
          tournament.parameters.correspondentRounds
        "
      >
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>

        <h3 class="tournament-create-form-correspondent-title">
          Rodadas de correspondência
        </h3>

        <h6>
          Selecione as rodadas do cartola que computarão pontos para o torneio
        </h6>
        <div class="tournament-create-form-section-corresponding">
          <v-col cols="2">
            <h6>Fase de grupos</h6>
            <v-text-field
              v-for="(round, i) in getCorrespondentRounds('group')"
              :key="i"
              v-model="round.correspondent"
              :label="'Rodada ' + Number(i + 1)"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <h6>Quartas de final</h6>
            <v-text-field
              v-for="(round, i) in getCorrespondentRounds('quarter')"
              :key="i"
              v-model="round.correspondent"
              :label="'Jogo ' + Number(i + 1)"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <h6>Semifinal</h6>
            <v-text-field
              v-for="(round, i) in getCorrespondentRounds('semi')"
              :key="i"
              v-model="round.correspondent"
              :label="'Jogo ' + Number(i + 1)"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <h6>Final</h6>
            <v-text-field
              v-for="(round, i) in getCorrespondentRounds('final')"
              :key="i"
              v-model="round.correspondent"
              :label="'Jogo ' + Number(i + 1)"
              required
            ></v-text-field>
          </v-col>
        </div>
      </div>
    </form>

    <v-btn
      class="tournament-create-form-button"
      :loading="loadingCreate"
      @click="save"
      >Cadastrar</v-btn
    >
  </div>
</template>
<script>
export default {
  props: ["loadingCreate"],
  data() {
    return {
      tournament: {
        type: "pontos",
        awards: [
          { position: 1, award: "" },
          { position: 2, award: "" },
          { position: 3, award: "" },
          { position: 4, award: "" },
        ],
        parameters: {
          drawOffset: null,
          relegationQuantity: null,
          classificationQuantity: null,
          correspondentRounds: null,
        },
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", this.tournament);
    },
    changeType(type) {
      if (type === "mesclado") {
        this.tournament.participants = 16;
        this.tournament.parameters.correspondentRounds = [
          {
            phase: "group",
            round: 1,
            correspondent: null,
          },
          {
            phase: "group",
            round: 2,
            correspondent: null,
          },
          {
            phase: "group",
            round: 3,
            correspondent: null,
          },
          {
            phase: "group",
            round: 4,
            correspondent: null,
          },
          {
            phase: "group",
            round: 5,
            correspondent: null,
          },
          {
            phase: "group",
            round: 6,
            correspondent: null,
          },
          {
            phase: "quarter",
            round: 1,
            correspondent: null,
          },
          {
            phase: "quarter",
            round: 2,
            correspondent: null,
          },
          {
            phase: "semi",
            round: 1,
            correspondent: null,
          },
          {
            phase: "semi",
            round: 2,
            correspondent: null,
          },
          {
            phase: "final",
            round: 1,
            correspondent: null,
          },
          {
            phase: "final",
            round: 2,
            correspondent: null,
          },
        ];
      } else {
        this.tournament.participants = null;
        this.tournament.parameters.correspondentRounds = null;
      }
    },
    getCorrespondentRounds(phase) {
      if (this.tournament.parameters.correspondentRounds) {
        return this.tournament.parameters.correspondentRounds.filter(
          (cr) => cr.phase === phase
        );
      }
    },
  },
};
</script>
<style>
.tournament-create-form {
  display: flex;
  flex-direction: column;
}

.tournament-create-form-button {
  margin-top: 30px;
  margin-bottom: 30px;
}

.tournament-create-form-section {
  display: flex;
  justify-content: space-between;
}

.tournament-create-form-type {
  display: flex !important;
  flex-direction: row !important;
}

.tournament-create-form-type-button {
  margin-top: 30px;
}

.tournament-create-form-awards {
  width: 100% !important;
}

.tournament-create-form-parameters-title,
.tournament-create-form-correspondent-title {
  margin-top: 30px;
}

.tournament-create-form-parameters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tournament-create-form-section-corresponding {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>