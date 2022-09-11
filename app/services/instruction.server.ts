import type { Prisma, PrismaClient } from '@prisma/client';
import { InstructionUncheckedCreateInput } from 'types/instruction';

export const createInstruction = async (
  db: PrismaClient,
  args: Prisma.InstructionCreateArgs
) => {
  const instruction = await db.instruction.create(args);

  return instruction;
};

export const createInstructions = async (
  db: PrismaClient,
  input: InstructionUncheckedCreateInput[]
) => {
  try {
    const instructions = await Promise.all(
      input.map((data) => {
        return db.instruction.create({ data });
      })
    );
    return instructions;
  } catch (error) {
    return error;
  }
};
