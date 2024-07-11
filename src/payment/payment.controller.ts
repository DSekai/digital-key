import { Controller, Post } from '@nestjs/common'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  mercadoPago() {
    return this.paymentService.mercadoPago()
  }
}
