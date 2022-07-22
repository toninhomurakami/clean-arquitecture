import { NotificationDataError } from './notification';

export default class NotificationError extends Error {
    constructor(public errors: NotificationDataError[]) {
      super(
        errors.map((error) => `${error.context}: ${error.message}`).join(",")
      );
    }
  }