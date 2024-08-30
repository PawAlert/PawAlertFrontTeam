<template>
  <v-container class="mainview2" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="video-container">
        <video autoplay muted loop controls width="100%">
          <source src="https://cdn.animaapp.com/projects/60d876f00b85a9c710f9b3a3/files/pexels-yaroslav-shuraev-9632184.mp4" type="video/mp4" />
        </video>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .mainview2 {
    background-color: #F2FAF8;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
