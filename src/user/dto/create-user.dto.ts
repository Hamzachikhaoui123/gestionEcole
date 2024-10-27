import { USERROLE } from "src/Enum/enum";

export class CreateUserDto {
    name:string;
    date:number;
    photo:string;
    role:USERROLE

}
