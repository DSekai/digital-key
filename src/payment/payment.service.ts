import { Injectable } from '@nestjs/common'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

@Injectable()
export class PaymentService {
  async mercadoPago() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_TOKEN,
      options: {
        timeout: 5000,
      },
    })

    const preference = {
      item: [
        {
          title: 'algo',
          unit_price: 100,
          quantity: 1,
        },
      ],
    }

    const payment = new Payment(client)

    const body = {
      transaction_amount: 12.34,
      description: '<DESCRIPTION>',
      payment_method_id: '<PAYMENT_METHOD_ID>',
      payer: {
        email: '<EMAIL>',
      },
    }
    payment.create({ body }).then(console.log).catch(console.log)
  }
}
