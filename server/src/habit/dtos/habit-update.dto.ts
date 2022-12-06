import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HabitUpdateDto {
  @ApiProperty({
    type: 'string',
    description: '습관 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  title: string;

  @ApiProperty({
    type: 'string',
    description: '습관 설명',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: '습관 종료 일시',
    required: true,
  })
  @Type(() => Date || undefined)
  endDate?: Date;
}
