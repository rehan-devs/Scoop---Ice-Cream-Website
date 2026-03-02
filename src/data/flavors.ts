export interface Flavor {
  slug: string;
  name: string;
  category: 'Classics' | 'Fruit & Sorbet' | 'Indulgent' | 'Seasonal' | 'Vegan';
  price: number;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  accentColor: string;
  ingredients: string[];
  allergens: string[];
  dietary: string[];
  sweetness: number;
  creaminess: number;
  richness: number;
  pairsWith: string[];
  seasonal: boolean;
  availableUntil?: string;
}

export const flavors: Flavor[] = [
  {
    slug: 'madagascar-vanilla',
    name: 'Madagascar Vanilla',
    category: 'Classics',
    price: 5.5,
    description: 'Pure vanilla bean folded into silky custard.',
    longDescription:
      "Our signature vanilla is anything but ordinary. We source high-grade vanilla beans directly from Madagascar, split and scrape each pod by hand, and fold them into a rich egg custard base that's been slow-churned to velvety perfection. You can see the tiny black specks of real vanilla throughout every scoop.",
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=1400&h=800&fit=crop',
    accentColor: '#F5DEB3',
    ingredients: ['Cream', 'Milk', 'Sugar', 'Egg Yolks', 'Madagascar Vanilla Beans'],
    allergens: ['Dairy', 'Eggs'],
    dietary: ['Gluten-Free', 'Nut-Free'],
    sweetness: 3,
    creaminess: 5,
    richness: 4,
    pairsWith: ['dark-chocolate', 'salted-caramel', 'strawberry-fields'],
    seasonal: false,
  },
  {
    slug: 'dark-chocolate',
    name: 'Dark Chocolate Truffle',
    category: 'Classics',
    price: 6.0,
    description: 'Intense 72% cacao with truffle swirls.',
    longDescription:
      'For the true chocolate lover. We melt high-quality 72% dark chocolate from a single-origin Ecuadorian cacao into our cream base, creating an intensely rich and deeply satisfying scoop. Ribbons of hand-rolled chocolate truffle are folded throughout for pockets of pure indulgence.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1400&h=800&fit=crop',
    accentColor: '#5C3D2E',
    ingredients: ['Cream', 'Milk', 'Sugar', '72% Dark Chocolate', 'Cocoa Powder', 'Chocolate Truffle Pieces'],
    allergens: ['Dairy', 'Soy'],
    dietary: ['Gluten-Free', 'Nut-Free'],
    sweetness: 2,
    creaminess: 4,
    richness: 5,
    pairsWith: ['madagascar-vanilla', 'salted-caramel', 'espresso-crunch'],
    seasonal: false,
  },
  {
    slug: 'strawberry-fields',
    name: 'Strawberry Fields',
    category: 'Fruit & Sorbet',
    price: 5.5,
    description: 'Fresh summer strawberries in sweet cream.',
    longDescription:
      'We macerate locally-grown strawberries with a touch of sugar and lemon zest, then fold them into our sweet cream base. The result is a vibrant, fruity scoop bursting with real strawberry flavor — no artificial colors or flavors, ever. The gorgeous pink hue comes entirely from the fruit itself.',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1400&h=800&fit=crop',
    accentColor: '#E8A0BF',
    ingredients: ['Cream', 'Milk', 'Sugar', 'Fresh Strawberries', 'Lemon Zest'],
    allergens: ['Dairy'],
    dietary: ['Gluten-Free', 'Nut-Free'],
    sweetness: 4,
    creaminess: 4,
    richness: 3,
    pairsWith: ['madagascar-vanilla', 'lemon-sorbet', 'pistachio-dream'],
    seasonal: false,
  },
  {
    slug: 'salted-caramel',
    name: 'Salted Caramel',
    category: 'Indulgent',
    price: 6.5,
    description: 'Burnt caramel with Maldon sea salt flakes.',
    longDescription:
      'We cook sugar low and slow until it reaches a deep amber caramel, then deglaze with cream and a generous pinch of Maldon sea salt flakes. The result is an addictively sweet-and-salty scoop with complex, almost butterscotch-like depth. Ribbons of extra caramel sauce are swirled throughout.',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=1400&h=800&fit=crop',
    accentColor: '#D4A574',
    ingredients: ['Cream', 'Milk', 'Sugar', 'Butter', 'Maldon Sea Salt', 'Vanilla Extract'],
    allergens: ['Dairy'],
    dietary: ['Gluten-Free', 'Nut-Free'],
    sweetness: 4,
    creaminess: 5,
    richness: 5,
    pairsWith: ['dark-chocolate', 'espresso-crunch', 'madagascar-vanilla'],
    seasonal: false,
  },
  {
    slug: 'pistachio-dream',
    name: 'Pistachio Dream',
    category: 'Indulgent',
    price: 7.0,
    description: 'Roasted Sicilian pistachios in almond cream.',
    longDescription:
      'Made with premium Sicilian pistachios that we roast and grind in-house, this flavor is nutty, earthy, and subtly sweet. The natural green color is genuinely from the pistachios — we add nothing artificial. Finished with crushed pistachio pieces for a satisfying crunch in every bite.',
    image: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=1400&h=800&fit=crop',
    accentColor: '#93C572',
    ingredients: ['Cream', 'Milk', 'Sugar', 'Sicilian Pistachios', 'Almond Extract'],
    allergens: ['Dairy', 'Tree Nuts'],
    dietary: ['Gluten-Free'],
    sweetness: 3,
    creaminess: 4,
    richness: 4,
    pairsWith: ['dark-chocolate', 'strawberry-fields', 'lemon-sorbet'],
    seasonal: false,
  },
  {
    slug: 'mango-passion',
    name: 'Mango Passion Sorbet',
    category: 'Fruit & Sorbet',
    price: 5.5,
    description: 'Tropical mango and passion fruit — dairy free.',
    longDescription:
      "A vibrant, refreshing sorbet made with ripe Alphonso mangoes and tangy passion fruit. No dairy, no eggs — just pure tropical fruit blended to silky perfection. It's sunshine in a scoop, and naturally vegan.",
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1400&h=800&fit=crop',
    accentColor: '#FFB347',
    ingredients: ['Mango Puree', 'Passion Fruit Juice', 'Sugar', 'Lemon Juice', 'Water'],
    allergens: [],
    dietary: ['Vegan', 'Gluten-Free', 'Nut-Free'],
    sweetness: 4,
    creaminess: 2,
    richness: 2,
    pairsWith: ['coconut-bliss', 'lemon-sorbet', 'strawberry-fields'],
    seasonal: false,
  },
  {
    slug: 'espresso-crunch',
    name: 'Espresso Crunch',
    category: 'Indulgent',
    price: 6.5,
    description: 'Double-shot espresso with toffee pieces.',
    longDescription:
      'For the coffee obsessed. We brew a double-strength espresso using locally roasted beans and churn it directly into our cream base. Shards of house-made honeycomb toffee are folded in for a caramelized crunch that perfectly complements the bold coffee flavor.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=1400&h=800&fit=crop',
    accentColor: '#8B6F5E',
    ingredients: ['Cream', 'Milk', 'Sugar', 'Espresso', 'Honeycomb Toffee', 'Egg Yolks'],
    allergens: ['Dairy', 'Eggs'],
    dietary: ['Nut-Free'],
    sweetness: 3,
    creaminess: 4,
    richness: 5,
    pairsWith: ['dark-chocolate', 'salted-caramel', 'madagascar-vanilla'],
    seasonal: false,
  },
  {
    slug: 'lemon-sorbet',
    name: 'Lemon Basil Sorbet',
    category: 'Fruit & Sorbet',
    price: 5.0,
    description: 'Zingy Meyer lemon with fresh basil.',
    longDescription:
      'A palate cleanser and a dessert in one. We juice Meyer lemons for their sweeter, more complex flavor, and infuse the syrup with fresh basil leaves from a local herb farm. The result is bright, herbaceous, and incredibly refreshing.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1400&h=800&fit=crop',
    accentColor: '#FFF44F',
    ingredients: ['Meyer Lemon Juice', 'Sugar', 'Water', 'Fresh Basil'],
    allergens: [],
    dietary: ['Vegan', 'Gluten-Free', 'Nut-Free'],
    sweetness: 3,
    creaminess: 1,
    richness: 1,
    pairsWith: ['strawberry-fields', 'mango-passion', 'pistachio-dream'],
    seasonal: false,
  },
  {
    slug: 'coconut-bliss',
    name: 'Coconut Bliss',
    category: 'Vegan',
    price: 6.0,
    description: 'Creamy coconut milk with toasted coconut flakes.',
    longDescription:
      "Our most popular vegan option. We use full-fat coconut milk as the base, sweetened with maple syrup, and fold in house-toasted coconut flakes for texture. It's tropical, creamy, and completely dairy-free — you'd never know it's vegan.",
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=1400&h=800&fit=crop',
    accentColor: '#F5F5DC',
    ingredients: ['Coconut Milk', 'Maple Syrup', 'Toasted Coconut Flakes', 'Vanilla Extract'],
    allergens: ['Coconut'],
    dietary: ['Vegan', 'Gluten-Free', 'Nut-Free'],
    sweetness: 3,
    creaminess: 4,
    richness: 3,
    pairsWith: ['mango-passion', 'dark-chocolate', 'matcha-zen'],
    seasonal: false,
  },
  {
    slug: 'matcha-zen',
    name: 'Matcha Zen',
    category: 'Seasonal',
    price: 7.0,
    description: 'Ceremonial-grade Uji matcha in white chocolate cream.',
    longDescription:
      'Our seasonal tribute to Japanese tea culture. We whisk ceremonial-grade matcha from Uji, Kyoto into a white chocolate cream base, creating an earthy, slightly bitter, and luxuriously creamy scoop. The vibrant green color is 100% natural from the matcha itself.',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1400&h=800&fit=crop',
    accentColor: '#7B9E6B',
    ingredients: ['Cream', 'Milk', 'Sugar', 'White Chocolate', 'Ceremonial Matcha Powder'],
    allergens: ['Dairy', 'Soy'],
    dietary: ['Gluten-Free', 'Nut-Free'],
    sweetness: 2,
    creaminess: 5,
    richness: 4,
    pairsWith: ['coconut-bliss', 'madagascar-vanilla', 'lemon-sorbet'],
    seasonal: true,
    availableUntil: 'March 2025',
  },
  {
    slug: 'pumpkin-spice',
    name: 'Pumpkin Spice',
    category: 'Seasonal',
    price: 6.5,
    description: 'Real roasted pumpkin with warm autumn spices.',
    longDescription:
      'Not your average pumpkin spice. We roast real sugar pumpkins until caramelized, then blend them into our cream base with cinnamon, nutmeg, ginger, and clove. Finished with a graham cracker crumble swirl that tastes like pie crust.',
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=1400&h=800&fit=crop',
    accentColor: '#D2691E',
    ingredients: [
      'Cream', 'Milk', 'Sugar', 'Roasted Pumpkin', 'Cinnamon', 'Nutmeg', 'Ginger', 'Clove', 'Graham Cracker Crumble',
    ],
    allergens: ['Dairy', 'Wheat'],
    dietary: ['Nut-Free'],
    sweetness: 4,
    creaminess: 4,
    richness: 4,
    pairsWith: ['salted-caramel', 'espresso-crunch', 'madagascar-vanilla'],
    seasonal: true,
    availableUntil: 'December 2024',
  },
  {
    slug: 'oat-milk-chocolate',
    name: 'Oat Milk Chocolate',
    category: 'Vegan',
    price: 6.5,
    description: 'Rich chocolate made with creamy oat milk.',
    longDescription:
      'Proof that vegan ice cream can be just as indulgent. We use barista-grade oat milk as our base and combine it with premium cocoa and melted dark chocolate. The oat milk adds a natural sweetness and creaminess that makes this scoop impossibly smooth.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1400&h=800&fit=crop',
    accentColor: '#6B4226',
    ingredients: ['Oat Milk', 'Cocoa Powder', 'Dark Chocolate', 'Sugar', 'Coconut Oil', 'Vanilla Extract'],
    allergens: ['Oats', 'Soy'],
    dietary: ['Vegan', 'Nut-Free'],
    sweetness: 3,
    creaminess: 4,
    richness: 5,
    pairsWith: ['coconut-bliss', 'salted-caramel', 'espresso-crunch'],
    seasonal: false,
  },
];

export function getFlavorBySlug(slug: string): Flavor | undefined {
  return flavors.find((f) => f.slug === slug);
}

export function getFlavorsByCategory(category: string): Flavor[] {
  if (category === 'All') return flavors;
  return flavors.filter((f) => f.category === category);
}

export function getRelatedFlavors(currentSlug: string, pairsWith: string[]): Flavor[] {
  return flavors.filter((f) => pairsWith.includes(f.slug) && f.slug !== currentSlug);
}

export const categories = ['All', 'Classics', 'Fruit & Sorbet', 'Indulgent', 'Seasonal', 'Vegan'] as const;