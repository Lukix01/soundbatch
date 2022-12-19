import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

type ResponseData = {
  msg: string;
};

export default async function FavoritesHandler(request: NextApiRequest, response: NextApiResponse<ResponseData>): Promise<void> {
  const { method, body } = request;

  switch (method) {
    case 'POST':
      try {
        await prisma.account.update({
          where: {
            username: body.sessionUsername,
          },
          data: {
            favorites: {
              create: {
                sound: {
                  connect: {
                    id: body.id,
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

      return response.status(200).json({ msg: 'Successfully added sound to favorites!' });
    case 'DELETE':
      try {
        await prisma.favorites.deleteMany({
          where: {
            soundId: body.id,
            account: {
              username: body.sessionUsername,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

      return response.status(200).json({ msg: 'Successfully removed sound from favorites!' });
  }
}
