import { useState } from 'react';

import type { FC } from 'react';
import type { Instruction as TInstruction } from 'types/instruction';

export const Instruction: FC<{ instruction: TInstruction }> = ({
  children,
  instruction,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="flex-none rounded-lg border border-gray-400 bg-blue-50 p-2"
      key={instruction.id}
    >
      <div className="flex justify-between">
        <p>{instruction.instruction}</p>
        <button onClick={() => setShowDetails((val) => !val)}>
          {children}
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      {/* {showDetails.includes(instruction.id) && ( */}
      {showDetails && (
        <div className="bg-gray-200 p-1">
          <p>{instruction.explanation}</p>
        </div>
      )}
    </div>
  );
};
