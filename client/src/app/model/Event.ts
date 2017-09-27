import {Bundle} from './Bundle';
import {Notification} from './Notification';


export class Event {
  title: string;
  id?: string;
  cweek: string;
  bundles: Array<Bundle>;
  notifications: Array<Notification>;
}
