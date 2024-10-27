import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
async  create(createUserDto: CreateUserDto,profilePhoto: string):Promise<User> {
    const  user= await this.userRepository.create({...createUserDto,createAt:new Date(),photo:profilePhoto})
    
    return this.userRepository.save(user);
  }

  // async findAll(): Promise<User[]> {
  //   try {
  //     // Vous pouvez spécifier un ordre si vous le souhaitez, par exemple par date de création
  //     return await this.userRepository.find();
  //   }  catch (error) {
  //     throw new InternalServerErrorException('Impossible de récupérer les utilisateurs');
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
