import { Controller, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('mercadopago')
  mercadoPago() {
    // return this.paymentService.mercadoPago()
    return { message: 'not avalible' }
  }
}
