import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dtos/url.dto';


@Controller()
export class UrlController {
    constructor(private service: UrlService) { }

    //handl post requests to localhost:3000/shorten
    @Post('shorten')
    shortenUrl(
        //take in argument of url with type ShortenURLDto
        //body decorator will extract the body object and populate the url variable
        @Body()
        url: ShortenURLDto,
    ) {
        return this.service.shortenUrl(url);
    }

    //handle get requests to localhost://

    @Get(':code')
    async redirect(
        //parameter res. allow Express library's redirect method
        @Res() res,
        //extracts params from req object and populate the code variable
        @Param('code')
        code: string,
    ) {

        //call redirect method from service and wait for result, then store in variable
        const url = await this.service.redirect(code);

        return res.redirect(url.longUrl);
    }
}
