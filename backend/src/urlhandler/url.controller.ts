import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dtos/url.dto';


@Controller()
export class UrlController {
    constructor(private service: UrlService) { }


      @Post('shorten')
async shortenUrl(
  @Body() url: ShortenURLDto,
  @Res() res, // inject the response object
) {
  res.setHeader('Content-Type', 'application/json'); 

  const shortenedUrl = this.service.shortenUrl(url)
          .then((shortenedUrl) => {
            const shortenedUrlJson = shortenedUrl.toString();
            return res.status(200).json({shortenedUrlJson});// wrap it in an object to return a JSON object
});
         
      
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
