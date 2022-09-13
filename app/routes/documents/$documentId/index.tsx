import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Instruction } from '~/components/instruction';
import { getDocument } from '~/services/document.server';
import { FC, useState } from 'react';
import { upsertNote, getNotes } from '~/models/note.server';
import * as Z from 'zod';
import { Field } from '~/components/form-elements';
import { badRequest } from '~/utils/badRequest';

import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { inferSafeParseErrors } from 'types';
import { requireSessionUser } from '~/session.server';
import { db } from '~/utils/db.server';
import clsx from 'clsx';
import { Disclosure } from '@headlessui/react';
import { DocumentProcedure } from '~/components/document-procedure';
import DocumentStart from '~/components/document-start';

type LoaderData = {
  document: Exclude<Awaited<ReturnType<typeof getDocument>>, null>;
  // notes: Awaited<ReturnType<typeof getNotes>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const document = await getDocument(db, { id: params.documentId ?? '' });

  if (!document) return redirect('/documents');

  // const notes = await getNotes({
  //   instructions: document.steps.map((s) => s.id),
  // });

  // return json<LoaderData>({ document, notes });
  return json<LoaderData>({ document });
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

const Step: FC<
  {
    isActive: boolean;
    onClick: (step: number) => void;
    type: 'step' | 'functional';
  } & JSX.IntrinsicElements['div']
> = ({ children, isActive, onClick: clickHandler, type }) => (
  <div
    className={`${
      type === 'step'
        ? 'rounded-md bg-gray-300'
        : 'rounded-full border border-gray-400 '
    } ${isActive ? 'bg-sky-500' : 'cursor-pointer'} select-none py-2 px-4`}
    onClick={clickHandler}
  >
    {children}
  </div>
);

export default function Document() {
  const [activeStep, setActiveStep] = useState(0);
  const { document } = useLoaderData<LoaderData>();

  const [stepsEdited, setStepsEdited] = useState();
  const [noteEdit, setNoteEdit] = useState<{
    id?: string;
    instruction: string;
    text?: string;
  } | null>(null);

  return (
    <div className="flex h-full flex-col space-y-4 p-8">
      <h1 className="border-b border-gray-300">{document.instruction}</h1>
      <div className="flex items-center space-x-1 px-4">
        <Step
          isActive={activeStep === 0}
          onClick={() => setActiveStep(0)}
          type="functional"
        >
          Start
        </Step>
        <i className="fas fa-chevron-right text-xl text-gray-200"></i>
        <Step
          isActive={activeStep === 1}
          onClick={() => setActiveStep(1)}
          type="step"
        >
          Voorbereiding
        </Step>
        <i className="fas fa-chevron-right text-xl text-gray-200"></i>
        <Step
          isActive={activeStep === 2}
          onClick={() => setActiveStep(2)}
          type="step"
        >
          Procedure
        </Step>
        <i className="fas fa-chevron-right text-xl text-gray-200"></i>
        <Step
          isActive={activeStep === 3}
          onClick={() => setActiveStep(3)}
          type="step"
        >
          Nazorg
        </Step>
        <i className="fas fa-chevron-right text-xl text-gray-200"></i>
        <Step
          isActive={activeStep === 4}
          onClick={() => setActiveStep(4)}
          type="functional"
        >
          Einde
        </Step>
      </div>
      <div className="relative flex-1 border border-red-800">
        <div className={activeStep === 0 ? 'visible' : 'invisible'}>
          <DocumentStart />
        </div>
        <div
          className={`absolute inset-0 ${
            activeStep === 2 ? 'visible' : 'invisible'
          }`}
        >
          <DocumentProcedure
            className="border-green-700"
            instructions={document.instructions}
            visible={activeStep === 2}
          />
        </div>
      </div>
    </div>
  );
}
