import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderMapper } from '../mapper/order.mapper';
import { Order } from '../domain/order.domain';
import { OrderDTO } from '../dto/order.dto';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { CustomerService } from 'src/customers/service/customer.service';
import { UpdateOrderDTO } from '../dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly orderMapper: OrderMapper,
  ) {}

  @Get()
  async getAllOrders(): Promise<OrderDTO[]> {
    const allOrders: Order[] = await this.orderService.getAllOrders();
    return allOrders.map((order) => this.orderMapper.mapOrderToOrderDTO(order));
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<OrderDTO> {
    const order: Order = await this.orderService.getOrderById(id);
    return this.orderMapper.mapOrderToOrderDTO(order);
  }

  @Post()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    const customer = await this.customerService.getCustomerById(
      createOrderDTO.customer,
    );
    return await this.orderService.createOrder(
      this.orderMapper.mapCreateOrderDTOToOrder(createOrderDTO, customer),
    );
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<Order> {
    const customer = await this.customerService.getCustomerById(
      updateOrderDTO.customer,
    );
    return await this.orderService.updateOrder(
      id,
      this.orderMapper.mapUpdateOrderDTOToOrder(updateOrderDTO, customer),
    );
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: string) {
    await this.orderService.removeOrder(id);
  }
}
