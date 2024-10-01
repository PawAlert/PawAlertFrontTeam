import {defineStore} from "pinia";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {otherUserEmail} from "@/api/api_auth";

export const useChatStore = defineStore('chat', {
    state: () => ({
        senderId: "", // 보내는 사람
        receiverId: "", // 받는 사람
        message: "", // 현재 입력 중인 메시지
        messages: [], // 주고받은 메시지 목록을 저장하는 배열
        connected: false, // WebSocket 연결 상태 플래그
        stompClient: null, // STOMP 클라이언트 인스턴스
        isSubscribed: false, // 구독 여부 확인
        otherEmail: '', // 사용자 이메일
        weChatRoomId: '',
    }),

    actions: {

        setSenderId(id) {
            this.senderId = id;
        },
        setReceiverId(id) {
            this.receiverId = id;
        },
        setMessage(msg) {
            this.message = msg;
        },

        async otherUserEmail(uid) {
            try {
                this.otherEmail = await otherUserEmail(uid);
            } catch (error) {
                this.error = error.message;
            }
        },
        // WebSocket 연결 메서드
        async connect() {
            if (this.connected) {
                console.log("이미 연결되어 있습니다.");
                return;
            }

            return new Promise((resolve, reject) => {
                // SocketJS 클라이언트를 통해 WebSocket 연결 초기화
                const socket = new SockJS('http://localhost:8080/ws');
                this.stompClient = Stomp.over(socket);

                // STOMP 클라이언트로 서버와 연결 시도
                this.stompClient.connect({}, (frame) => {
                    console.log("연결 성공: " + frame);
                    this.connected = true;

                    // 구독이 중복되지 않도록 확인
                    if (!this.isSubscribed) {
                        // 채팅방 ID 생성
                        const chatRoomId = this.generateChatRoomId(this.senderId ,this.receiverId);
                        console.log("채팅방 ID: " + chatRoomId);
                        this.weChatRoomId = chatRoomId;
                        console.log("weChatRoomId 아이디 = ", this.weChatRoomId)
                        // STOMP 클라이언트로 특정 채팅방에 구독
                        this.stompClient.subscribe(`/topic/chat/${chatRoomId}`, (messageOutput) => {
                            const receivedMessage = JSON.parse(messageOutput.body);
                            // 수신된 메시지를 messages 배열에 추가
                            this.messages.push(receivedMessage);
                            console.log("수신한 메시지: ", receivedMessage);
                        });

                        this.isSubscribed = true; // 구독 완료
                    }

                    resolve(); // 연결 성공 시 Promise 해결
                }, (error) => {
                    console.log("연결 실패: ", error);
                    this.connected = false; // 연결 실패 시 상태 변경
                    reject(error); // 연결 실패 시 Promise 거부
                });
            });
        },

        // 메시지 전송 메서드
        async sendMessage() {
            // 메시지가 비어있을 경우 전송하지 않음
            if (this.message.trim() === '') return;

            // 연결이 안 되어 있을 경우 연결 시도
            if (!this.connected) {
                try {
                    await this.connect(); // WebSocket 연결 시도
                } catch (error) {
                    console.log("메시지 전송 실패: ", error);
                    return;
                }
            }

            // 전송할 메시지 데이터
            const messageData = {
                senderId: this.senderId, // 보내는 사람 ID
                receiverId: this.receiverId, // 받는 사람 ID
                message: this.message // 메시지 내용
            };

            console.log("보낸 메시지: ", messageData);
            // STOMP 클라이언트를 통해 메시지 전송
            this.stompClient.send(`/app/chat/${this.receiverId}`, {}, JSON.stringify(messageData));
            // 메시지 전송 후 입력 필드 초기화
            this.message = '';
        },

        // 채팅방 ID 생성 메서드
        generateChatRoomId(user1Id, user2Id) {
            return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
        }
    }
});
