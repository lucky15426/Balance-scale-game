export const GAME_LEVELS = [
  {
    id: 1,
    title: 'Practical Round 1: Market Order 1 kg',
    concept: '1 kg = 1000 g',
    instruction: 'The customer ordered a 1kg Watermelon. Balance the scale using smaller gram fruits!',
    targetGrams: 1000,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r1-watermelon', weightId: 'watermelon-1000' }
    ],
    rightPreset: [],
    availableWeightIds: ['grapes-50', 'strawberry-100', 'apple-250', 'orange-500'],
    hint: '1 kg = 1000g. Combine two 500g Oranges (500+500=1000g) or four 250g Apples!',
    explanation: '1 Kilogram (kg) Watermelon is equal to 1000 Grams of smaller fruits!'
  },
  {
    id: 2,
    title: 'Practical Round 2: Juice Recipe 500 g',
    concept: '500 g = 0.5 kg (Half Kilogram)',
    instruction: 'Left side has a 500g Juicy Orange. Balance the scale with smaller fruits!',
    targetGrams: 500,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r2-orange', weightId: 'orange-500' }
    ],
    rightPreset: [],
    availableWeightIds: ['grapes-50', 'strawberry-100', 'apple-250'],
    hint: '500g can be made with two 250g Apples (250+250) or five 100g Strawberries!',
    explanation: '500 grams is equal to half a kilogram (0.5 kg).'
  },
  {
    id: 3,
    title: 'Practical Round 3: Farm Harvest 5 kg Pumpkin',
    concept: '5 kg = 5000 g',
    instruction: 'A giant 5 kg Pumpkin is on the left pan! Balance it with 1 kg Watermelons or 500g Oranges.',
    targetGrams: 5000,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r3-pumpkin', weightId: 'pumpkin-5000' }
    ],
    rightPreset: [],
    availableWeightIds: ['orange-500', 'watermelon-1000'],
    hint: '5 kg = 5000g! Put five 1kg Watermelons (1+1+1+1+1 = 5kg) or ten 500g Oranges on the right!',
    explanation: '5 Kilograms equals 5000 Grams! 5 Watermelons (1kg each) = 5kg Pumpkin.'
  },
  {
    id: 4,
    title: 'Practical Round 4: Heavy Delivery 10 kg Crate',
    concept: '10 kg = 10000 g',
    instruction: 'Left pan has a heavy 10 kg Fruit Crate! Balance the scale using 5kg Pumpkins and 1kg Watermelons.',
    targetGrams: 10000,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r4-crate', weightId: 'crate-10000' }
    ],
    rightPreset: [],
    availableWeightIds: ['watermelon-1000', 'pumpkin-5000'],
    hint: '10 kg = 10000g! Two 5kg Pumpkins (5+5 = 10kg) or ten 1kg Watermelons will balance the scale!',
    explanation: '10 Kilograms = 10000 Grams! 2 Pumpkins (5kg each) = 10kg Crate.'
  },
  {
    id: 5,
    title: 'Practical Round 5: 4 kg Juice Challenge (Grams Only)',
    concept: '4 kg = 4000 g (Gram Fruits Only)',
    instruction: 'Left pan has four 1kg Watermelons (4 kg). Balance the right side using ONLY Gram Fruits!',
    targetGrams: 4000,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r5-w1', weightId: 'watermelon-1000' },
      { instanceId: 'r5-w2', weightId: 'watermelon-1000' },
      { instanceId: 'r5-w3', weightId: 'watermelon-1000' },
      { instanceId: 'r5-w4', weightId: 'watermelon-1000' }
    ],
    rightPreset: [],
    availableWeightIds: ['grapes-50', 'strawberry-100', 'apple-250', 'orange-500'],
    hint: '4 kg = 4000g! Eight 500g Oranges (8 × 500 = 4000g) or sixteen 250g Apples make 4 kg!',
    explanation: '4 kg = 4000 grams. 8 Oranges (500g each) = 4000g = 4 kg!'
  },
  {
    id: 6,
    title: 'Practical Round 6: Fruit Salad 750 g',
    concept: '750 g = 0.75 kg',
    instruction: 'Left pan has 750g (500g Orange + 250g Apple). Balance the scale using 250g Apples!',
    targetGrams: 750,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r6-o', weightId: 'orange-500' },
      { instanceId: 'r6-a', weightId: 'apple-250' }
    ],
    rightPreset: [],
    availableWeightIds: ['grapes-50', 'strawberry-100', 'apple-250'],
    hint: '750g can be balanced with three 250g Apples (250+250+250 = 750g)!',
    explanation: '750 grams is equal to 0.75 kilograms (3 quarter-kilograms).'
  },
  {
    id: 7,
    title: 'Practical Round 7: Fruit Stand 2.5 kg',
    concept: '2.5 kg = 2500 g',
    instruction: 'Left pan has 2.5 kg (2500g). Balance the scale using 1 kg Watermelons & 500g Oranges!',
    targetGrams: 2500,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r7-w1', weightId: 'watermelon-1000' },
      { instanceId: 'r7-w2', weightId: 'watermelon-1000' },
      { instanceId: 'r7-o1', weightId: 'orange-500' }
    ],
    rightPreset: [],
    availableWeightIds: ['apple-250', 'orange-500', 'watermelon-1000'],
    hint: '2.5 kg = 2500g! Use two 1kg Watermelons + one 500g Orange, or five 500g Oranges!',
    explanation: '2.5 kg = 2500 grams (2 kg and 500 g).'
  },
  {
    id: 8,
    title: 'Practical Round 8: Heavy Market 15 kg Load',
    concept: '15 kg = 15000 g',
    instruction: 'Left pan has 15 kg (10kg Crate + 5kg Pumpkin)! Balance the right pan using Pumpkins & Watermelons.',
    targetGrams: 15000,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r8-c', weightId: 'crate-10000' },
      { instanceId: 'r8-p', weightId: 'pumpkin-5000' }
    ],
    rightPreset: [],
    availableWeightIds: ['watermelon-1000', 'pumpkin-5000', 'crate-10000'],
    hint: '15 kg = 15000g! Three 5kg Pumpkins (5+5+5 = 15kg) or 10kg Crate + 5 Watermelons = 15kg!',
    explanation: '15 kg = 15000 grams! 3 Pumpkins (5kg each) = 15 kg.'
  },
  {
    id: 9,
    title: 'Practical Round 9: Berry Mix 350 g',
    concept: '350 g = 0.35 kg',
    instruction: 'Left pan has 350g (250g Apple + 100g Strawberry). Balance the right side using Strawberries and Grapes!',
    targetGrams: 350,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r9-a', weightId: 'apple-250' },
      { instanceId: 'r9-s', weightId: 'strawberry-100' }
    ],
    rightPreset: [],
    availableWeightIds: ['grapes-50', 'strawberry-100'],
    hint: '350g can be made with three 100g Strawberries (300g) + one 50g Grape bunch (50g)!',
    explanation: '350 grams = 300g + 50g.'
  },
  {
    id: 10,
    title: 'Practical Round 10: Grand Market Master 12 kg',
    concept: '12 kg = 12000 g',
    instruction: 'Left pan has 12 kg (10kg Crate + two 1kg Watermelons). Balance the right pan!',
    targetGrams: 12000,
    targetPan: 'right',
    leftPreset: [
      { instanceId: 'r10-c', weightId: 'crate-10000' },
      { instanceId: 'r10-w1', weightId: 'watermelon-1000' },
      { instanceId: 'r10-w2', weightId: 'watermelon-1000' }
    ],
    rightPreset: [],
    availableWeightIds: ['orange-500', 'watermelon-1000', 'pumpkin-5000', 'crate-10000'],
    hint: '12 kg = 12000g! Two 5kg Pumpkins (10kg) + two 1kg Watermelons (2kg) = 12 kg!',
    explanation: '12 Kilograms = 12000 Grams!'
  }
];
