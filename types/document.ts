import type { Instruction } from './instruction';

export type Document = Instruction & { type: 'document' };

// function getChildSteps(parentInstructionId: string) {
//   db.read();
//   const instructions = db.data?.instructions
//     .filter((i) => i.parentInstruction?.id === parentInstructionId)
//     .map((i) => ({ ...i, steps: getChildSteps(i.id) })) as (Instruction & {
//     steps: Awaited<ReturnType<typeof getChildSteps>>;
//   })[];

//   return instructions;
// }

// export const getDocument = async ({ id }: { id: string }) => {
//   await db.read();

//   const instruction = await db.data?.instructions.find(
//     (i) => i.id === id && i.type === 'document'
//   );

//   if (!instruction) return null;

//   return { ...instruction, steps: getChildSteps(instruction?.id) };
// };
