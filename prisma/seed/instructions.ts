import type { PrismaClient, User } from '@prisma/client';
import { InstructionUncheckedCreateInput } from 'types/instruction';
import { createInstructions } from '~/services/instruction.server';
// import { faker as F } from "@faker-js/faker";

const genInstructionData = async (adminUser: User) => {
  const arr: Omit<InstructionUncheckedCreateInput, 'createdById'>[] = [
    {
      instruction: 'Pannekoeken bakken',
      explanation:
        'We gaan echt heerlijke pannenkoeken maken, volgens grootmoeders recept!',
      type: 'document',
      version: '0.0.1',
      childInstructions: {
        create: [
          {
            childInstruction: {
              create: {
                instruction: 'Mail zeven',
                explanation:
                  'Heel belangrijk dat er geen klontjes in zitten, dat is niet lekker!',
                type: 'step',
                version: '0.0.1',
                createdById: adminUser.id,
              },
            },
          },
          {
            childInstruction: {
              create: {
                instruction: 'Eieren toevoegen',
                type: 'step',
                version: '0.0.1',
                createdById: adminUser.id,
              },
            },
          },
          {
            childInstruction: {
              create: {
                instruction: 'Melk erbij',
                explanation:
                  'Meng lege artis, dwz. in kleine beetjes toevoegen!!!',
                type: 'step',
                version: '0.0.1',
                createdById: adminUser.id,
              },
            },
          },
          {
            childInstruction: {
              create: {
                instruction: 'Mixen',
                explanation:
                  'Mix gedurende minimaal 30 minuten om de Pannekoeken lekker luchtig te krijgen!!',
                type: 'step',
                version: '0.0.1',
                createdById: adminUser.id,
              },
            },
          },
        ],
      },
    },
    {
      instruction: 'Auto wassen',
      explanation:
        'Geen een omschrijving van hoe een auto moet worden gewassen!!!',
      type: 'document',
      version: '0.0.1',
    },
    {
      instruction: 'Astma medicatie pakken',
      explanation: '',
      type: 'document',
      version: '0.0.1',
    },
    {
      instruction: 'Cytostaticum infuus toedienen',
      explanation: '',
      type: 'document',
      version: '0.0.1',
      warnings: 'Zorg ervoor niet te spillen!',
      childInstructions: {
        create: [
          {
            childInstruction: {
              create: {
                instruction: 'Prik infuus',
                type: 'document',
                version: '0.01',
                createdById: adminUser.id,
              },
            },
          },
        ],
      },
    },
  ];

  // for (let i = 0; i < 20; i++) {
  //   const companyName = F.company.companyName() + i.toString();
  //   arr.push({
  //     name: companyName,
  //     emailDomain: F.internet.email('', '', companyName),
  //     slug: F.helpers.slugify(companyName.toLowerCase().replace(/" - "/i, '-')),
  //     departments: [1, 2, 3].map((_, j) => {
  //       const departmentName = F.commerce.department();

  //       return {
  //         name: departmentName,
  //         slug: F.helpers.slugify(
  //           departmentName.toLowerCase().replace(/" - "/i, '-') + i + j
  //         ),
  //       };
  //     }),
  //   });
  // }
  return arr;
};

export async function seedInstructions({
  db,
  adminUser,
}: {
  db: PrismaClient;
  adminUser: User;
}) {
  const instructionData = await genInstructionData(adminUser);

  await createInstructions(
    db,
    instructionData.map((i) => ({ ...i, createdById: adminUser.id }))
  );
}
