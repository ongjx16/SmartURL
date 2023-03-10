import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    urlCode: string;
    //the unique id geneated by the nanoid package, used to identify each url

    @Column()
    longUrl: string;

    @Column()
    shortUrl: string;
}