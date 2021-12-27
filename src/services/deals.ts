import { owner, Stage } from './../config';
import { post } from './../api';

export const create = async (params: any) => {
  const body = {
    '8fee4a462330fdad130c8dc4b99f84fa7b059d45': params.utm_source,
    '62add943d669c0eb15268778d8d69db1046db8f7': params.product,
    '8b74df1aef1b033de1da33d7f1689800b7fa1889': params.origin,
    title: params.title,
    visible_to: '3',
    person_id: params.personId,
    stage_id: Stage[params.funnel],
    user_id: owner[params.product]
  }
  const response = await post('deals', body);
  return response.data;
}