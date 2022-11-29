import { readdirSync } from 'node:fs';
import path from 'node:path';
import { Sound } from '@prisma/client';
import { prisma } from '../src/lib/prisma';

async function main(): Promise<void> {
  await prisma.type.createMany({
    data: [
      {
        name: 'Guitar',
      },
      {
        name: '808',
      },
      {
        name: 'Bassline',
      },
      {
        name: 'Piano',
      },
      {
        name: 'Drums',
      },
    ],
  });

  const soundTypes = await prisma.type.findMany();

  function getFromTypes(name: string): Sound {
    return soundTypes.find((s: Sound): boolean => s.name === name);
  }

  const sounds = [];

  const soundsPath: string[] = readdirSync(path.resolve(__dirname, '../sounds/'));

  for (const folder of soundsPath) {
    const soundTypeFolder: string[] = readdirSync(path.resolve(__dirname, '../sounds/' + folder));

    for (const soundFile of soundTypeFolder) {
      if (soundFile !== '.DS_Store') {
        sounds.push({ typeId: getFromTypes(folder[0].toLocaleUpperCase() + folder.slice(1)).id, name: soundFile.slice(0, -4), size: '1 MB' });
      }
    }
  }

  await prisma.sound.createMany({
    data: sounds,
  });
}

main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (error): Promise<never> => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
