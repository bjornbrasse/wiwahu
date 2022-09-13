import { redirect } from '@remix-run/node';

import type { Prisma, PrismaClient } from '@prisma/client';
import type { Document, Instruction } from '~/types';
import { db } from '~/utils/db.server';

async function getInstructions(documentId: string) {
  // const instructions = db.data?.instructions
  //   .filter((i) => i.parentInstruction?.id === parentInstructionId)
  //   .map((i) => ({ ...i, steps: getChildSteps(i.id) })) as (Instruction & {
  //   steps: Awaited<ReturnType<typeof getChildSteps>>;
  // })[];

  // return instructions;

  // TODO: Recursief maken
  const instructions = await db.instruction.findMany({
    where: {
      parentInstructions: { some: { parentInstructionId: documentId } },
    },
  });

  return instructions as Instruction[];
}

export const getDocument = async (db: PrismaClient, { id }: { id: string }) => {
  const document = await db.instruction.findFirst({
    where: { AND: [{ id }, { type: 'document' }] },
    // include: { childInstructions: { include: { childInstruction: true } } },
  });

  if (!document) return null;

  return {
    ...document,
    instructions: await getInstructions(document.id),
  };
};

export const getDocuments = async (db: PrismaClient) => {
  return db.instruction.findMany({ where: { type: 'document' } });
};

export const searchDocuments = async (
  db: PrismaClient,
  { terms }: { terms: string[] }
) => {
  const s = terms.map((term) => ({ instruction: { contains: term } }));
  console.log('dit is de string', s);

  const foundInstructions = await db.instruction.findMany({
    where: {
      AND: [
        // TODO: make postgresql database for case-insensitive search
        {
          // OR: terms.map((term) => ({ instruction: { contains: term } })),
          AND: terms.map((term) => ({ instruction: { contains: term } })),
        },
        { type: 'document' },
      ],
    },
  });

  return foundInstructions;
};
