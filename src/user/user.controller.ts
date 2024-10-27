import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer'; // Importation du type
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(
    FileInterceptor('photo',{
      storage:diskStorage({
        destination:"./uploads",
        filename:(req,file,callback)=>{
          const uniqueSuffix=Date.now()+'-' +Math.round(Math.random()*1e9);
          const ext=extname(file.originalname);
          callback(null,`${file.fieldname}-${uniqueSuffix}${ext}`);

        }
      })
    })
  )
  @Post()

  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const photoPath = file ? file.path : null;
    return this.userService.create(createUserDto, photoPath);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
