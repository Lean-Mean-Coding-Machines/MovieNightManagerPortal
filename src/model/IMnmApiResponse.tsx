import IResponseStatus from './IApiResponseStatus';

export default interface IMnmApiResponse<T> {
  data?: T | null;
  status: IResponseStatus;
}
