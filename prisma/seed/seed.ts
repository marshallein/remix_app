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

   const { collection } = await seed.collection([
      {
         collectionName: 'ALL YEAR COLLECTION',
         description: 'Collection of the year!',
         collectionCode: 'AY2024',
      },
   ]);

   await seed.product(
      [
         {
            productName: 'ANNIVERSARY AO DAI',
            sku: 'AD1137TRS',
            price: 3000000,
            salePercent: 25,
            description:
               'Anniversary Ao Dai Set includes: Silk Velvet Ao Dai and Silk Velvet Wide-leg Trouser \n This unique Ao Dai design features a rounded hem instead of traditional side slits, cleverly transformed with a delicate back slit that preserves the signature Cocoon silhouette of Thesilkcharm. Bold, clean cuts are dynamically incorporated on the luxurious Vietnamese silk velvet, making this Ao Dai eye-catching and impressive.',
            tags: 'Modern',
            AvailableColor: ['#b92937', '#d83c03'],
            promotion: 'Sale',
            mainImageString:
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732952682/14_7753a9814f18496a91e70315944b488e_master_zxxntn.png',
            imageSet: [
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732952751/15_c916ef9cc3a0455397b74bbe44261e3f_master_ltnef3.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732952792/18_aeb7b88bea954349ae431ae1c700460a_master_xc9qol.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732952958/57_6e50ebb4b4f5466f995b64dc51b9a32a_master_spsoya.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953060/59_9b22a333b52c4f2396b613f231e677c2_master_ytjmok.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953416/62_10543d3f31e24438a2665baea43d20b7_master_yoxp5t.png',
            ],
         },
         {
            productName: 'GIA CAT AO DAI - GOLD SILK VELVET',
            sku: 'AD1138TYS',
            price: 2950000,
            salePercent: 25,
            description:
               "Gia Cat Ao Dai Set includes: Silk Velvet Ao Dai and Silk Velvet Wide-leg Trouser \n This traditional loose-fitting Ao Dai features a versatile button placket. Bold, clean cuts on the shimmering apricot silk velvet fabric, along with loose A-line sleeves proportionally balanced with the Ao Dai's body, and matching wide-leg trousers in the same fabric and color, make this Gia Cat Ao Dai set simple yet more practical and eye-catching than ever.",
            tags: 'Modern',
            AvailableColor: ['#ffb27f'],
            promotion: 'Sale',
            mainImageString:
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953635/ao_dai_resize_41f98773e0b94dc29aba04157152762f_master_ncoj32.png',
            imageSet: [
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953655/4_0f1b5eb0e7bf445b939734a0ca55a9d8_master_zx83pa.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953701/1_a0d7e596fca54835b40a49650b8ad398_master_c32qao.png',
            ],
         },
         {
            productName: 'DAN DIEU AO DAI - BEIGE LACE',
            sku: 'AD1136TBL',
            price: 2650000,
            description:
               "Dan Dieu Ao Dai Set includes: Embroidered Lace Ao Dai and Embroidered Lace Trousers \n This A-line Ao Dai features a striking red frog closure shaped like a musical instrument, accentuating the wearer's facial features. Crafted from exquisite embroidered lace, the design is delicately embellished with subtle details, including crimson phoenix motifs that evoke the spirit of Tet ",
            tags: 'Modern',
            AvailableColor: ['#ede8d0', '#FF0000'],
            mainImageString:
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953888/24_3dd8ee249a7f44288c3ebed22a668c2a_master_satsb7.png',
            imageSet: [
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953900/23_e5baf51af48b46ee8e4f466db6f5d3de_master_orr8qs.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732953907/25_3592ac5763e24645b278a864c5a5674c_master_hglv1j.png',
            ],
         },
         {
            productName: 'HUYNH GIAO AO DAI - TWEED BE',
            sku: 'AD1133TBS',
            price: 1950000,
            description:
               'AO DAI HUYNH GIAO SET includes strapless Ao Dai, cropped jacket, TAFFETA PANTS Strapless Ao Dai model with modern horizontal bust cup and strong and decisive cut in light A shape \n The set comes with a unique cropped jacket, extremely delicate touches when fitting the bust cup to help maximize the figure. Moreover, the Giai Huynh Ao Dai set is also designed on a high-quality Tweed material mixed with metallic thread, making the overall Ao Dai set eye-catching and impressive. Combined with Taffeta silk straight pants, it brings elegance and luxury to the wearer.',
            tags: 'Modern',
            AvailableColor: ['#ede8d0'],
            mainImageString:
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954077/37_7b5785920eed419a870fccf0badc0bbe_master_sxbn7z.png',
            imageSet: [
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954089/35_0dc7f8fc669b470cb95dbfddf1f8fa17_master_q81pqc.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954093/36_d3c63ba5033b41b6a8852f0cb8e2d03d_master_feneud.png',
            ],
         },
         {
            productName: 'LIEN HOA AO DAI - TWEED PINK',
            sku: 'AD1132TPS',
            price: 2450000,
            description:
               'AO DAI LIEN HOA SET includes Ao Dai, TAFFETA Pants The small U-neck Ao Dai model makes the face more elegant, along with the waist-cinching shape on a soft woven tweed fabric background to help maximize the figure. The lotus pink color is bright and fresh. The delicate details such as pocket flaps and matte buttons make the shirt eye-catching. Combined with Taffeta silk straight pants, it brings elegance and luxury to the wearer.  ',
            tags: 'Modern',
            AvailableColor: ['#DB87D4'],
            promotion: 'Best_Seller',
            mainImageString:
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954581/64_834a5c9294e14a7eb104645d720e3fbc_master_bmfon3.png',
            imageSet: [
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954589/66_1267bac494564c38be5228a0a2d7b044_master_jfzfk4.png',
               'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954657/67_42b7db79dba2451b957eced7f30204c6_master_vo1fux.png',
            ],
         },
      ],
      {
         connect: { collection },
      },
   );

   await seed.product([
      {
         productName: 'MAO LUONG AO DAI - RED LACE',
         sku: 'AD1135TRS',
         price: 2650000,
         description:
            'SET AO DAI MAO LUONG includes Ao Dai with hidden embroidery, Ao Dai with hidden embroidery.                                                                       The Ao Dai model with a slightly narrow waist and skillfully pleated shoulder pads and a small U-neck helps to make the face more elegant and flatter the figure. Designed on a background of extremely delicate hidden embroidery lace, dotted with small details such as flower pins and buttons to bring an elegant and noble look. The pure red Ao Dai set is combined with purple pants of the same material to create an eye-catching overall outfit with a strong Tet Ao Dai style. ',
         tags: 'Modern',
         AvailableColor: ['#FF0000'],
         promotion: 'Best_Seller',
         mainImageString:
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954837/32_164733f4aee04ad28dca4973a27b59a9_master_uyxzdq.png',
         imageSet: [
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954899/31_d6b5e8b5045842848539837c8a421b84_master_tsb5fp.png',
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732954904/27_570f53a3e3ac4d5c8a2abbb09e6c358e_master_ptc3il.png',
         ],
      },
      {
         productName: 'MIEN LAM AO DAI - BLUE LACE',
         sku: 'AD1135TUS',
         price: 2650000,
         description:
            'SET AO DAI MIEN LAM includes Ao dai with hidden embroidery, Ao dai with hidden embroidery. The Ao dai model with a slightly narrow waist and skillfully pleated shoulder pads and a small U-neck helps to make the face more elegant and flatter the figure. Designed on a background of extremely delicate hidden embroidery lace, dotted with small details such as flower pins and buttons to bring an elegant and noble look. The set of Ao dai in dark purple color combined with pants of the same color and material helps to bring an overall eye-catching outfit with a strong Tet Ao dai style. ',
         tags: 'Modern',
         AvailableColor: ['#341539'],
         promotion: 'Best_Seller',
         mainImageString:
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955180/8_61e8d8821f7641efa3a250349675da36_master_f2kzft.png',
         imageSet: [
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955192/10_057c68c152c04a63a786909db89ee6c4_master_v4ekat.png',
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955241/11_f26083b6972748f1996ec36eb52e5625_master_blylri.png',
         ],
      },
      {
         productName: 'Open-Flap Ao Dai with Butterfly Sleeves',
         sku: 'A202331SFG',
         price: 1650000,
         description:
            'Open-Flap Ao Dai set (With matching Taffeta Wide-leg Trousers The Ao Dai is crafted from luxurious silk adorned with exquisite patterns, providing both comfort and breathability. The butterfly sleeves add a touch of whimsy and freedom while maintaining an air of sophistication. The accompanying pair of sleek Tafta silk trousers completes the refined look, making it suitable for various occasions such as Tet holidays, special events, or commemorative photoshoots. ',
         tags: 'Modern',
         AvailableColor: ['#ff7782'],
         promotion: 'Best_Seller',
         mainImageString: '...',
         imageSet: [],
      },
      {
         productName: 'BLUE LAM AN AO DAI',
         sku: 'A212221TUS',
         price: 2650000,
         description:
            'SET AO DAI LAM AN XANH includes Ao Dai and Tafta silk straight pants. For the first time, Thesilkcharm launches a special product line for the end-of-year festival season. \n With the desire to bring the image of Ao Dai closer to the contemporary breath, Thesilkcharm has conveyed the contemporary spirit through the variation in design on the traditional costume. \n Blending between tradition and modernity, gentleness and freedom, the Ao Dai still retains its classic features with a waist-cinching design, highlighting the graceful beauty of Vietnamese women. Along with the breakthrough in the characteristic cuts and folds designed on the background of high-quality Tweed Cheviot fabric, Thesilkcharm brings its new Ao Dai product line with a liberal spirit, breaking the mold in a subtle and applicable way. ',
         tags: 'Modern',
         AvailableColor: ['#0000ff'],
         promotion: 'Best_Seller',
         mainImageString:
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955326/ad_resize_21_fe0454237ed649fcab5b876f0fea28a5_master_kh0qik.png',
         imageSet: [
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955399/img_7791_c8aced0b98b84db1b6db6d4fc1eb6094_master_jzlpjz.jpg',
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955418/img_7792_fc5e70f8f87c4cebac3be9d6f85673d1_master_vw0nxz.jpg',
         ],
      },
      {
         productName: 'RED MAN TUC AO DAI',
         sku: 'A212211TRS',
         price: 2450000,
         description:
            'SET AO DAI MAN TUC DO includes Ao Dai and Tafta silk straight pants \n For the first time, Thesilkcharm launches a special product line for the end-of-year festival season.\n With the desire to bring the image of Ao Dai closer to the contemporary breath, Thesilkcharm has conveyed the contemporary spirit through the variation in design on the traditional costume. \n Blending between tradition and modernity, gentleness and freedom, the Ao Dai still retains its classic features with a waist-cinching design, highlighting the graceful beauty of Vietnamese women. Along with the breakthrough in the characteristic cuts and folds designed on the background of high-quality Tweed Cheviot fabric, Thesilkcharm brings its new Ao Dai product line with a liberal spirit, breaking the mold in a subtle and applicable way.',
         tags: 'Modern',
         AvailableColor: ['#ff2c2c'],
         promotion: 'Best_Seller',
         mainImageString:
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955750/ad_resize_20_5d8095329d0749d3a9b8b3554950d028_master_evcxkg.png',
         imageSet: [
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955774/img_7795_dfe319de782c4a61b3087f697651cd1c_master_gxpcwk.jpg',
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955784/img_7797_bfbc1651f86643c8933856093b2c19d3_master_rtlca0.jpg',
         ],
      },
      {
         productName: 'ANH BE ELEGANT AO DAI',
         sku: 'A212231TBS',
         price: 2400000,
         description:
            'SET AO DAI NHA ANH BE includes Ao Dai and Tafta silk pants With the desire to bring the image of Ao Dai closer to the contemporary breath, The Silkcharm has conveyed the contemporary spirit through the variation in design on the basis of traditional costumes. \n Blending tradition and modernity, gentleness and freedom, the Ao Dai still retains its classic features with the waist design, highlighting the graceful beauty of Vietnamese women. Along with the breakthrough in the characteristic cuts and folds designed on the basis of high-quality Tweed Cheviot fabric, The Silkcharm brings its new Ao Dai product line with a liberal spirit, breaking the mold in a subtle and applicable way.',
         tags: 'Modern',
         AvailableColor: ['#ede8d0'],
         promotion: 'Best_Seller',
         mainImageString:
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955864/ad_resize_22_600c57d9a67c4f5c8d0034d824d4d49a_master_vavgbf.png',
         imageSet: [
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955940/img_7809_21991b15d738429e94e96ed81cd0ca54_master_dppdh0.jpg',
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732955944/img_7851_7340f395d5054013846466edc89bcfaa_master_j9u2hx.jpg',
         ],
      },
      {
         productName: 'THU NHA AO DAI - PINK TAFFETA',
         sku: 'AD1134TPS',
         price: 2450000,
         description:
            'SET AO DAI THU NHA includes Ao Dai and Tafta silk straight pants. The Ao Dai model has a bold architectural shape and shape with Raglan shoulder pads to help the body become more graceful. Designed on a background of translucent Taffeta material with moderate elasticity and a sturdy fabric surface texture with a slightly cut waist with straight, thin ribs to create a maximum shape and flatter the figure.',
         tags: 'Modern',
         AvailableColor: ['#ff8da1'],
         promotion: 'Best_Seller',
         mainImageString:
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732956063/55_fed0b290050e4ec9b0c02d4c5ba5b82b_master_lredek.png',
         imageSet: [
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732956074/52_e3414314c4f94c2596dd9991056fddb3_master_unc8vy.png',
            'https://res.cloudinary.com/dhkus4faj/image/upload/v1732956082/54_09be94df7ef14de3a5edf4cb4279914e_master_nmpfly.png',
         ],
      },
   ]);

   // Type completion not working? You might want to reload your TypeScript Server to pick up the changes
   console.log('Database seeded successfully!');

   process.exit();
};

main();
