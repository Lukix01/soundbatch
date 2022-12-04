import path from 'node:path';
import { readdirSync, statSync } from 'node:fs';
import { Sound } from '@prisma/client';
import { prisma } from '../src/lib/prisma';

async function main(): Promise<void> {
  const soundsPath: string[] = readdirSync(path.resolve(__dirname, '../sounds/'));

  const types = [];

  for (const folder of soundsPath) {
    types.push({
      name: folder[0].toUpperCase() + folder.slice(1),
    });
  }

  await prisma.type.createMany({
    data: types,
  });

  const soundTypes = await prisma.type.findMany();

  function getFromTypes(name: string): Sound {
    return soundTypes.find((s: Sound): boolean => s.name === name);
  }

  const sounds = [];

  for (const folder of soundsPath) {
    const soundTypeFolder: string[] = readdirSync(path.resolve(__dirname, '../sounds/', folder));

    for (const soundFile of soundTypeFolder) {
      if (soundFile !== '.DS_Store') {
        sounds.push({
          typeId: getFromTypes(folder[0].toLocaleUpperCase() + folder.slice(1)).id,
          name: soundFile.slice(0, -4),
          size: ((statSync(path.resolve(__dirname, '../sounds/', folder, soundFile)).size / 1_000_000)).toFixed(1) + ' MB',
        });
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
