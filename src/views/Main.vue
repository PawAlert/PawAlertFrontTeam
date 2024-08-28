<template>
  <div>

  </div>
</template>

<script>
import {profile} from "@/api/api_auth";

export default {
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
