<template>
  <div class="auth-info">
    <div class="auth-info-content">
      <img class="auth-info-image" src="https://www.webcup.com.br/static/images/league/200x200/campeonato-brasileiro-cartostrofico-2021-1622294513.jpg">
        <div class="auth-info-text">
          Cartostrófico 2023
        </div>
        <div>
          Desde 2019
        </div>
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
.auth-info {
  display: flex;
  flex-direction: column;
  background: #2c2922;
  color: #fff;
  height: 100vh;
  text-align: center;
  justify-content: center;
  font-size: 2rem;
}

.auth-info-content {
  margin-bottom: 100px;
}

.auth-info-image {
  width: auto;
  vertical-align: bottom; /* <-- fix the vertical gap */
}

.auth-info-text {
  margin-top: 50px;
}

</style>