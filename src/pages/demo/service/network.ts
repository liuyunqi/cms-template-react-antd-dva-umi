import { FetchAgent } from '@/public/services/';

import ApiConfig from '../config/api';

export default {};
export const postCreate = async (params: any): Promise<any> => {
  return FetchAgent.sendPost({
    url: `${ApiConfig.getApiPrefix}/labs/CountryService/create`,
    body: params,
  });
};
