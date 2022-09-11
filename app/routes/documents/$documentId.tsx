import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Instruction } from '~/components/instruction';
import { getDocument } from '~/models/document.server';

import { useState } from 'react';
import { upsertNote, getNotes } from '~/models/note.server';
import * as Z from 'zod';
import { Field } from '~/components/form-elements';
import { badRequest } from '~/utils/badRequest';

import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { inferSafeParseErrors } from 'types';
import { requireSessionUser } from '~/session.server';

type LoaderData = {
  document: Exclude<Awaited<ReturnType<typeof getDocument>>, null>;
  notes: Awaited<ReturnType<typeof getNotes>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const document = await getDocument({ id: params.documentId ?? '' });

  if (!document) return redirect('/documents');

  const notes = await getNotes({
    instructions: document.steps.map((s) => s.id),
  });

  return json<LoaderData>({ document, notes });
};

const schema = Z.object({
  id: Z.string().optional(),
  instruction: Z.string(),
  text: Z.string(),
});

type ActionData = {
  errors?: inferSafeParseErrors<typeof schema>;
  fields?: Z.infer<typeof schema>;
  note?: Awaited<ReturnType<typeof upsertNote>>;
};

export const action: ActionFunction = async ({ params, request }) => {
  // const user = await requireSessionUser(request, {
  //   redirectTo: `/documents/${params.documentId}`,
  // });

  const result = schema.safeParse(Object.fromEntries(await request.formData()));

  if (!result.success)
    return badRequest<ActionData>({ errors: result.error.flatten() });

  const note = await upsertNote({ author: '123', ...result.data });

  return json<ActionData>({ note });
};

export default function Document() {
  const { document, notes } = useLoaderData<LoaderData>();

  const [stepsEdited, setStepsEdited] = useState();
  const [noteEdit, setNoteEdit] = useState<{
    id?: string;
    instruction: string;
    text?: string;
  } | null>(null);

  return (
    <div className="flex h-full flex-col border-4 border-green-400">
      <h1>Wiwahu</h1>
      <h1 className="mb-4 border-b border-gray-300">{document.long}</h1>
      <div className="grid w-full flex-1 auto-rows-min grid-cols-12 gap-2 border-4 border-red-400 p-2">
        {document.steps.map((instruction) => {
          const note = notes.find((n) => n.instruction === instruction.id);

          return (
            <>
              <Instruction key={instruction.id} instruction={instruction}>
                {!note && (
                  <button
                    className="btn btn-save"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNoteEdit({
                        instruction: instruction.id,
                      });
                    }}
                  >
                    <i className="far fa-note-sticky" />
                  </button>
                )}
              </Instruction>
              {noteEdit?.instruction === instruction.id ? (
                <div className="col-span-4 border-2 border-green-400">
                  <Form
                    className="col-span-4 flex flex-col border-2 border-red-400"
                    method="post"
                  >
                    <input
                      type="hidden"
                      name="instruction"
                      value={instruction.id}
                    />
                    <Field
                      label="Notitie"
                      name="text"
                      defaultValue={noteEdit.text}
                    />
                    <button
                      className="btn btn-save block self-end"
                      type="submit"
                    >
                      Opslaan
                    </button>
                  </Form>
                </div>
              ) : note ? (
                <div className="col-span-4 flex items-start justify-between border-2 border-pink-500 p-1">
                  <p>{note.text}</p>
                  <button
                    className="btn btn-save"
                    onClick={() =>
                      setNoteEdit({
                        id: note.id,
                        instruction: note.instruction,
                        text: note.text,
                      })
                    }
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
