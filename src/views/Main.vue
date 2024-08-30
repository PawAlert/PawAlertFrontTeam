<template>

  <MainView_1 class="mainview1"/>
  <MainView_2 class="mainview2"/>
  <MainView_4 class="mainview4" />

  <MainView_3 class="mainview3"/>
  <MainView_5 class="mainview5"/>

</template>

<script>
import {profile} from "@/api/api_auth";
import MainView_1 from "@/components/layout/MainView_1.vue";
import MainView_2 from "@/components/layout/MainView_2.vue";
import MainView_3 from "@/components/layout/MainView_3.vue";
import MainView_4 from "@/components/layout/MainView_4.vue";
import MainView_5 from "@/components/layout/MainView_5.vue";


export default {
  components: {MainView_5, MainView_4, MainView_3, MainView_2, MainView_1},

  data() {
    return {
      user: null
    }
  },
  async created() {
    try {
      const response = await profile();
      this.user = response
      console.log('사용자 정보:', response);
    } catch (error) {
      console.error('에러 발생:', error.response?.data || error.message);
    }
  }
}


</script>

<style lang="scss" scoped>
.mainview1 {
  background-color: #F7F5FD;
}

.mainview2 {
  background-color: #F2FAF8;
  height: 600px;
}

.mainview3 {
  background-color: #FFFFFF;
}
.mainview4 {
  background-color: #FFFFFF;
}
.mainview5{
  background-color: #FCFAF5;
}
@media (max-width: 1020px) {
  .mainview4 {
    display: none;
  }
}
</style>