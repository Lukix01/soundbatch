import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
const CryptoJS = require('crypto-js');

type ResponseData = {
  msg: string;
};

export default async function AccountsHandler(request: NextApiRequest, response: NextApiResponse<ResponseData>): Promise<void> {
  const { method, body, query } = request;

  switch (method) {
    case 'POST':
      try {
        await prisma.account.create({ data: {
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
          password: CryptoJS.AES.encrypt(body.password, process.env.SECRET_KEY).toString(),
        } });
      } catch (error) {
        console.error(error);
        return response.status(400).json({ msg: 'Account already exists.' });
      }

      return response.status(200).json({ msg: 'Successfully created an account!' });

    case 'GET':
      try {
        const account = await prisma.account.findUnique({
          where: {
            username: query.username,
          },
          include: {
            favorites: true,
          },
        });
        if (account) {
          const decryptedPassword: string = CryptoJS.AES.decrypt(account.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

          const validation: boolean = decryptedPassword === query.password;

          if (validation) {
            response.status(200).json(account);
          } else {
            response.status(400).json({ msg: 'Authorization failed. Wrong password.' });
          }
        } else {
          response.status(400).json({ msg: 'Account not found.' });
        }
      } catch (error) {
        console.error(error);
      }
  }
}
