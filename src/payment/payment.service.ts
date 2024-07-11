import { Injectable } from '@nestjs/common'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'

@Injectable()
export class PaymentService {
  async mercadoPago() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_TOKEN,
      options: {
        timeout: 5000,
      },
    })

    const body: PreferenceRequest = {
      items: [
        {
          id: '123',
          title: 'test product',
          quantity: 1,
          unit_price: 1,
          currency_id: 'CLP',
        },
        {
          id: '1234',
          title: 'test product 2',
          quantity: 1,
          unit_price: 1,
          currency_id: 'CLP',
        },
      ],
      back_urls: {
        success: 'https://www.sekaidev.com',
        failure: 'https://www.sekaidev.com',
        pending: 'https://www.sekaidev.com',
      },
      auto_return: 'approved',
      additional_info: 'title',
    }

    try {
      const preference = await new Preference(client).create({ body })
      return { redirectUrl: preference.init_point }
    } catch (error) {
      return error
    }
    // const payment = new Payment(client)

    // const body = {
    //   transaction_amount: 12.34,
    //   description: '<DESCRIPTION>',
    //   payment_method_id: '<PAYMENT_METHOD_ID>',
    //   payer: {
    //     email: '<EMAIL>',
    //   },
    // }
    // payment.create({ body }).then(console.log).catch(console.log)
  }
}
