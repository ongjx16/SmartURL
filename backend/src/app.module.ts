import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './urlhandler/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './urlhandler/url.entity';

@Module({
  //connecting app to sqlite database
  imports: [TypeOrmModule.forRoot({
    //type of datavase
    type: 'sqlite',
    //name of database
    database: 'AllURLs.sqlite',
    //entities in project
    entities: [Url],
    //automatically sync your database tables with your entity and updates the tables each time you run the code
    //need to set false in production as it could cause data loss
    synchronize: true,
  }), UrlModule,],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
