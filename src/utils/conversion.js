import { WEIGHT_ITEMS } from '../data/weights';

export const kgToGrams = (kg) => {
  return Math.round(kg * 1000);
};

export const gramsToKg = (grams) => {
  return Number((grams / 1000).toFixed(3));
};

export const formatWeight = (grams) => {
  if (grams <= 0) return '0g';
  if (grams < 1000) {
    return `${grams}g`;
  }
  if (grams % 1000 === 0) {
    return `${grams / 1000}kg`;
  }
  return `${Number((grams / 1000).toFixed(2))}kg`;
};

export const formatWeightDetailed = (grams) => {
  if (grams <= 0) return '0 g';
  if (grams < 1000) return `${grams} g`;
  if (grams % 1000 === 0) return `${grams / 1000} kg`;
  return `${Number((grams / 1000).toFixed(2))} kg (${grams} g)`;
};

export const calculateTotalWeight = (panItems) => {
  if (!Array.isArray(panItems)) return 0;
  return panItems.reduce((acc, item) => {
    const weightObj = WEIGHT_ITEMS.find((w) => w.id === item.weightId);
    return acc + (weightObj ? weightObj.weightGrams : 0);
  }, 0);
};

export const compareWeights = (leftGrams, rightGrams) => {
  const diff = leftGrams - rightGrams;
  const absDiff = Math.abs(diff);

  let status = 'balanced';
  let tiltAngle = 0; // degrees

  if (diff > 0) {
    status = 'left-heavy'; // left is heavier, so left side goes DOWN (counter-clockwise)
    tiltAngle = -Math.min(15, Math.max(3, Math.log10(absDiff + 1) * 4.2));
  } else if (diff < 0) {
    status = 'right-heavy'; // right is heavier, so right side goes DOWN (clockwise)
    tiltAngle = Math.min(15, Math.max(3, Math.log10(absDiff + 1) * 4.2));
  }

  return {
    diff,
    absDiff,
    status,
    tiltAngle,
    isBalanced: leftGrams > 0 && rightGrams > 0 && leftGrams === rightGrams,
  };
};
