import { nanoid } from 'nanoid';
import { db } from '~/utils/lowdb.server';

export type Instruction = {
  id: string;
  long: string;
  short: string;
  type: 'document' | 'step';
  parentInstruction?: { id: string; order: number };
  version: `${number}.${number}.${number}`;
};

// export const createCategory = async (data: Omit<Category, 'id'>) => {
//   const category = { id: nanoid(), ...data };

//   await db.read();
//   db.data?.categories?.push(category);
//   await db.write();

//   return category;
// };
