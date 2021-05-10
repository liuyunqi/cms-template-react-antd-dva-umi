import { FetchAgent } from '@/public/services';
import conf from '../config';
import { getOrgTreeNodeByLevelType } from '../type';

export default {
  /**
   * 根据级别查询对应组织树形结构信息
   */
  getOrgTreeNodeByLevel: (data: getOrgTreeNodeByLevelType) =>
    FetchAgent.sendPost({
      url: `${conf.getSSOUrl}fire/fire-sso/api/OrgService/getOrgTreeNodeByLevel`,
      submitDataType: 'json',
      body: data,
    }),
};
