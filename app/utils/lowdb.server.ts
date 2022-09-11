import { Low, JSONFile } from 'lowdb';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
// import { join, dirname } from "path";
// import { fileURLToPath } from "url";

import type { Category } from '~/models/category.server';
import type { Instruction } from 'types/instruction';
import type { Note } from '~/models/note.server';
import type { Organisation } from '~/models/organisation.server';
import type { TUser } from '~/models/user.server';

type Data = {
  categories: Category[];
  instructions: Instruction[];
  notes: Note[];
  organisations: Organisation[];
  users: TUser[];
};

// const __dirName = dirname(fileURLToPath(import.meta.url));
// const file = join(__dirName, "db.json");
// const adapter = new JSONFile<Data>(file);
// const db = new Low<Data>(adapter);

// Bovenste setup werkte niet, de simpelere versie hieronder wel!
const db = new Low<Data>(new JSONFile<Data>('db.json'));

(async function seedDb() {
  await db.read();

  const CATEGORY1 = nanoid();

  const DOCUMENT1 = nanoid();
  const DOCUMENT2 = nanoid();

  const ORGANISATION1: Organisation = {
    id: nanoid(),
    name: 'Good, Better, Best Hospital',
    nameShort: 'GBBH',
    slug: 'gbbh',
    emailDomain: '@gbbh.nl',
  };
  const ORGANISATION2: Organisation = {
    id: nanoid(),
    name: 'Hosp Italy',
    nameShort: 'HI',
    slug: 'hi',
    emailDomain: '@hi.it',
  };

  const USER1 = nanoid();
  const USER2 = nanoid();

  if (!db.data) {
    db.data = {
      categories: [
        {
          id: CATEGORY1,
          name: 'Farmacogenetica',
        },
      ],
      instructions: [
        {
          id: DOCUMENT1,
          long: 'Pannekoeken bakken',
          short: 'PB',
          type: 'document',
          version: '1.0.0',
        },
        {
          id: nanoid(),
          long: 'Meel zeven',
          short: 'Gebruik meel van goede kwaliteit!',
          type: 'step',
          parentInstruction: { id: DOCUMENT1, order: 1 },
          version: '1.0.0',
        },
        {
          id: nanoid(),
          long: 'Zorg ervoor dat er geen schilletjes in zitten!',
          short: 'Eieren toevoegen',
          type: 'step',
          parentInstruction: { id: DOCUMENT1, order: 2 },
          version: '1.0.0',
        },
        {
          id: nanoid(),
          long: 'Doe dit in kleine gedeelten',
          short: 'Voeg de melk toe aan het beslag.',
          type: 'step',
          parentInstruction: { id: DOCUMENT1, order: 3 },
          version: '1.0.0',
        },
        {
          id: DOCUMENT2,
          long: 'Auto wassen',
          short: 'AW',
          type: 'document',
          version: '1.0.0',
        },
      ],
      notes: [],
      organisations: [ORGANISATION1, ORGANISATION2],
      users: [
        {
          id: USER1,
          firstName: 'Bjorn',
          lastName: 'Frederiks',
          email: 'bjorn@topico.nl',
          passwordHash: await bcrypt.hash('bjorn', await bcrypt.genSalt()),
          isAdmin: true,
        },
        {
          id: USER2,
          firstName: 'Frons',
          lastName: 'van de Poel',
          email: `frons${ORGANISATION1.emailDomain}`,
          passwordHash: await bcrypt.hash('frons', await bcrypt.genSalt()),
          organisationId: ORGANISATION1.id,
        },
        {
          id: nanoid(),
          firstName: 'Bregje',
          lastName: 'Zonder-Vrees',
          email: `bregje${ORGANISATION1.emailDomain}`,
          passwordHash: await bcrypt.hash('bregje', await bcrypt.genSalt()),
          organisationId: ORGANISATION1.id,
        },
        {
          id: nanoid(),
          firstName: 'Barry',
          lastName: 'Vratsma',
          email: `barry${ORGANISATION1.emailDomain}`,
          passwordHash: await bcrypt.hash('barry', await bcrypt.genSalt()),
          organisationId: ORGANISATION1.id,
        },
      ],
    };

    await db.write();
  }
})();

export { db };
