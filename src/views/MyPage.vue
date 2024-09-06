<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list>
          <!-- 왼쪽 리스트 배치 -->
          <v-list>
            <v-list-item @click="router.push({name: 'Animal'})"npm run serve>
              <v-card-text >
                동물병원 HOME
              </v-card-text>
            </v-list-item>
            <v-list-item @click="router.push({name: 'Shelter'})">
              <v-card-text>
                보호센터 HOME
              </v-card-text>
            </v-list-item>
            <v-list-item @click="router.push({name: 'MyPage'})">
              <v-card-text>
                마이페이지

              </v-card-text>
            </v-list-item>
            <v-list-item>
            </v-list-item>
          </v-list>
        </v-list>
      </v-col>
      <v-col>
        <!-- 나머지 콘텐츠 배치 -->
        <v-row>
          <v-col>
            <h1>setting</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text>
              이미지
              <v-btn>
                이미지 수정
              </v-btn>
            </v-card-text>
            <v-card-text>
              유저 이메일
            </v-card-text>
            <v-card-text>
              유저이름
              <v-btn>
                이름 수정
              </v-btn>
            </v-card-text>
            <v-card-text>
              유저 휴대폰 번호
              <v-btn>
                번호변경
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-link {
  color: #1976D2; /* 버튼처럼 보이게 할 색상 */
  cursor: pointer; /* 마우스 포인터를 손 모양으로 변경 */
  text-decoration: underline; /* 밑줄 추가 */
}

.text-link:hover {
  color: #155A8A; /* 호버 시 색상 변경 */
}

.text-link:active {
  color: #0D47A1; /* 클릭 시 색상 변경 */
}
</style>
