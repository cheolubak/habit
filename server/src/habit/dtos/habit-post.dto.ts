import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class HabitPostDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date || undefined)
  startDate: Date;

  @Type(() => Date || undefined)
  endDate?: Date;
}
