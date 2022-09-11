import type { Instruction as PrismaInstruction } from '@prisma/client';

export type Instruction = PrismaInstruction & {
  type: 'document' | 'step';
  parentInstruction?: { id: string; order: number };
  version: `${number}.${number}.${number}`;
};
