import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm"
import { User } from './user/entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule,ConfigModule.forRoot(),
    TypeOrmModule.forRoot({  type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.PORT_BD) || 3000,
      username: 'root',
      password: '',
      database: 'gestionEvele',
      entities: [User],
      synchronize: false, // Désactivez ceci
    }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'), // Dossier pour les photos
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
