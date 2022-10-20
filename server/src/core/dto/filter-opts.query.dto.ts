import { Query, ValidationPipe } from "@nestjs/common";
import { IsOptional, Max, Min } from "class-validator";

export class FilterOptsQueryDto {
  @IsOptional()
  @Min(1)
  @Max(1000)
  limit: number;

  @IsOptional()
  @Min(0)
  skip: number;
}

export const FilterOptsQuery = () => Query(new ValidationPipe({
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
}));
