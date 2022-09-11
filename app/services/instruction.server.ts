import type { Prisma, PrismaClient } from '@prisma/client';

export const createInstruction = async (
  db: PrismaClient,
  args: Prisma.InstructionCreateArgs
) => {
  const instruction = await db.instruction.create(args);

  return instruction;
};

export const createInstructions = async (
  db: PrismaClient,
  data: Prisma.InstructionCreateInput[]
) => {
  try {
    const instructions = await Promise.all(
      data.map((instruction) => {
        return db.instruction.create({ data: instruction });
      })
    );
    return instructions;
  } catch (error) {
    return error;
  }
};
