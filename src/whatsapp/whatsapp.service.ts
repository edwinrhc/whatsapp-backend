import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappService {

  private token: string;
  private phoneNumberId: string;
  private apiVersion: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService
    ) {

    this.token = this.config.get<string>('WHATSAPP_TOKEN');
    this.phoneNumberId = this.config.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    this.apiVersion = this.config.get<string>('WHATSAPP_API_VERSION');
  }

  async enviarMensaje(numero: string, nombre: string, fecha: string) {
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      to: numero, // ejemplo: "51949493742"
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' },
      },
    };

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };

    const response = await firstValueFrom(
      this.http.post(url, payload, { headers }),
    );

    return response.data;
  }
}
