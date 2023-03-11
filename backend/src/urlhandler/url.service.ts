import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { ShortenURLDto } from './dtos/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {
  constructor(
    //edits the repo variable to pass Url as an argument, so that all database queries will call Url
    @InjectRepository(Url)
    private repo: Repository<Url>,
  ) { }

  //method that handles logic to shorten url
  async shortenUrl(url: ShortenURLDto) {
    const { longUrl } = url;

    //checks if longurl is a valid URL
    if (!isURL(longUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    //generates a unique string of 10 characters
    const urlCode = nanoid(10);

    //baseurl is localhost if nestjs api is not deployed
    const baseURL = 'https://u.jing-xuanxuan2.repl.co';

    try {
      //check if the URL has already been shortened (if it exists in the database)
      let url = await this.repo.findOneBy({ longUrl });
      //return it if it exists
      if (url) return url.shortUrl;

      //if not found,can shorten it
      const shortUrl = `${baseURL}/${urlCode}`;

      //add new record to database
      url = this.repo.create({
        urlCode,
        longUrl,
        shortUrl,
      });

      //save record in database
      this.repo.save(url);
      return url.shortUrl;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }
  async redirect(urlCode: string) {
    try {
      const url = await this.repo.findOneBy({ urlCode });
      if (url) return url;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource Not Found');
    }
  }
}
