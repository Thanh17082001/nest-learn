import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Request } from "express";

@Injectable()
export class ChatAuth implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const client = context.switchToWs().getClient() 
    const token = this.extractTokenFromHeader(request) || client.handshake?.auth.token || undefined;
    if (!token) {
      throw new WsException('Please log in again');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JwtSecret,
      });
       client.data.user = payload;
    } catch (e) {
      throw new WsException('Please log in again');
    }
    return true;
  }
  // lấy token từ header request
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
