// Verified against all 18 files in public/products/hanger cloths.
// Six complete sets exist (four tees, one shirt, one hoodie).
// Anchors are the opaque wooden hanger tips; span ends at the garment hem.
const view = (file, x, y, bottom) => {
  const base = `/products/hanger cloths/responsive/${file.replace(/\.webp$/, '')}`;
  return {
    src: `/products/hanger cloths/${file}`, x, y, span: bottom - y,
    displaySrc: `${base}-840.webp`,
    srcSet: `${encodeURI(`${base}-420.webp`)} 420w, ${encodeURI(`${base}-840.webp`)} 840w`,
  };
};

export const hangerProducts = [
  {
    id: 'botanical-shirt', name: 'Botanical Ink Shirt', category: 'Printed Shirt',
    description: 'Burgundy botanical strokes on an ivory ground. An open collar and long sleeves frame the all-over print, which continues across the back.',
    side: view('side.webp', 563, 56, 1321),
    front: view('front.webp', 562, 63, 1377),
    back: view('back.webp', 560.5, 55, 1357),
  },
  {
    id: 'rare-rabbit-tee', name: 'Rare Rabbit Tee', category: 'Graphic T-Shirt',
    description: 'A quiet black front with a small chest signature. Turn the piece around to reveal the oversized cream lettering across the back.',
    side: view('Black T-Shirt Side Profile on Wooden Hanger.webp', 569.5, 60, 1288),
    front: view('Black RARE RABBIT T-Shirt on Wooden Hanger.webp', 558, 68, 1306),
    back: view('Black Tee with Cream RAR Graphic.webp', 559, 54, 1328),
  },
  {
    id: 'red-inspiration-tee', name: 'Red Inspiration Tee', category: 'Oversized T-Shirt',
    description: 'A vivid red silhouette with pale typography and illustrated artwork on the front. The unprinted back lets the colour and generous proportions speak.',
    side: view('ChatGPT Image Oct 5, 2026, 03_38_19 PM.webp', 563.5, 58, 1321),
    front: view('Red Inspiration Art T-Shirt Mockup.webp', 549.5, 135, 1299),
    back: view('Red Oversized T-Shirt on Wooden Hanger.webp', 559.5, 76, 1311),
  },
  {
    id: 'monkey-king-tee', name: 'Monkey King Tee', category: 'Graphic T-Shirt',
    description: 'A sand-coloured tee with a small chest emblem and a detailed Monkey King illustration on the reverse. Relaxed sleeves complete the silhouette.',
    side: view('ChatGPT Image Oct 5, 2026, 03_22_49 PM.webp', 559.5, 36, 1327),
    front: view('ChatGPT Image Oct 5, 2026, 03_24_30 PM.webp', 561.5, 80, 1320),
    back: view('Vintage Monkey King Back Print T-Shirt.webp', 560, 75, 1330),
  },
  {
    id: 'two-tone-tee', name: 'Charcoal / Olive Tee', category: 'Colourblock T-Shirt',
    description: 'Charcoal and olive panels meet through the centre of the front, beneath a tonal graphic. Contrasting sleeves carry the two colours around the silhouette.',
    side: view('Side-Profile Two-Tone T-Shirt on Wooden Hanger.webp', 563, 46, 1321),
    front: view('ChatGPT Image Oct 5, 2026, 03_43_39 PM.webp', 562, 51, 1351),
    back: view('Two-Tone Charcoal Olive T-Shirt.webp', 562.5, 53, 1334),
  },
  {
    id: 'cream-olive-hoodie', name: 'Cream / Olive Hoodie', category: 'Colourblock Hoodie',
    description: 'A cream body and hood meet olive sleeves, cuffs and hem. A small front emblem and kangaroo pocket balance the generous hooded shape.',
    side: view('Side-Profile Cream and Olive Hoodie.webp', 542.5, 85, 1307),
    front: view('ChatGPT Image Oct 5, 2026, 03_16_04 PM.webp', 560.5, 81, 1299),
    back: view('ChatGPT Image Oct 5, 2026, 03_17_35 PM.webp', 559.5, 79, 1280),
  },
];
