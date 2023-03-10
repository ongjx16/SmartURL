import { IsString, IsNotEmpty } from 'class-validator';

//create data transfer object
export class ShortenURLDto {
    //ensure tha longUrl is always a string and is not empty
    @IsString()
    @IsNotEmpty()
    longUrl: string;
}