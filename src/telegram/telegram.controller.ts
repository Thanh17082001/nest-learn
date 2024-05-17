import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ApiTags } from '@nestjs/swagger';
import * as TelegramBot from "node-telegram-bot-api";

@Controller('telegram')
@ApiTags('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }
  @Post('/send-message')
  sendMessage(@Body() data: any) {
    const token = '6913832053:AAGEYkRbX_xReO5IUVSkyA-XaMmutcAKNOM'
    const bot = new TelegramBot(token, { polling: false });
    const chatId = "7159633791";

    bot.sendMessage(chatId, "Có đơn hàng mới");
  }
  
}
