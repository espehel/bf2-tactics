import { CreateSpaceBody, Space } from '../../types/communication';

export const createSpace = async (body: CreateSpaceBody): Promise<Space> => {
  const response = await fetch('spaces/create', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
