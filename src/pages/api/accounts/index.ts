import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
const bcrypt = require('bcrypt');

export default async function Handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  const { method, body } = request;

  switch (method) {
    case 'POST':
      await prisma.account.create({ data: {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: await bcrypt.hash(body.password, 10),
      } });

      return response.status(201).json({ msg: 'success' });
  }
}
