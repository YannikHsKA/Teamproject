import {Article} from './Article';

export class Bundle {
  id: number;
  title: string;
  description: string;
  picture: string;
  articles: Array<Article>;
}
