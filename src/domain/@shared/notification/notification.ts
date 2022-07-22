export type NotificationDataError = {
    message: string;
    context: string;
  };
  
  export default class Notification {
    private errors: NotificationDataError[] = [];
  
    addError(error: NotificationDataError) {
      this.errors.push(error);
    }

    hasErros() {
      return this.errors.length > 0;
    }

    getErrors() {
      return this.errors;
    }
  
    messages(context?: string): string {
      let message = "";
      this.errors.forEach((error) => {
        if (context === undefined || error.context === context) {
          message += `${error.context}: ${error.message},`;
        }
      });
      return message;
    }
  }
  