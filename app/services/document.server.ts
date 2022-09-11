import { redirect } from '@remix-run/node';

import type { Prisma, PrismaClient } from '@prisma/client';
import type { Document } from '~/types';

// function getChildSteps(parentInstructionId: string) {
//   db.read();
//   const instructions = db.data?.instructions
//     .filter((i) => i.parentInstruction?.id === parentInstructionId)
//     .map((i) => ({ ...i, steps: getChildSteps(i.id) })) as (Instruction & {
//     steps: Awaited<ReturnType<typeof getChildSteps>>;
//   })[];

//   return instructions;
// }

export const getDocument = async (db: PrismaClient, { id }: { id: string }) => {
  return (await db.instruction.findFirst({
    where: { AND: [{ id }, { type: 'document' }] },
  })) as Document | null;

  // return { ...instruction, steps: getChildSteps(instruction?.id) };
};

export const getDocuments = async (db: PrismaClient) => {
  return db.instruction.findMany({ where: {} });
};
