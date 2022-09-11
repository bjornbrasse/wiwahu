// import { faker as F } from "@faker-js/faker";

// import type {
//   Department,
//   Organisation,
//   PrismaClient,
//   Schedule,
//   User,
// } from "@prisma/client";

// type OrganisationData = Pick<Organisation, "name" | "slug" | "emailDomain"> & {
//   departments: (Pick<Department, "name" | "slug"> & {
//     schedules?: Pick<Schedule, "name" | "slug">[];
//   })[];
// } & Partial<Organisation>;

// const genOrganisationData = async () => {
//   const arr: OrganisationData[] = [
//     {
//       name: "Elisabeth-TweeSteden Ziekenhuis",
//       nameShort: "ETZ",
//       slug: "etz",
//       emailDomain: "@etz.nl",
//       departments: [
//         {
//           name: "Ziekenhuisapotheek",
//           slug: "ziekenhuisapotheek",
//           schedules: [{ name: "Vakgroep", slug: "vakgroep" }],
//         },
//       ],
//     },
//     {
//       name: "Catharina Ziekenhuis Eindhoven",
//       nameShort: "CZE",
//       slug: "cze",
//       emailDomain: "@cze.nl",
//       departments: [
//         {
//           name: "Cardiologie",
//           slug: "cardiologie",
//           schedules: [{ name: "Vakgroep Cardiologie", slug: "vakgroep" }],
//         },
//       ],
//     },
//   ];

//   for (let i = 0; i < 20; i++) {
//     const companyName = F.company.companyName() + i.toString();
//     arr.push({
//       name: companyName,
//       emailDomain: F.internet.email("", "", companyName),
//       slug: F.helpers.slugify(companyName.toLowerCase().replace(/" - "/i, "-")),
//       departments: [1, 2, 3].map((_, j) => {
//         const departmentName = F.commerce.department();

//         return {
//           name: departmentName,
//           slug: F.helpers.slugify(
//             departmentName.toLowerCase().replace(/" - "/i, "-") + i + j
//           ),
//         };
//       }),
//     });
//   }
//   return arr;
// };

// export async function seedOrganisations({
//   db,
//   adminUser,
// }: {
//   db: PrismaClient;
//   adminUser: User;
// }) {
//   const organisationData = await genOrganisationData();

//   console.log(organisationData);

//   return await Promise.all(
//     organisationData.map((organisation) => {
//       return db.organisation.create({
//         data: {
//           ...organisation,
//           createdById: adminUser.id,
//           departments: {
//             create: organisation.departments.map(
//               ({ schedules, ...department }) => ({
//                 ...department,
//                 createdById: adminUser.id,
//                 schedules: {
//                   create: schedules?.map((schedule) => ({
//                     ...schedule,
//                     createdById: adminUser.id,
//                   })),
//                 },
//               })
//             ),
//           },
//         },
//       });
//     })
//   );
// }
