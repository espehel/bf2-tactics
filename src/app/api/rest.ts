import { CreateSpaceBody, Space } from '../../types/communication';

export const postSpacesCreate = async (
  body: CreateSpaceBody
): Promise<Space> => {
  const response = await fetch('spaces/create', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getSpaces = async (): Promise<Array<Space>> => {
  const response = await fetch('spaces');
  return response.json();
};
