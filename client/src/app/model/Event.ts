import {Bundle} from './Bundle';


export class Event {
  title: string;
  start: string;
  end: string;
  id?: string;
  bundles: Array<Bundle>;
}
