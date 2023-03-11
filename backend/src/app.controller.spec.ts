import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlController } from './urlhandler/url.controller';
import { UrlService } from './urlhandler/url.service';
import { Url } from './urlhandler/url.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AppModule } from './app.module';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Repository, FindOneOptions } from 'typeorm';
import { BadRequestException} from '@nestjs/common';


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

describe('URL Controller', () => {
  let controller: UrlController;
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService],
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
      }), TypeOrmModule.forFeature([Url]),],
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

  //test cases for post request
  describe('POST /shorten', () => {

    //unit test case to see if it can return a shortened url when a valid long url is given
    it('should return a shortened url', async () => {
      const data = { longUrl: 'https://sg.yahoo.com/?p=us&guccounter=1' };

      const mockRes = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedJSONResponse =
        { shortenedUrlJson: expect.any(String) };

      jest.spyOn(service, 'shortenUrl').mockResolvedValueOnce(JSON.stringify(expectedJSONResponse));

      const result = await controller.shortenUrl(data, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(expectedJSONResponse);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    //unit test case to see if it can catch invalid links
    it('should return error if invalidurl', async () => {
      const mockUrl = {
        longUrl: 'not_a_valid_url'
      };
      try {
        await service.shortenUrl(mockUrl);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('String Must be a Valid URL');
      }
    });

    

    
  });
});
