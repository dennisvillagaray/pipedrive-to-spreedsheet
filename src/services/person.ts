import { post, get } from './../api';

export const create = async (params: any) => {
  const response = await post('persons', {
    name: params.name,
    email: params.email,
    phone: params.phone,
    org_id: params.organizationId
  });
  return response.data;
}


export const find = async (email: string) => {
  try {
    const response = await get('persons/search', {
      term: email
    });
    if (response.succes) {
      const { items } = response.data;
      if (items && items.length === 0) {
        return null;
      }

      const personFound = items.find((obj: any) => {
        if (!obj || !obj.item) {
          return false;
        }
        return obj.item.emails.find((e: string) => e.toLowerCase() === email.toLowerCase());
      });
      return personFound && personFound.item || null;
    }
  } catch (error) {
    console.error('Denn ~ findPerson ~> error', error)
  }
  return null;
}