import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategyService } from './users/auth/jwt-strategy/jwt-strategy.service';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth-nest-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyService],
})
export class AppModule { }
