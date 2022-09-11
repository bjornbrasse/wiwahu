import { nanoid } from 'nanoid';
import { db } from '~/utils/lowdb.server';

import type { Note } from '~/models/note.server';

export const createNote = async (data: Omit<Note, 'id'>) => {
  const note = { id: nanoid(), ...data };

  await db.read();
  db.data?.notes?.push(note);
  await db.write();

  return note;
};

export const upsertNote = async (data: Omit<Note, 'id'> & { id?: string }) => {
  console.log('dit zijn de data: ', data);

  await db.read();
  if (data?.id) {
    const index = db.data?.notes.findIndex((n) => n.id === data.id);

    // db.data && db.data.notes[index ?? -1] = data;
  } else {
    db.data?.notes?.push({ id: nanoid(), ...data });
  }
  await db.write();

  return db.data?.notes.find((n) => n.id === data.id);
};

export const getNotes = async ({
  instructions,
}: {
  instructions: string[];
}) => {
  await db.read();
  return (
    db.data?.notes?.filter((n) => instructions.includes(n.instruction)) ?? []
  );
};
