import {IsNotEmpty } from "class-validator";

 export class UsersDTO{
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: string;
}