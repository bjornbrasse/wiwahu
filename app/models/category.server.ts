import { nanoid } from 'nanoid';
import { db } from '~/utils/lowdb.server';

export type Category = {
  id: string;
  name: string;
};

export const createCategory = async (data: Omit<Category, 'id'>) => {
  const category = { id: nanoid(), ...data };

  await db.read();
  db.data?.categories?.push(category);
  await db.write();

  return category;
};

// export const getTask = async ({ id }: { id: string }) => {
//   await db.read();
//   return db.data?.tasks.find((task) => task.id === id);
// };
