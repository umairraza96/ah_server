import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { sendResponse } from 'src/helpers/response.helper';
import { message } from 'src/helpers/response.message';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Auth()
  @Get()
  async findAll(@GetCurrentUser() user: JWTPayload) {
    const data = await this.orderService.findAll(user);
    return sendResponse({
      status_code: HttpStatus.OK,
      data,
      message: message.ORDER_GET_ALL_SUCCESS,
    });
  }
}
