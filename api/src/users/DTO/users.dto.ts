import {IsNotEmpty, Length } from "class-validator";
import { Unique } from "typeorm";

 export class UsersDTO{
    id: number;

    @IsNotEmpty()
    @Length(1, 50)
    name: string;

    @IsNotEmpty()
    @Length(5, 10)
    password: string;

    @IsNotEmpty()
    role: string;
}