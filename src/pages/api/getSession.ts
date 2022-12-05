import { prisma } from '../../lib/prisma';

export default async function getSession(request: any): Promise<any> {
  const cookie = request.req.cookies.session;
  let session;

  if (cookie) {
    const account = await prisma.account.findUnique({
      where: {
        username: JSON.parse(cookie).username,
      },
    });
    if (account) {
      session = JSON.parse(cookie);
    }
  }

  return session;
}
