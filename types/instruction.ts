import type { Instruction as PrismaInstruction, Prisma } from '@prisma/client';

export type InstructionType = 'document' | 'step';

export type Instruction = PrismaInstruction & {
  type: 'document' | 'step';
  parentInstruction?: { id: string; order: number };
  version: `${number}.${number}.${number}`;
};

/**
 * InstructionUncheckedCreateInput with specific InstructionType
 */
export type InstructionUncheckedCreateInput =
  Prisma.InstructionUncheckedCreateInput & {
    type: InstructionType;
  };
