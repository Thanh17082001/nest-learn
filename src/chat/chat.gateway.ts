// src/chat/chat.gateway.ts
import { UseGuards } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthGuard } from "src/guard/auth";
import { ChatAuth } from "src/guard/chat.auth";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(server);
    console.log("Socket server initialized");
  }
  @UseGuards(ChatAuth)
  async handleConnection(client: Socket) {
    client.data.user = client.handshake.auth;
  }
  @UseGuards(ChatAuth)
  @SubscribeMessage("join")
  async handleJoin(@MessageBody() data: { peerId: string }, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.data.user);
    const userId = client.data.user.userId;
    const room = this.getRoomId(userId, data.peerId);
    client.join(room);
    client.emit("joined", room);
  }
  @UseGuards(ChatAuth)
  @SubscribeMessage("message")
  async handleMessage(@MessageBody() data: { peerId: string; message: string }, @ConnectedSocket() client: Socket): Promise<void> {
    const userId = client.data.user.userId;
    const room = this.getRoomId(userId, data.peerId);
    console.log(room);
    const mes = {
      avt: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg",
      mes: data.message,
      userId,
    };
    this.server.to(room).emit("message", mes)

    // Optionally, store the message in a persistent storage
    // await this.messageService.saveMessage(userId, data.peerId, data.message);
  }

  getRoomId(userId: string, peerId: string): string {
    return [userId, peerId].sort().join("-");
  }
}
