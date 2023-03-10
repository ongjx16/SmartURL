import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';

@Injectable()
export class UrlService {
    constructor(
        //edits the repo variable to pass Url as an argument, so that all database queries will call Url
        @InjectRepository(Url)
        private repo: Repository<Url>,
      ) {}
}
