// import { faker as F } from "@faker-js/faker";

import type { PrismaClient, User } from '@prisma/client';
import {
  createInstructions,
  InstructionData,
} from '~/services/instruction.server';

// type OrganisationData = Pick<Organisation, "name" | "slug" | "emailDomain"> & {
//   departments: (Pick<Department, "name" | "slug"> & {
//     schedules?: Pick<Schedule, "name" | "slug">[];
//   })[];
// } & Partial<Organisation>;

const genInstructionData = async () => {
  const arr: Omit<InstructionData, 'createdById'>[] = [
    {
      long: 'Pannekoeken bakken',
      short: 'PB',
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
  const instructionData = await genInstructionData();

  await createInstructions(
    db,
    instructionData.map((i) => ({ ...i, createdById: adminUser.id }))
  );
}
