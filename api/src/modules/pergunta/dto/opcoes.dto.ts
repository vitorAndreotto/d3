import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OpcaoDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;
  
    @IsString()
    @IsNotEmpty()
    label: string;
  }