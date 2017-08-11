import {Bundle} from './Bundle';
import {Article} from './Article';

export class Event {
  title: string;
  start: string;
  end: string;
  id?: string;
  bundles: Array<Bundle>;
  articles: Array<Article>;
}
