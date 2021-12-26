import { post, get } from './../api';
import { owner } from './../config';

export const create = async (params: any) => {
  const response = await post('organizations', {
    name: params.name,
    visible_to: '3',
    owner_id: owner[params.product]
  });
  return response.data;
}

export const find = async (name: string) => {
  try {
    const response = await get('organizations/search', {
      term: name
    });

    if (response.success) {
      const { items } = response.data;
      if (items && items.length === 0) {
        return null;
      };
      const orgFound = items.find((obj: any) => {
        if (!obj || obj.item) {
          return false;
        }
        return obj.item.name.toLowerCase() === name.toLowerCase();
      });
      return (orgFound && orgFound.item) || null;
    }
  } catch (error) {
    console.error('Denn ~ findOrganization ~> error', error)
  }
  return null;
}