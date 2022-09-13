import { Disclosure } from '@headlessui/react';
import { Form } from '@remix-run/react';
import clsx from 'clsx';
import { useState } from 'react';
import { Field } from './form-elements';

import type { FC } from 'react';
import type { Instruction } from 'types/instruction';

type IProps = {
  instructions: Instruction[];
  visible: boolean;
} & JSX.IntrinsicElements['div'];

export const DocumentProcedure: FC<IProps> = ({
  className,
  instructions,
  visible,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div
      className={clsx(
        `grid h-full w-full auto-rows-min grid-cols-12 gap-x-2 gap-y-1 border-4 p-2 ${
          visible ? 'visible' : 'invisible'
        }`,
        className
      )}
    >
      {instructions.map((instruction) => {
        // const note = notes.find((n) => n.instruction === instruction.id);

        return (
          <Disclosure
            as="div"
            className="col-span-8 flex flex-col"
            defaultOpen={true}
          >
            <Disclosure.Button
              className="flex items-center justify-between rounded-md bg-fuchsia-300 p-2 py-2"
              key={instruction.id}
            >
              {({ open }) => (
                <>
                  <span className="self-start">{instruction.instruction}</span>
                  {instruction.explanation && (
                    <i
                      className={`fas fa-chevron-down ${
                        open ? 'rotate-180 transition' : ''
                      }`}
                    ></i>
                  )}
                </>
              )}
            </Disclosure.Button>
            {instruction.explanation && (
              <Disclosure.Panel
                className="py-4 px-2 text-gray-500"
                key={instruction.id}
              >
                {instruction.explanation}
              </Disclosure.Panel>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};
