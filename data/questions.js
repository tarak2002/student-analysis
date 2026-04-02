/**
 * AI Tutor - Question Bank
 * 20 questions across 4 difficulty levels for Solving Linear Equations
 * 
 * Each question includes:
 * - id, level, type, text, correctAnswer
 * - wrongAnswers: maps common wrong answers to difficulty types
 * - hint: optional hint for the student
 * - topic: skill being assessed
 */

const DIFFICULTY_TYPES = {
  D1: { id: 'D1', name: 'Word Problem Interpretation', icon: '📖', color: '#E67E22' },
  D2: { id: 'D2', name: 'Procedural Error (Isolation)', icon: '🔧', color: '#3498DB' },
  D3: { id: 'D3', name: 'Sign/Arithmetic Error', icon: '➖', color: '#E74C3C' },
  D4: { id: 'D4', name: 'Foundational Gap', icon: '🧱', color: '#9B59B6' },
  D5: { id: 'D5', name: 'Order of Operations', icon: '📋', color: '#1ABC9C' },
  D6: { id: 'D6', name: 'Inverse Operation Confusion', icon: '🔄', color: '#F39C12' },
};

const QUESTIONS = [
  // ═══════════════════════════════════════════════════════════
  // LEVEL 1: One-step equations
  // ═══════════════════════════════════════════════════════════
  {
    id: 'L1Q1',
    level: 1,
    type: 'solve',
    text: 'Solve for x:  x + 5 = 12',
    equation: 'x + 5 = 12',
    correctAnswer: 7,
    acceptableAnswers: [7, '7'],
    wrongAnswers: {
      '17': ['D6'], // Added instead of subtracted
      '-7': ['D3'], // Sign error
      '5': ['D4'],  // Picked a number from the equation
      '12': ['D4'], // Picked a number from the equation
    },
    hint: 'To isolate x, perform the inverse operation on both sides.',
    topic: 'One-step addition equation',
  },
  {
    id: 'L1Q2',
    level: 1,
    type: 'solve',
    text: 'Solve for x:  x − 3 = 10',
    equation: 'x − 3 = 10',
    correctAnswer: 13,
    acceptableAnswers: [13, '13'],
    wrongAnswers: {
      '7': ['D6'],   // Subtracted instead of added
      '-13': ['D3'], // Sign error
      '3': ['D4'],   // Picked a number
      '10': ['D4'],  // Picked a number
    },
    hint: 'Since 3 is being subtracted, add 3 to both sides.',
    topic: 'One-step subtraction equation',
  },
  {
    id: 'L1Q3',
    level: 1,
    type: 'solve',
    text: 'Solve for x:  3x = 15',
    equation: '3x = 15',
    correctAnswer: 5,
    acceptableAnswers: [5, '5'],
    wrongAnswers: {
      '45': ['D6'],  // Multiplied instead of divided
      '12': ['D6'],  // Subtracted 3 instead of dividing
      '18': ['D6'],  // Added 3 instead of dividing
      '3': ['D4'],   // Picked coefficient
      '-5': ['D3'],  // Sign error
    },
    hint: 'To undo multiplication by 3, divide both sides by 3.',
    topic: 'One-step multiplication equation',
  },
  {
    id: 'L1Q4',
    level: 1,
    type: 'solve',
    text: 'Solve for x:  x / 4 = 6',
    equation: 'x / 4 = 6',
    correctAnswer: 24,
    acceptableAnswers: [24, '24'],
    wrongAnswers: {
      '1.5': ['D6'],  // Divided instead of multiplied
      '2': ['D6'],    // Divided 
      '10': ['D6'],   // Added 4
      '-24': ['D3'],  // Sign error
    },
    hint: 'To undo division by 4, multiply both sides by 4.',
    topic: 'One-step division equation',
  },
  {
    id: 'L1Q5',
    level: 1,
    type: 'word',
    text: 'A number increased by 8 equals 20. What is the number?',
    equation: 'x + 8 = 20',
    correctAnswer: 12,
    acceptableAnswers: [12, '12'],
    wrongAnswers: {
      '28': ['D1', 'D6'], // "Increased by" → added to both sides
      '160': ['D1'],      // Multiplied instead
      '2.5': ['D1'],      // Divided instead
      '8': ['D4'],        // Picked a number from the problem
      '20': ['D4'],       // Picked a number
    },
    hint: '"Increased by" means addition. Set up: x + 8 = 20.',
    topic: 'Word problem: one-step',
  },

  // ═══════════════════════════════════════════════════════════
  // LEVEL 2: Two-step equations
  // ═══════════════════════════════════════════════════════════
  {
    id: 'L2Q1',
    level: 2,
    type: 'solve',
    text: 'Solve for x:  2x + 3 = 7',
    equation: '2x + 3 = 7',
    correctAnswer: 2,
    acceptableAnswers: [2, '2'],
    wrongAnswers: {
      '5': ['D5'],     // Divided 7 by 2 first, then subtracted 3 → wrong order
      '2.5': ['D2'],   // (7-3)=4, but then 4/2 =2... actually let's say forgot to subtract
      '-2': ['D3'],    // Sign error
      '3.5': ['D5'],   // Divided first: 7/2=3.5
      '20': ['D2'],    // Random procedural error
    },
    hint: 'First subtract 3 from both sides, then divide by 2.',
    topic: 'Two-step equation',
  },
  {
    id: 'L2Q2',
    level: 2,
    type: 'solve',
    text: 'Solve for x:  5x − 10 = 25',
    equation: '5x − 10 = 25',
    correctAnswer: 7,
    acceptableAnswers: [7, '7'],
    wrongAnswers: {
      '3': ['D5'],     // 25/5=5, then 5+10... wrong order → (25/5) - 10?
      '5': ['D5'],     // Divided first: 25/5 = 5
      '-7': ['D3'],    // Sign error
      '35': ['D2'],    // Added 10, got 35, forgot to divide
      '15': ['D2'],    // 25-10=15, forgot to divide
    },
    hint: 'First add 10 to both sides (25 + 10 = 35), then divide by 5.',
    topic: 'Two-step equation',
  },
  {
    id: 'L2Q3',
    level: 2,
    type: 'solve',
    text: 'Solve for x:  4x + 1 = 17',
    equation: '4x + 1 = 17',
    correctAnswer: 4,
    acceptableAnswers: [4, '4'],
    wrongAnswers: {
      '4.5': ['D5'],    // 17/4 first
      '-4': ['D3'],     // Sign error
      '16': ['D2'],     // Subtracted but didn't divide
      '18': ['D6'],     // Added 1 instead of subtracting
      '3': ['D3'],      // Arithmetic error
    },
    hint: 'Subtract 1 from both sides (17 - 1 = 16), then divide by 4.',
    topic: 'Two-step equation',
  },
  {
    id: 'L2Q4',
    level: 2,
    type: 'solve',
    text: 'Solve for x:  x/3 + 2 = 8',
    equation: 'x/3 + 2 = 8',
    correctAnswer: 18,
    acceptableAnswers: [18, '18'],
    wrongAnswers: {
      '6': ['D5'],      // (8/3) then subtract? Or 8×3=24, 24-2=22? No... 8-2=6 forgot to multiply
      '2': ['D2'],      // Major procedural error
      '26': ['D5'],     // 8×3=24, 24+2=26 wrong order
      '-18': ['D3'],    // Sign error
      '10': ['D6'],     // Added 2 instead of subtracted, no multiply
    },
    hint: 'First subtract 2 (8 - 2 = 6), then multiply by 3 (6 × 3 = 18).',
    topic: 'Two-step equation with fraction',
  },
  {
    id: 'L2Q5',
    level: 2,
    type: 'word',
    text: 'If you double a number and then add 6, you get 22. What is the number?',
    equation: '2x + 6 = 22',
    correctAnswer: 8,
    acceptableAnswers: [8, '8'],
    wrongAnswers: {
      '14': ['D1'],     // "Double and add 6" → (22-6)=16... or 22/2=11+... misinterpret
      '11': ['D1'],     // 22/2 = 11, ignored "+6"
      '16': ['D2'],     // 22-6=16, forgot to divide by 2
      '-8': ['D3'],     // Sign error
      '44': ['D1'],     // Doubled 22
      '28': ['D1', 'D6'], // Added everything
    },
    hint: 'Set up: 2x + 6 = 22. Subtract 6 first, then divide by 2.',
    topic: 'Word problem: two-step',
  },

  // ═══════════════════════════════════════════════════════════
  // LEVEL 3: Negative coefficients & error identification
  // ═══════════════════════════════════════════════════════════
  {
    id: 'L3Q1',
    level: 3,
    type: 'solve',
    text: 'Solve for x:  −3x + 4 = 10',
    equation: '−3x + 4 = 10',
    correctAnswer: -2,
    acceptableAnswers: [-2, '-2'],
    wrongAnswers: {
      '2': ['D3'],       // Forgot negative: 6/3=2 instead of 6/-3=-2
      '-2.67': ['D5'],   // Divided first: 10/-3
      '6': ['D2'],       // 10-4=6, forgot to divide
      '-6': ['D2', 'D3'],// Got -6 
      '4.67': ['D5'],    // Wrong order
    },
    hint: 'Subtract 4 from both sides (10 - 4 = 6), then divide by -3.',
    topic: 'Equation with negative coefficient',
  },
  {
    id: 'L3Q2',
    level: 3,
    type: 'solve',
    text: 'Solve for x:  −x + 7 = 3',
    equation: '−x + 7 = 3',
    correctAnswer: 4,
    acceptableAnswers: [4, '4'],
    wrongAnswers: {
      '-4': ['D3'],     // Sign error at final step
      '10': ['D6'],     // Added 7 instead of subtracting
      '-10': ['D3', 'D6'],
      '3': ['D4'],      // Picked a number
    },
    hint: 'Subtract 7 from both sides (3 - 7 = -4), then divide by -1.',
    topic: 'Equation with -x',
  },
  {
    id: 'L3Q3',
    level: 3,
    type: 'error_identification',
    text: 'A student solved −2x = 8 and got x = 4. Is this correct? If not, what is the correct answer?',
    equation: '−2x = 8',
    correctAnswer: -4,
    acceptableAnswers: [-4, '-4'],
    wrongAnswers: {
      '4': ['D3'],      // Agrees with the wrong answer (sign error)
      '-8': ['D2'],     // Procedural confusion
      '16': ['D6'],     // Multiplied instead
      '-16': ['D3', 'D6'],
    },
    hint: 'When dividing by a negative number, the sign of the answer flips.',
    topic: 'Error identification: sign errors',
  },
  {
    id: 'L3Q4',
    level: 3,
    type: 'error_identification',
    text: 'A student solved 5 − x = 2 and wrote x = 7. What should x actually be?',
    equation: '5 − x = 2',
    correctAnswer: 3,
    acceptableAnswers: [3, '3'],
    wrongAnswers: {
      '7': ['D6', 'D3'],  // Added instead of recognizing subtraction
      '-3': ['D3'],        // Sign error
      '-7': ['D3'],        // Multiple sign errors
      '2': ['D4'],         // Picked a number
    },
    hint: 'Subtract 5 from both sides: −x = 2 − 5 = −3, so x = 3.',
    topic: 'Error identification: inverse ops',
  },
  {
    id: 'L3Q5',
    level: 3,
    type: 'word',
    text: 'A temperature drops by 3 degrees each hour. After some hours, it went from 15°C to −6°C. How many hours passed?',
    equation: '15 − 3x = −6',
    correctAnswer: 7,
    acceptableAnswers: [7, '7'],
    wrongAnswers: {
      '3': ['D1'],       // Confused the numbers
      '-7': ['D3'],      // Sign error
      '21': ['D2'],      // 15-(-6)=21, forgot to divide
      '5': ['D1', 'D3'], // Miscalculated: (15-6)/3
      '9': ['D1'],       // Used 15+(-6) wrong way
    },
    hint: 'Set up: 15 − 3x = −6. Subtract 15: −3x = −21. Divide by −3: x = 7.',
    topic: 'Word problem: negative coefficients',
  },

  // ═══════════════════════════════════════════════════════════
  // LEVEL 4: Parentheses & complex multi-step
  // ═══════════════════════════════════════════════════════════
  {
    id: 'L4Q1',
    level: 4,
    type: 'solve',
    text: 'Solve for x:  3(x − 2) = 12',
    equation: '3(x − 2) = 12',
    correctAnswer: 6,
    acceptableAnswers: [6, '6'],
    wrongAnswers: {
      '4.67': ['D5'],    // Added 2 to 12/3=4, got 4+2/3?... or 14/3
      '2': ['D5'],       // 12/3=4, 4-2=2 (subtracted instead of added)
      '14': ['D5'],      // 12+2=14, forgot to divide
      '-6': ['D3'],      // Sign error
      '10': ['D2'],      // 12-2=10, ignored the 3
    },
    hint: 'Divide both sides by 3 first (12 ÷ 3 = 4), then add 2.',
    topic: 'Equation with parentheses',
  },
  {
    id: 'L4Q2',
    level: 4,
    type: 'solve',
    text: 'Solve for x:  2(x + 5) = 3x + 1',
    equation: '2(x + 5) = 3x + 1',
    correctAnswer: 9,
    acceptableAnswers: [9, '9'],
    wrongAnswers: {
      '-9': ['D3'],      // Sign error
      '11': ['D5'],      // Distribution error
      '1': ['D2'],       // Major procedural error
      '-1': ['D2', 'D3'],
      '6': ['D5'],       // Partial expansion error
    },
    hint: 'Expand: 2x + 10 = 3x + 1. Subtract 2x: 10 = x + 1. Subtract 1: x = 9.',
    topic: 'Equation with parentheses and variables on both sides',
  },
  {
    id: 'L4Q3',
    level: 4,
    type: 'solve',
    text: 'Solve for x:  −2(x − 3) + 4 = 16',
    equation: '−2(x − 3) + 4 = 16',
    correctAnswer: -3,
    acceptableAnswers: [-3, '-3'],
    wrongAnswers: {
      '3': ['D3'],       // Sign error on final answer
      '-9': ['D5'],      // Distribution error
      '9': ['D3', 'D5'], // Multiple errors
      '0': ['D2'],       // Procedural confusion
      '-6': ['D2'],      // Partial work
    },
    hint: 'Expand: −2x + 6 + 4 = 16 → −2x + 10 = 16 → −2x = 6 → x = −3.',
    topic: 'Equation with negative distribution',
  },
  {
    id: 'L4Q4',
    level: 4,
    type: 'solve',
    text: 'Solve for x:  4(x + 1) − 2x = 10',
    equation: '4(x + 1) − 2x = 10',
    correctAnswer: 3,
    acceptableAnswers: [3, '3'],
    wrongAnswers: {
      '-3': ['D3'],     // Sign error
      '1': ['D5'],      // Distribution error
      '5': ['D2'],      // (10-4)/2? procedural
      '7': ['D5'],      // Forgot to subtract 4
      '2': ['D2'],      // 10/4 = 2.5 rounded?
    },
    hint: 'Expand: 4x + 4 − 2x = 10 → 2x + 4 = 10 → 2x = 6 → x = 3.',
    topic: 'Equation with distribution and combining like terms',
  },
  {
    id: 'L4Q5',
    level: 4,
    type: 'word',
    text: 'A phone plan charges $15 per month plus $0.10 per text message. If the total bill is $23, how many text messages were sent?',
    equation: '15 + 0.10x = 23',
    correctAnswer: 80,
    acceptableAnswers: [80, '80'],
    wrongAnswers: {
      '230': ['D1'],      // 23/0.10, ignored the $15
      '8': ['D1', 'D3'],  // (23-15)=8, forgot to divide by 0.10
      '380': ['D1'],      // (23+15)/0.10
      '0.8': ['D2'],      // 8 × 0.10 instead of 8 / 0.10
      '-80': ['D3'],      // Sign error
      '38': ['D1'],       // 23/0.10 = 230... or some partial
    },
    hint: 'Set up: 15 + 0.10x = 23. Subtract 15: 0.10x = 8. Divide by 0.10: x = 80.',
    topic: 'Word problem: multi-step with decimals',
  },
];

// Helper: Get questions by level
function getQuestionsByLevel(level) {
  return QUESTIONS.filter(q => q.level === level);
}

// Helper: Get question by ID
function getQuestionById(id) {
  return QUESTIONS.find(q => q.id === id);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS, DIFFICULTY_TYPES, getQuestionsByLevel, getQuestionById };
}
