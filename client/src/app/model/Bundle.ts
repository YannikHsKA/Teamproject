import {Article} from './Article';

export class Bundle {
  id?: number;
  title: string;
  description: string;
  smartscore: string;
  articles: Array<Article>;
  discount: String;
  theme:number;
}
