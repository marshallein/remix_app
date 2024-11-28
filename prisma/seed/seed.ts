/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';
import bcrypt from 'bcryptjs';

const main = async () => {
   const seed = await createSeedClient();

   // Truncate all tables in the database
   await seed.$resetDatabase();

   // Seed the database with 10 user
   await seed.user([
      {
         email: 'test@mail.com',
         password: await bcrypt.hash('1234', 10),
         name: 'test_user_123',
         username: 'test_user_123',
      },
      {
         email: 'test2@mail.com',
         password: await bcrypt.hash('1234', 10),
         name: 'test_user2_123',
         username: 'test_user2_123',
      },
   ]);

   await seed.product([
      {
         productName: 'ANNIVERSARY AO DAI',
         sku: 'AD1137TRS',
         price: 3000000,
         description:
            'Anniversary Ao Dai Set includes: Silk Velvet Ao Dai and Silk Velvet Wide-leg Trouser This unique Ao Dai design features a rounded hem instead of traditional side slits, cleverly transformed with a delicate back slit that preserves the signature Cocoon silhouette of Thesilkcharm. Bold, clean cuts are dynamically incorporated on the luxurious Vietnamese silk velvet, making this Ao Dai eye-catching and impressive.',
         tags: 'Modern',
         AvailableColor: ['#D91656', '#FFB200'],
         promotion: 'Best_Seller',
         mainImageString: 'https://photos.app.goo.gl/STXKufv6vPwhveRm7',
         imageSet: ['https://photos.app.goo.gl/STXKufv6vPwhveRm7'],
      },
      {
         productName: 'GIA CAT AO DAI - GOLD SILK VELVET',
         price: 2950000,
         sku: 'AD1138TYS',
         description:
            "Gia Cat Ao Dai Set includes: Silk Velvet Ao Dai and Silk Velvet Wide-leg Trouser This traditional loose-fitting Ao Dai features a versatile button placket. Bold, clean cuts on the shimmering apricot silk velvet fabric, along with loose A-line sleeves proportionally balanced with the Ao Dai's body, and matching wide-leg trousers in the same fabric and color, make this Gia Cat Ao Dai set simple yet more practical and eye-catching than ever.",
         tags: 'Modern',
         AvailableColor: ['#D91656', '#FFB200'],
         promotion: 'Best_Seller',
         mainImageString: 'https://photos.app.goo.gl/STXKufv6vPwhveRm7',
         imageSet: ['https://photos.app.goo.gl/STXKufv6vPwhveRm7'],
      },
   ]);

   // Type completion not working? You might want to reload your TypeScript Server to pick up the changes
   console.log('Database seeded successfully!');

   process.exit();
};

main();
