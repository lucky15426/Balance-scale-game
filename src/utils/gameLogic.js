// Question Generator for Practice & Timed Challenge modes

export const BADGES = [
  {
    id: 'gram-explorer',
    title: 'Gram Explorer',
    description: 'Completed Level 1: Discovered what a Gram and Kilogram are!',
    icon: '🧭',
    reqType: 'level',
    reqVal: 1,
  },
  {
    id: 'kilogram-master',
    title: 'Kilogram Master',
    description: 'Completed 5 levels of GramQuest!',
    icon: '👑',
    reqType: 'level',
    reqVal: 5,
  },
  {
    id: 'balance-champion',
    title: 'Balance Champion',
    description: 'Balanced the scale perfectly 10 times!',
    icon: '🏆',
    reqType: 'score',
    reqVal: 500,
  },
  {
    id: 'conversion-pro',
    title: 'Conversion Pro',
    description: 'Achieved a streak of 5 correct answers!',
    icon: '⚡',
    reqType: 'streak',
    reqVal: 5,
  },
  {
    id: 'speed-demon',
    title: 'Speed Converter',
    description: 'Scored 500+ points in Timed Challenge Mode!',
    icon: '⏱️',
    reqType: 'challenge',
    reqVal: 500,
  },
  {
    id: 'scale-genius',
    title: 'Scale Genius',
    description: 'Mastered all levels and scored over 1000 points!',
    icon: '🎓',
    reqType: 'score',
    reqVal: 1000,
  }
];

export const generateQuestion = (difficulty = 'medium') => {
  const types = ['kg-to-g', 'g-to-kg', 'comparison', 'addition', 'missing'];
  const chosenType = types[Math.floor(Math.random() * types.length)];

  if (chosenType === 'kg-to-g') {
    const kg = Math.floor(Math.random() * 8) + 1; // 1 to 8 kg
    const ansG = kg * 1000;
    const options = shuffle([
      `${ansG} g`,
      `${ansG / 10} g`,
      `${ansG + 500} g`,
      `${ansG * 10} g`,
    ]);
    return {
      type: 'kg-to-g',
      question: `How many grams are in ${kg} kg?`,
      hint: `Remember: 1 kg = 1000 g! So multiply ${kg} × 1000.`,
      options,
      correctAnswer: `${ansG} g`,
      explanation: `${kg} kg × 1000 = ${ansG} g`,
    };
  }

  if (chosenType === 'g-to-kg') {
    const kgValues = [1, 2, 3, 4, 5, 6, 7.5, 2.5];
    const targetKg = kgValues[Math.floor(Math.random() * kgValues.length)];
    const targetG = targetKg * 1000;
    const options = shuffle([
      `${targetKg} kg`,
      `${targetKg / 10} kg`,
      `${targetKg * 10} kg`,
      `${targetKg + 2} kg`,
    ]);
    return {
      type: 'g-to-kg',
      question: `How many kilograms are ${targetG} grams?`,
      hint: `Remember: 1000 g = 1 kg! Divide ${targetG} ÷ 1000.`,
      options,
      correctAnswer: `${targetKg} kg`,
      explanation: `${targetG} g ÷ 1000 = ${targetKg} kg`,
    };
  }

  if (chosenType === 'comparison') {
    const leftG = (Math.floor(Math.random() * 4) + 1) * 250; // e.g. 250, 500, 750, 1000
    const rightKg = Math.floor(Math.random() * 2) + 1; // 1kg or 2kg
    const rightG = rightKg * 1000;
    
    let ansStr = '';
    if (leftG > rightG) ansStr = 'Left side is heavier';
    else if (rightG > leftG) ansStr = 'Right side is heavier';
    else ansStr = 'Both sides are equal';

    const options = shuffle([
      'Left side is heavier',
      'Right side is heavier',
      'Both sides are equal',
    ]);

    return {
      type: 'comparison',
      question: `Which side is heavier? Left: ${leftG} g vs Right: ${rightKg} kg`,
      hint: `Convert both sides to grams! ${rightKg} kg = ${rightG} g.`,
      options,
      correctAnswer: ansStr,
      explanation: `Left: ${leftG}g, Right: ${rightG}g. ${ansStr}!`,
    };
  }

  if (chosenType === 'addition') {
    const val1 = [100, 250, 500, 1000][Math.floor(Math.random() * 4)];
    const val2 = [250, 500, 1000][Math.floor(Math.random() * 3)];
    const totalG = val1 + val2;
    const options = shuffle([
      `${totalG} g`,
      `${totalG - 100} g`,
      `${totalG + 250} g`,
      `${totalG * 2} g`,
    ]);
    return {
      type: 'addition',
      question: `What is the total weight of ${val1} g + ${val2} g?`,
      hint: `Add the two values together!`,
      options,
      correctAnswer: `${totalG} g`,
      explanation: `${val1} g + ${val2} g = ${totalG} g`,
    };
  }

  // missing weight
  const given = 500;
  const missing = 500;
  const target = 1000;
  const options = shuffle(['250 g', '500 g', '750 g', '1000 g']);
  return {
    type: 'missing',
    question: `500 g + ____ = 1 kg (1000 g)`,
    hint: `How much do you need to add to 500g to make 1000g?`,
    options,
    correctAnswer: '500 g',
    explanation: '500 g + 500 g = 1000 g = 1 kg',
  };
};

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
