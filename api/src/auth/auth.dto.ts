import { IsNotEmpty } from 'class-validator';
export class ProfileDto {
  @IsNotEmpty()
  name: string;
  password?: string
}