import { StatusNotification } from '../../service/completeService';

interface Options {
  message: string;
  statusCode: string;
  token: string;
  status: StatusNotification;
}

export interface Message {
  data: {
    login: Options;
    createNewuser: Options;
    resetUser: Options;
    loading: boolean;
    error: boolean;
  };
}
