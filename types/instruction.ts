import type { Instruction as PrismaInstruction, Prisma } from '@prisma/client';
import { RemoveOptionalProperties } from 'types';

export type InstructionType = 'document' | 'step';

export type Instruction = PrismaInstruction & {
  type: InstructionType;
  parentInstruction?: { id: string; order: number };
  version: `${number}.${number}.${number}`;
};

/**
 * InstructionUncheckedCreateInput with specific InstructionType
 */
export type InstructionUncheckedCreateInput =
  Prisma.InstructionUncheckedCreateInput & {
    type: InstructionType;
    version: `${number}.${number}.${number}`;
  };
