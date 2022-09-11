import type { Instruction, PrismaClient } from '@prisma/client';

export type InstructionData = Pick<
  Instruction,
  'createdById' | 'long' | 'short'
>;

export const createInstruction = async (
  db: PrismaClient,
  data: InstructionData
) => {
  const instruction = await db.instruction.create({ data });

  return instruction;
};

export const createInstructions = async (
  db: PrismaClient,
  data: InstructionData[]
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
