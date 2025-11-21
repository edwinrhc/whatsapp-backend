import { Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly ws: WhatsappService) {}

  @Post('enviar')
  async enviar(@Body() body: { numero: string, nombre: string, fechaPago: string }) {
    return this.ws.enviarMensaje(body.numero, body.nombre, body.fechaPago);
  }
}
