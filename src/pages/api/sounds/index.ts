import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function SoundsHandler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  const { method, body } = request;

  switch (method) {
    case 'PUT':
      try {
        await prisma.sound.update({
          where: {
            name: body.name,
          },
          data: {
            downloads: {
              increment: 1,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }

      response.status(200).json({ msg: 'Sound download' });
  }
}
