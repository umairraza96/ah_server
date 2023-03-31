import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderItemDTO {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderDTO {
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  phone_no: string;

  @IsString()
  @IsOptional()
  alt_phone: string;

  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  order_items: OrderItemDTO[];
}
