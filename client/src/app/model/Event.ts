import {Bundle} from './Bundle';
import {Notification} from './Notification';


export class Event {
  title: string;
  start: string;
  end: string;
  id?: string;
  cweek: number;
  bundles: Array<Bundle>;
  notifications: Array<Notification>;
}
