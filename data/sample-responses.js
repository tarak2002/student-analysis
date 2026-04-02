/**
 * AI Tutor - Sample Student Response Dataset
 * 20 sample student profiles with pre-built responses for demo/testing mode
 * 
 * Each profile includes responses to all questions at their appropriate level,
 * demonstrating specific cognitive difficulty patterns.
 */

const SAMPLE_STUDENTS = [
  // ── Student 1: Strong student, minor sign errors ──
  {
    id: 'student_01',
    name: 'Alex Chen',
    avatar: '👨‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 15 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 18 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 12 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 20 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 30 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 25 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 28 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 22 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 35 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 40 },
      { questionId: 'L3Q1', answer: 2, timeTaken: 45 },   // Sign error! Should be -2
      { questionId: 'L3Q2', answer: 4, timeTaken: 30 },
      { questionId: 'L3Q3', answer: 4, timeTaken: 20 },   // Agreed with wrong answer (sign error)
      { questionId: 'L3Q4', answer: 3, timeTaken: 35 },
      { questionId: 'L3Q5', answer: 7, timeTaken: 50 },
      { questionId: 'L4Q1', answer: 6, timeTaken: 30 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 45 },
      { questionId: 'L4Q3', answer: 3, timeTaken: 55 },   // Sign error! Should be -3
      { questionId: 'L4Q4', answer: 3, timeTaken: 40 },
      { questionId: 'L4Q5', answer: 80, timeTaken: 60 },
    ],
  },

  // ── Student 2: Struggles with word problems ──
  {
    id: 'student_02',
    name: 'Priya Sharma',
    avatar: '👩‍🎓',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 20 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 22 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 18 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 25 },
      { questionId: 'L1Q5', answer: 28, timeTaken: 55 },  // Word problem error!
      { questionId: 'L2Q1', answer: 2, timeTaken: 30 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 32 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 28 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 40 },
      { questionId: 'L2Q5', answer: 44, timeTaken: 65 },  // Word problem error!
      { questionId: 'L3Q1', answer: -2, timeTaken: 38 },
      { questionId: 'L3Q2', answer: 4, timeTaken: 32 },
      { questionId: 'L3Q3', answer: -4, timeTaken: 28 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 35 },
      { questionId: 'L3Q5', answer: 3, timeTaken: 70 },   // Word problem error!
      { questionId: 'L4Q1', answer: 6, timeTaken: 35 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 50 },
      { questionId: 'L4Q3', answer: -3, timeTaken: 55 },
      { questionId: 'L4Q4', answer: 3, timeTaken: 42 },
      { questionId: 'L4Q5', answer: 230, timeTaken: 80 }, // Word problem error!
    ],
  },

  // ── Student 3: Procedural errors in multi-step ──
  {
    id: 'student_03',
    name: 'Jordan Williams',
    avatar: '🧑‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 12 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 15 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 14 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 18 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 25 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 35 },
      { questionId: 'L2Q2', answer: 15, timeTaken: 40 },  // Procedural: didn't divide
      { questionId: 'L2Q3', answer: 16, timeTaken: 38 },  // Procedural: didn't divide
      { questionId: 'L2Q4', answer: 6, timeTaken: 45 },   // Procedural: didn't multiply
      { questionId: 'L2Q5', answer: 16, timeTaken: 50 },  // Procedural error
      { questionId: 'L3Q1', answer: 6, timeTaken: 42 },   // Procedural: didn't divide
      { questionId: 'L3Q2', answer: -4, timeTaken: 40 },  // Sign error too
      { questionId: 'L3Q3', answer: -4, timeTaken: 25 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 38 },
      { questionId: 'L3Q5', answer: 21, timeTaken: 55 },  // Procedural: didn't divide
    ],
  },

  // ── Student 4: Order of operations issues ──
  {
    id: 'student_04',
    name: 'Sarah Kim',
    avatar: '👩‍💻',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 18 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 20 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 15 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 22 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 35 },
      { questionId: 'L2Q1', answer: 5, timeTaken: 30 },   // Order: divided first
      { questionId: 'L2Q2', answer: 3, timeTaken: 35 },   // Order: divided first
      { questionId: 'L2Q3', answer: 4.5, timeTaken: 38 }, // Order: divided first
      { questionId: 'L2Q4', answer: 26, timeTaken: 42 },  // Order: multiplied first then added
      { questionId: 'L2Q5', answer: 11, timeTaken: 55 },  // Word problem + order issue
    ],
  },

  // ── Student 5: Sign errors everywhere ──
  {
    id: 'student_05',
    name: 'Marcus Johnson',
    avatar: '👨‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 15 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 18 },
      { questionId: 'L1Q3', answer: -5, timeTaken: 20 },  // Sign error
      { questionId: 'L1Q4', answer: -24, timeTaken: 22 }, // Sign error
      { questionId: 'L1Q5', answer: 12, timeTaken: 30 },
      { questionId: 'L2Q1', answer: -2, timeTaken: 28 },  // Sign error
      { questionId: 'L2Q2', answer: -7, timeTaken: 30 },  // Sign error
      { questionId: 'L2Q3', answer: -4, timeTaken: 32 },  // Sign error
      { questionId: 'L2Q4', answer: -18, timeTaken: 38 }, // Sign error
      { questionId: 'L2Q5', answer: -8, timeTaken: 45 },  // Sign error
      { questionId: 'L3Q1', answer: 2, timeTaken: 40 },   // Sign error (lost the negative)
      { questionId: 'L3Q2', answer: -4, timeTaken: 35 },  // Sign error
      { questionId: 'L3Q3', answer: 4, timeTaken: 25 },   // Agreed with wrong (sign error)
      { questionId: 'L3Q4', answer: -3, timeTaken: 38 },  // Sign error
      { questionId: 'L3Q5', answer: -7, timeTaken: 55 },  // Sign error
    ],
  },

  // ── Student 6: Inverse operation confusion ──
  {
    id: 'student_06',
    name: 'Emma Davis',
    avatar: '👩‍🎓',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 17, timeTaken: 20 },  // Added instead of subtracted
      { questionId: 'L1Q2', answer: 7, timeTaken: 22 },   // Subtracted instead of added
      { questionId: 'L1Q3', answer: 45, timeTaken: 25 },  // Multiplied instead of divided
      { questionId: 'L1Q4', answer: 1.5, timeTaken: 28 }, // Divided instead of multiplied
      { questionId: 'L1Q5', answer: 28, timeTaken: 40 },  // Inverse + word problem
    ],
  },

  // ── Student 7: Foundational gaps ──
  {
    id: 'student_07',
    name: 'Tyler Robinson',
    avatar: '🧑‍🎓',
    grade: '6th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 5, timeTaken: 45 },   // Just picked a number from equation
      { questionId: 'L1Q2', answer: 10, timeTaken: 50 },  // Picked number from equation
      { questionId: 'L1Q3', answer: 3, timeTaken: 40 },   // Picked coefficient
      { questionId: 'L1Q4', answer: 6, timeTaken: 55 },   // Picked the right side
      { questionId: 'L1Q5', answer: 8, timeTaken: 60 },   // Foundational gap
    ],
  },

  // ── Student 8: Good at basic, struggles with level 3+ ──
  {
    id: 'student_08',
    name: 'Olivia Martinez',
    avatar: '👩‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 10 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 12 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 8 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 15 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 22 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 18 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 20 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 22 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 30 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 35 },
      { questionId: 'L3Q1', answer: 2, timeTaken: 50 },   // Sign error
      { questionId: 'L3Q2', answer: -4, timeTaken: 45 },  // Sign error
      { questionId: 'L3Q3', answer: 4, timeTaken: 30 },   // Sign error (agreed with wrong)
      { questionId: 'L3Q4', answer: 7, timeTaken: 48 },   // Inverse + sign error
      { questionId: 'L3Q5', answer: 5, timeTaken: 60 },   // Word problem + sign
      { questionId: 'L4Q1', answer: 2, timeTaken: 55 },   // Order of ops
      { questionId: 'L4Q2', answer: 11, timeTaken: 65 },  // Distribution error
      { questionId: 'L4Q3', answer: 3, timeTaken: 70 },   // Sign error
      { questionId: 'L4Q4', answer: 5, timeTaken: 55 },   // Procedural error
      { questionId: 'L4Q5', answer: 8, timeTaken: 75 },   // Word problem
    ],
  },

  // ── Student 9: Perfect Level 1, moderate level 2, fails level 3 ──
  {
    id: 'student_09',
    name: 'Daniel Lee',
    avatar: '👨‍🎓',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 8 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 10 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 9 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 12 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 20 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 25 },
      { questionId: 'L2Q2', answer: 5, timeTaken: 35 },   // Order error
      { questionId: 'L2Q3', answer: 4, timeTaken: 30 },
      { questionId: 'L2Q4', answer: 6, timeTaken: 40 },   // Forgot to multiply
      { questionId: 'L2Q5', answer: 8, timeTaken: 45 },
      { questionId: 'L3Q1', answer: -2.67, timeTaken: 55 }, // Order error
      { questionId: 'L3Q2', answer: 10, timeTaken: 50 },    // Inverse error
      { questionId: 'L3Q3', answer: 4, timeTaken: 30 },     // Sign error
      { questionId: 'L3Q4', answer: -3, timeTaken: 52 },    // Sign error
      { questionId: 'L3Q5', answer: 9, timeTaken: 65 },     // Word problem error
    ],
  },

  // ── Student 10: Nearly perfect student ──
  {
    id: 'student_10',
    name: 'Sofia Nguyen',
    avatar: '👩‍💻',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 8 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 10 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 7 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 10 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 15 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 12 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 15 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 14 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 18 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 20 },
      { questionId: 'L3Q1', answer: -2, timeTaken: 22 },
      { questionId: 'L3Q2', answer: 4, timeTaken: 18 },
      { questionId: 'L3Q3', answer: -4, timeTaken: 15 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 20 },
      { questionId: 'L3Q5', answer: 7, timeTaken: 30 },
      { questionId: 'L4Q1', answer: 6, timeTaken: 18 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 25 },
      { questionId: 'L4Q3', answer: -3, timeTaken: 30 },
      { questionId: 'L4Q4', answer: 3, timeTaken: 22 },
      { questionId: 'L4Q5', answer: 80, timeTaken: 35 },
    ],
  },

  // ── Student 11: Word problem + order of operations mix ──
  {
    id: 'student_11',
    name: 'Aiden Thompson',
    avatar: '👨‍🎓',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 14 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 16 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 12 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 18 },
      { questionId: 'L1Q5', answer: 160, timeTaken: 55 },  // Major word problem error
      { questionId: 'L2Q1', answer: 3.5, timeTaken: 35 },  // Order of operations
      { questionId: 'L2Q2', answer: 7, timeTaken: 30 },
      { questionId: 'L2Q3', answer: 4.5, timeTaken: 38 },  // Order of operations
      { questionId: 'L2Q4', answer: 18, timeTaken: 40 },
      { questionId: 'L2Q5', answer: 14, timeTaken: 60 },   // Word problem error
    ],
  },

  // ── Student 12: Computation errors ──
  {
    id: 'student_12',
    name: 'Mia Garcia',
    avatar: '👩‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 12 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 14 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 10 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 16 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 25 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 22 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 25 },
      { questionId: 'L2Q3', answer: 3, timeTaken: 28 },    // Arithmetic error
      { questionId: 'L2Q4', answer: 18, timeTaken: 35 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 40 },
      { questionId: 'L3Q1', answer: -2, timeTaken: 32 },
      { questionId: 'L3Q2', answer: 4, timeTaken: 28 },
      { questionId: 'L3Q3', answer: -4, timeTaken: 22 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 30 },
      { questionId: 'L3Q5', answer: 7, timeTaken: 45 },
      { questionId: 'L4Q1', answer: 6, timeTaken: 28 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 40 },
      { questionId: 'L4Q3', answer: -3, timeTaken: 45 },
      { questionId: 'L4Q4', answer: 3, timeTaken: 35 },
      { questionId: 'L4Q5', answer: 80, timeTaken: 50 },
    ],
  },

  // ── Student 13: Inconsistent performer ──
  {
    id: 'student_13',
    name: 'Ethan Brown',
    avatar: '🧑‍🎓',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 12 },
      { questionId: 'L1Q2', answer: 7, timeTaken: 25 },    // Inverse error
      { questionId: 'L1Q3', answer: 5, timeTaken: 15 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 20 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 30 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 28 },
      { questionId: 'L2Q2', answer: -7, timeTaken: 35 },   // Sign error
      { questionId: 'L2Q3', answer: 4, timeTaken: 30 },
      { questionId: 'L2Q4', answer: 10, timeTaken: 42 },   // Inverse error
      { questionId: 'L2Q5', answer: 8, timeTaken: 40 },
      { questionId: 'L3Q1', answer: -2, timeTaken: 38 },
      { questionId: 'L3Q2', answer: 10, timeTaken: 42 },   // Inverse error
      { questionId: 'L3Q3', answer: -4, timeTaken: 25 },
      { questionId: 'L3Q4', answer: 7, timeTaken: 45 },    // Inverse + sign error
      { questionId: 'L3Q5', answer: -7, timeTaken: 55 },   // Sign error
    ],
  },

  // ── Student 14: Strong procedural, weak conceptual ──
  {
    id: 'student_14',
    name: 'Isabella White',
    avatar: '👩‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 10 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 12 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 8 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 14 },
      { questionId: 'L1Q5', answer: 2.5, timeTaken: 50 },  // Word problem: divided instead
      { questionId: 'L2Q1', answer: 2, timeTaken: 20 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 22 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 18 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 28 },
      { questionId: 'L2Q5', answer: 11, timeTaken: 55 },   // Word problem error
      { questionId: 'L3Q1', answer: -2, timeTaken: 25 },
      { questionId: 'L3Q2', answer: 4, timeTaken: 22 },
      { questionId: 'L3Q3', answer: -4, timeTaken: 18 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 25 },
      { questionId: 'L3Q5', answer: 9, timeTaken: 60 },    // Word problem error
      { questionId: 'L4Q1', answer: 6, timeTaken: 22 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 30 },
      { questionId: 'L4Q3', answer: -3, timeTaken: 35 },
      { questionId: 'L4Q4', answer: 3, timeTaken: 28 },
      { questionId: 'L4Q5', answer: 8, timeTaken: 65 },    // Word problem error
    ],
  },

  // ── Student 15: Struggles heavily with everything ──
  {
    id: 'student_15',
    name: 'Ryan Mitchell',
    avatar: '👨‍🎓',
    grade: '6th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 17, timeTaken: 40 },   // Inverse error
      { questionId: 'L1Q2', answer: 7, timeTaken: 45 },    // Inverse error
      { questionId: 'L1Q3', answer: 12, timeTaken: 50 },   // Subtracted instead of divided
      { questionId: 'L1Q4', answer: 10, timeTaken: 55 },   // Added instead of multiplied
      { questionId: 'L1Q5', answer: 20, timeTaken: 60 },   // Foundational
    ],
  },

  // ── Student 16: Distribution errors at level 4 ──
  {
    id: 'student_16',
    name: 'Hannah Clark',
    avatar: '👩‍💻',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 8 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 10 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 7 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 12 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 18 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 14 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 18 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 16 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 22 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 28 },
      { questionId: 'L3Q1', answer: -2, timeTaken: 25 },
      { questionId: 'L3Q2', answer: 4, timeTaken: 22 },
      { questionId: 'L3Q3', answer: -4, timeTaken: 18 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 25 },
      { questionId: 'L3Q5', answer: 7, timeTaken: 35 },
      { questionId: 'L4Q1', answer: 14, timeTaken: 40 },   // Order: 12+2=14, ignored the 3
      { questionId: 'L4Q2', answer: 11, timeTaken: 50 },   // Distribution error
      { questionId: 'L4Q3', answer: -9, timeTaken: 55 },   // Distribution error
      { questionId: 'L4Q4', answer: 1, timeTaken: 48 },    // Distribution error
      { questionId: 'L4Q5', answer: 80, timeTaken: 55 },
    ],
  },

  // ── Student 17: Fast but careless ──
  {
    id: 'student_17',
    name: 'Lucas Anderson',
    avatar: '👨‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 5 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 6 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 4 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 7 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 12 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 8 },
      { questionId: 'L2Q2', answer: -7, timeTaken: 10 },  // Careless sign error
      { questionId: 'L2Q3', answer: 4, timeTaken: 9 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 12 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 15 },
      { questionId: 'L3Q1', answer: 2, timeTaken: 14 },   // Careless sign error
      { questionId: 'L3Q2', answer: 4, timeTaken: 12 },
      { questionId: 'L3Q3', answer: 4, timeTaken: 8 },    // Careless: agreed with wrong
      { questionId: 'L3Q4', answer: 3, timeTaken: 15 },
      { questionId: 'L3Q5', answer: 7, timeTaken: 20 },
      { questionId: 'L4Q1', answer: 6, timeTaken: 12 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 18 },
      { questionId: 'L4Q3', answer: 3, timeTaken: 20 },   // Sign error
      { questionId: 'L4Q4', answer: -3, timeTaken: 15 },  // Sign error
      { questionId: 'L4Q5', answer: 80, timeTaken: 22 },
    ],
  },

  // ── Student 18: Mixed issues, moderate level ──
  {
    id: 'student_18',
    name: 'Chloe Taylor',
    avatar: '👩‍🎓',
    grade: '7th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 15 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 18 },
      { questionId: 'L1Q3', answer: 45, timeTaken: 25 },  // Inverse: multiplied
      { questionId: 'L1Q4', answer: 24, timeTaken: 22 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 30 },
      { questionId: 'L2Q1', answer: 5, timeTaken: 35 },   // Order error
      { questionId: 'L2Q2', answer: 7, timeTaken: 30 },
      { questionId: 'L2Q3', answer: 18, timeTaken: 40 },  // Inverse: added 1
      { questionId: 'L2Q4', answer: 18, timeTaken: 38 },
      { questionId: 'L2Q5', answer: 44, timeTaken: 55 },  // Word problem error
    ],
  },

  // ── Student 19: All correct until level 4 word problem ──
  {
    id: 'student_19',
    name: 'Noah Wilson',
    avatar: '🧑‍🎓',
    grade: '8th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 7, timeTaken: 8 },
      { questionId: 'L1Q2', answer: 13, timeTaken: 10 },
      { questionId: 'L1Q3', answer: 5, timeTaken: 7 },
      { questionId: 'L1Q4', answer: 24, timeTaken: 12 },
      { questionId: 'L1Q5', answer: 12, timeTaken: 18 },
      { questionId: 'L2Q1', answer: 2, timeTaken: 15 },
      { questionId: 'L2Q2', answer: 7, timeTaken: 18 },
      { questionId: 'L2Q3', answer: 4, timeTaken: 15 },
      { questionId: 'L2Q4', answer: 18, timeTaken: 22 },
      { questionId: 'L2Q5', answer: 8, timeTaken: 25 },
      { questionId: 'L3Q1', answer: -2, timeTaken: 22 },
      { questionId: 'L3Q2', answer: 4, timeTaken: 20 },
      { questionId: 'L3Q3', answer: -4, timeTaken: 15 },
      { questionId: 'L3Q4', answer: 3, timeTaken: 22 },
      { questionId: 'L3Q5', answer: 7, timeTaken: 32 },
      { questionId: 'L4Q1', answer: 6, timeTaken: 20 },
      { questionId: 'L4Q2', answer: 9, timeTaken: 28 },
      { questionId: 'L4Q3', answer: -3, timeTaken: 32 },
      { questionId: 'L4Q4', answer: 3, timeTaken: 25 },
      { questionId: 'L4Q5', answer: 0.8, timeTaken: 65 },  // Word problem: decimal confusion
    ],
  },

  // ── Student 20: Beginner, guessing on most ──
  {
    id: 'student_20',
    name: 'Zoe Harris',
    avatar: '👩‍🎓',
    grade: '6th Grade',
    responses: [
      { questionId: 'L1Q1', answer: 12, timeTaken: 50 },  // Picked number from equation
      { questionId: 'L1Q2', answer: 3, timeTaken: 55 },   // Picked number
      { questionId: 'L1Q3', answer: 15, timeTaken: 48 },  // Picked number
      { questionId: 'L1Q4', answer: 4, timeTaken: 52 },   // Picked divisor
      { questionId: 'L1Q5', answer: 20, timeTaken: 60 },  // Picked number from problem
    ],
  },
];

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SAMPLE_STUDENTS };
}
