/**
 * AI Tutor - Personalized Learning Plan Generator
 * 
 * Takes assessment results and generates tailored, actionable learning plans
 * based on diagnosed cognitive difficulties.
 */

const LearningPlanGenerator = (() => {

  // ══════════════════════════════════════════════════════════════
  // Remediation Knowledge Base
  // Maps each difficulty type to targeted learning strategies
  // ══════════════════════════════════════════════════════════════

  const REMEDIATION_STRATEGIES = {
    D1: {
      name: 'Word Problem Interpretation',
      strategies: [
        {
          title: 'Keyword Identification Practice',
          description: 'Practice identifying mathematical keywords in word problems. Highlight words like "increased by" (addition), "decreased by" (subtraction), "times" (multiplication), "divided among" (division).',
          activity: 'Create a table: write 10 common word problem phrases in one column and the operation they represent in another.',
          estimatedTime: '20 minutes',
          priority: 'high',
        },
        {
          title: 'Translate Words to Equations',
          description: 'Before solving, write out the equation from the word problem. Focus on one sentence at a time.',
          activity: 'Take 5 word problems and only translate them into equations — don\'t solve yet. Check your equations before proceeding.',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
        {
          title: 'Draw It Out',
          description: 'Use visual representations (diagrams, number lines) to understand what the word problem is asking.',
          activity: 'For each word problem, draw a simple picture or diagram before writing the equation.',
          estimatedTime: '25 minutes',
          priority: 'medium',
        },
        {
          title: 'Rewrite in Your Own Words',
          description: 'Restate the problem in simpler language to ensure understanding before solving.',
          activity: 'Read each problem, close it, and rewrite what it\'s asking in your own words. Then check.',
          estimatedTime: '15 minutes',
          priority: 'medium',
        },
      ],
      resources: [
        { type: 'video', title: 'How to Solve Word Problems Step-by-Step', url: 'https://www.khanacademy.org/math/algebra-basics/alg-basics-linear-equations-and-inequalities' },
        { type: 'practice', title: 'Word Problem Keywords Worksheet', description: 'Match keywords to operations' },
        { type: 'tip', title: 'CUBES Strategy', description: 'Circle numbers, Underline question, Box keywords, Evaluate, Solve' },
      ],
    },

    D2: {
      name: 'Procedural Error (Isolation)',
      strategies: [
        {
          title: 'Step-by-Step Checklist',
          description: 'Follow a structured checklist for solving equations: (1) Simplify each side, (2) Add/subtract to isolate the variable term, (3) Multiply/divide to solve for the variable.',
          activity: 'Solve 5 two-step equations while writing down each step and naming what you\'re doing (e.g., "subtract 3 from both sides").',
          estimatedTime: '20 minutes',
          priority: 'high',
        },
        {
          title: 'Balance Scale Visualization',
          description: 'Think of the equation as a balance scale. Whatever you do to one side, you must do to the other.',
          activity: 'Use a virtual balance scale tool or draw one for 3 equations to visualize the solving process.',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
        {
          title: 'Check Your Work',
          description: 'After solving, substitute your answer back into the original equation to verify.',
          activity: 'Solve 5 equations, then substitute each answer back in to check. If it doesn\'t work, find your error.',
          estimatedTime: '25 minutes',
          priority: 'medium',
        },
        {
          title: 'Reverse Engineering',
          description: 'Start with the answer and work backwards to build the equation. This builds intuition for the solving process.',
          activity: 'Given answers (x = 3, x = -2, x = 7), create equations and then solve them to verify.',
          estimatedTime: '15 minutes',
          priority: 'low',
        },
      ],
      resources: [
        { type: 'video', title: 'Solving Two-Step Equations', url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:solve-equations-inequalities' },
        { type: 'interactive', title: 'Equation Balance Scale', description: 'Interactive balance scale for equations' },
        { type: 'practice', title: 'Step-by-Step Equation Worksheet', description: 'Fill-in-the-blank steps for solving equations' },
      ],
    },

    D3: {
      name: 'Sign/Arithmetic Errors',
      strategies: [
        {
          title: 'Number Line Practice',
          description: 'Use a number line to visualize positive and negative numbers. Practice adding and subtracting negatives by moving left and right.',
          activity: 'Draw a number line from -10 to 10. Solve 8 problems involving negative numbers by marking your movements.',
          estimatedTime: '20 minutes',
          priority: 'high',
        },
        {
          title: 'Sign Rules Review',
          description: 'Review and memorize the rules for multiplying/dividing with negative numbers: (+)(+)=+, (+)(-)=-, (-)(-)=+.',
          activity: 'Create flashcards with sign rule combinations. Quiz yourself until you get 20 in a row correct.',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
        {
          title: 'Color-Coded Signs',
          description: 'When solving equations, use different colors for positive and negative terms to track signs visually.',
          activity: 'Solve 5 equations using blue for positive terms and red for negative terms.',
          estimatedTime: '20 minutes',
          priority: 'medium',
        },
        {
          title: 'Double-Check Division by Negatives',
          description: 'When dividing by a negative coefficient, pause and explicitly check: does the sign flip?',
          activity: 'Solve 5 equations with negative coefficients (like -2x = 8). After each, verify: "Did I flip the sign?"',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
      ],
      resources: [
        { type: 'video', title: 'Negative Numbers in Equations', url: 'https://www.khanacademy.org/math/arithmetic/arith-review-negative-numbers' },
        { type: 'game', title: 'Integer Operations Game', description: 'Practice adding, subtracting, multiplying negatives' },
        { type: 'tip', title: 'The Sign Check', description: 'Before writing your final answer, re-check: did you divide/multiply by a negative? If yes, did you flip the sign?' },
      ],
    },

    D4: {
      name: 'Foundational Gap',
      strategies: [
        {
          title: 'What is a Variable?',
          description: 'Understand that a variable (like x) represents an unknown number — it\'s a "mystery number" that makes the equation true.',
          activity: 'Fill in blanks: __ + 5 = 12, __ × 3 = 15. Notice that finding the blank is the same as "solving for x".',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
        {
          title: 'Equation as a Sentence',
          description: 'Read equations as sentences: "x + 5 = 12" means "some number plus five equals twelve".',
          activity: 'Write 5 equations as English sentences, then write 5 English sentences as equations.',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
        {
          title: 'Guess and Check Method',
          description: 'Start solving equations by trying different numbers for x until you find one that works. Then learn the algebraic method.',
          activity: 'For x + 3 = 10, try x = 5 (5+3=8, no), x = 6 (6+3=9, no), x = 7 (7+3=10, yes!). Do this for 5 equations.',
          estimatedTime: '20 minutes',
          priority: 'high',
        },
        {
          title: 'Real-World Connections',
          description: 'Connect variables to real-world scenarios: "You have some apples. You get 5 more and now have 12. How many did you start with?"',
          activity: 'Create 3 real-world scenarios that can be written as simple equations. Solve them.',
          estimatedTime: '20 minutes',
          priority: 'medium',
        },
      ],
      resources: [
        { type: 'video', title: 'Introduction to Variables', url: 'https://www.khanacademy.org/math/algebra/introduction-to-algebra' },
        { type: 'interactive', title: 'Mystery Number Machine', description: 'Interactive tool: input a number, see the output, guess the rule' },
        { type: 'practice', title: 'Variables Basics Worksheet', description: 'Fill-in-the-blank style equation solving' },
      ],
    },

    D5: {
      name: 'Order of Operations',
      strategies: [
        {
          title: 'Reverse PEMDAS for Solving',
          description: 'When solving equations, undo operations in reverse order (reverse PEMDAS): first undo addition/subtraction, then multiplication/division.',
          activity: 'For 2x + 3 = 7: undo +3 first (subtract 3), then undo ×2 (divide by 2). Practice with 6 equations.',
          estimatedTime: '20 minutes',
          priority: 'high',
        },
        {
          title: 'Identify the Operations',
          description: 'Before solving, list all operations being performed on x, in order. Then reverse that list to solve.',
          activity: 'For 3x - 5 = 16, list: "x → multiply by 3 → subtract 5 = 16". Reverse: "add 5, then divide by 3".',
          estimatedTime: '15 minutes',
          priority: 'high',
        },
        {
          title: 'Two-Step Equation Framework',
          description: 'Always follow this framework: (1) Deal with the constant term first (+/-), (2) Then deal with the coefficient (×/÷).',
          activity: 'Solve 8 two-step equations, explicitly labeling "Step 1: remove constant" and "Step 2: remove coefficient".',
          estimatedTime: '25 minutes',
          priority: 'high',
        },
      ],
      resources: [
        { type: 'video', title: 'Order of Operations in Equations', url: 'https://www.khanacademy.org/math/pre-algebra/pre-algebra-arith-prop/pre-algebra-order-of-operations' },
        { type: 'mnemonic', title: 'Undoing PEMDAS', description: 'To solve, undo in reverse: Addition/Subtraction first, then Multiplication/Division' },
        { type: 'practice', title: 'Two-Step Equations Drill', description: 'Practice with guided steps' },
      ],
    },

    D6: {
      name: 'Inverse Operation Confusion',
      strategies: [
        {
          title: 'Operation Pairs',
          description: 'Memorize inverse operation pairs: Addition ↔ Subtraction, Multiplication ↔ Division.',
          activity: 'Create a two-column chart: "Operation" and "Inverse". Fill in for +, -, ×, ÷. Quiz yourself.',
          estimatedTime: '10 minutes',
          priority: 'high',
        },
        {
          title: 'The Undo Game',
          description: 'Think of solving as "undoing" what was done to x. If 5 was added, undo by subtracting 5.',
          activity: 'For each equation, write: "What was done to x?" → "What undoes it?" → Apply. Do 8 equations.',
          estimatedTime: '20 minutes',
          priority: 'high',
        },
        {
          title: 'Inverse Operation Practice Cards',
          description: 'Practice recognizing which inverse operation to use in common equation patterns.',
          activity: 'Given 10 one-step equations, just identify the correct operation (don\'t solve). Check answers.',
          estimatedTime: '10 minutes',
          priority: 'medium',
        },
        {
          title: 'Real-World Inverses',
          description: 'Connect inverses to real life: locking/unlocking, wrapping/unwrapping, heating/cooling.',
          activity: 'List 5 real-world inverse pairs, then connect each to a math operation pair.',
          estimatedTime: '10 minutes',
          priority: 'low',
        },
      ],
      resources: [
        { type: 'video', title: 'Inverse Operations', url: 'https://www.khanacademy.org/math/algebra-basics/alg-basics-linear-equations-and-inequalities' },
        { type: 'interactive', title: 'Inverse Operations Match Game', description: 'Match operations to their inverses' },
        { type: 'practice', title: 'One-Step Equations with Inverses', description: 'Practice identifying and applying inverse operations' },
      ],
    },
  };

  // ══════════════════════════════════════════════════════════════
  // Plan Generation
  // ══════════════════════════════════════════════════════════════

  /**
   * Generate a personalized learning plan from assessment results
   */
  function generatePlan(assessmentResult) {
    const plan = {
      summary: '',
      overallScore: assessmentResult.overallScore,
      level: assessmentResult.highestMasteredLevel,
      focusAreas: [],
      strengths: assessmentResult.strengths,
      nextSteps: [],
      estimatedTotalTime: 0,
      encouragement: '',
    };

    // Generate summary
    plan.summary = generateSummary(assessmentResult);
    plan.encouragement = generateEncouragement(assessmentResult.overallScore);

    // Generate focus areas from primary difficulties
    assessmentResult.primaryDifficulties.forEach((difficulty, index) => {
      const strategy = REMEDIATION_STRATEGIES[difficulty.type];
      if (!strategy) return;

      const focusArea = {
        rank: index + 1,
        difficulty: difficulty,
        strategies: strategy.strategies
          .filter((s, i) => {
            // For high severity, include all high+medium priority
            if (difficulty.severity === 'high') return s.priority === 'high' || s.priority === 'medium';
            // For medium, include high priority
            if (difficulty.severity === 'medium') return s.priority === 'high';
            // For low, include first high priority only
            return i === 0;
          }),
        resources: strategy.resources,
      };

      // Calculate time for this area
      focusArea.totalTime = focusArea.strategies.reduce((sum, s) => {
        return sum + parseInt(s.estimatedTime) || 0;
      }, 0);

      plan.focusAreas.push(focusArea);
      plan.estimatedTotalTime += focusArea.totalTime;
    });

    // Generate ordered next steps
    plan.nextSteps = generateNextSteps(plan.focusAreas, assessmentResult);

    // Generate Curriculum Roadmap
    plan.curriculum = generateCurriculum(assessmentResult);

    // Provide behavior-specific tactical steps
    if (assessmentResult.behavioralInsights) {
      assessmentResult.behavioralInsights.forEach(behavior => {
        let strategy = null;

        if (behavior.type === 'Rushing / Carelessness' || behavior.type === 'Rapid Guessing') {
          strategy = {
            title: 'Slow Down Strategy ⏱️',
            description: 'You are answering too quickly which leads to careless errors and guessing.',
            activity: 'For the next 10 practice questions, set a timer and force yourself NOT to answer for at least 15 seconds. Use that time to read the question twice.',
            estimatedTime: 'Every session',
            priority: 'high',
          };
        } else if (behavior.type === 'Requires Active Intervention') {
          strategy = {
            title: 'Step Back & Reset 🧘',
            description: 'You are spending a lot of time and getting frustrated. Hard work is good, but burning out is not!',
            activity: 'Stop practicing linear equations for today. Review your foundational concept videos before trying again.',
            estimatedTime: '15 minutes',
            priority: 'high',
          };
        }

        if (strategy) {
          // Add to Focus Areas (so it renders in UI)
          plan.focusAreas.unshift({
            rank: 0,
            difficulty: {
              type: 'BEHAVIOR',
              name: 'Mentality Check: ' + behavior.type,
              icon: behavior.icon,
              severity: behavior.severity,
            },
            strategies: [strategy],
            resources: [
              { type: 'tip', title: 'Mental Reset', description: 'Taking a breath and adjusting your pace is just as important as the math itself.' }
            ],
            totalTime: parseInt(strategy.estimatedTime) || 0,
          });

          // Add to Next Steps
          plan.nextSteps.unshift({
            step: 0,
            title: strategy.title,
            description: strategy.description,
            activity: strategy.activity,
            estimatedTime: strategy.estimatedTime,
            difficultyType: 'behavior',
            difficultyName: behavior.type,
            priority: 'high',
          });
        }
      });
      
      // Update step numbers & rank after unshifting
      plan.nextSteps.forEach((s, i) => s.step = i + 1);
      plan.focusAreas.forEach((area, i) => area.rank = i + 1);
    }

    return plan;
  }

  /**
   * Generate a natural-language summary of the assessment
   */
  function generateSummary(result) {
    const score = result.overallScore;
    const difficulties = result.primaryDifficulties;
    const strengths = result.strengths;

    let summary = '';

    if (score >= 90) {
      summary = `Excellent performance! You scored ${score}% and demonstrated strong understanding across all areas tested.`;
    } else if (score >= 70) {
      summary = `Good work! You scored ${score}% and show solid foundations.`;
    } else if (score >= 50) {
      summary = `You scored ${score}%. There are some areas that need attention, but you have a good starting foundation.`;
    } else if (score >= 30) {
      summary = `You scored ${score}%. Don't worry — everyone starts somewhere, and we have a clear plan to help you improve!`;
    } else {
      summary = `You scored ${score}%. This tells us exactly where to focus. Let's build a strong foundation together!`;
    }

    if (difficulties.length > 0) {
      const topDifficulty = difficulties[0];
      summary += ` Your main area for improvement is **${topDifficulty.name}**.`;
    }

    if (strengths.length > 0) {
      summary += ` Great news: you're solid in ${strengths.slice(0, 2).join(' and ')}.`;
    }

    return summary;
  }

  /**
   * Generate encouraging message based on score
   */
  function generateEncouragement(score) {
    if (score >= 90) return '🌟 Outstanding! Keep challenging yourself with more complex problems!';
    if (score >= 70) return '💪 You\'re on the right track! A little focused practice will take you to the next level.';
    if (score >= 50) return '📈 Every expert was once a beginner. Your dedication to practice will pay off!';
    if (score >= 30) return '🌱 Growth starts here! Follow the plan below and you\'ll see real improvement.';
    return '🎯 Let\'s focus on the fundamentals first — they\'re the building blocks for everything else!';
  }

  /**
   * Generate ordered, actionable next steps
   */
  function generateNextSteps(focusAreas, result) {
    const steps = [];
    let stepNumber = 1;

    focusAreas.forEach(area => {
      area.strategies.forEach(strategy => {
        steps.push({
          step: stepNumber++,
          title: strategy.title,
          description: strategy.description,
          activity: strategy.activity,
          estimatedTime: strategy.estimatedTime,
          difficultyType: area.difficulty.type,
          difficultyName: area.difficulty.name,
          priority: strategy.priority,
        });
      });
    });

    // Add a general "test yourself" step at the end
    steps.push({
      step: stepNumber,
      title: 'Re-Assessment',
      description: 'After completing the activities above, take the assessment again to measure your progress.',
      activity: 'Retake the assessment and compare your results to see how much you\'ve improved!',
      estimatedTime: '15 minutes',
      difficultyType: 'general',
      difficultyName: 'Progress Check',
      priority: 'medium',
    });

    return steps;
  }

  /**
   * Generate a Week-by-Week Curriculum Roadmap based on mastery and difficulties
   */
  function generateCurriculum(result) {
    const weeks = [];
    let weekCounter = 1;

    // Build map of specific difficulties for quick lookup
    const diffMap = result.primaryDifficulties.reduce((acc, d) => {
      acc[d.type] = true;
      return acc;
    }, {});

    // Check if foundational review is needed
    const l1Attempted = result.levelScores[1].total > 0;
    const l1Struggled = l1Attempted && (result.levelScores[1].correct / result.levelScores[1].total) < 0.8;
    const needsFoundations = l1Struggled || diffMap['D4'] || diffMap['D6'] || diffMap['D3'] || result.overallScore < 50;

    if (needsFoundations) {
      weeks.push({
        title: `Week ${weekCounter++}: Foundations & Number Sense`,
        description: 'Building a rock-solid understanding of variables, negative numbers, and inverse operations.',
        modules: [
          diffMap['D4'] ? 'Conquering the Variable (What is X?)' : 'Reviewing One-Step Equations',
          diffMap['D3'] ? 'Mastering Negative Numbers on the Number Line' : 'Variable Operations',
          diffMap['D6'] ? 'The Undo Game (Inverse Operations)' : 'Checking Your Answers'
        ],
        icon: '🧱',
        status: 'current'
      });
    }

    // Core procedures (Level 2 & D2 & D5)
    const l2Attempted = result.levelScores[2].total > 0;
    const l2Struggled = l2Attempted && (result.levelScores[2].correct / result.levelScores[2].total) < 0.8;
    const needsProcedures = l2Struggled || diffMap['D2'] || diffMap['D5'];

    if (needsProcedures || weeks.length === 0) {
      weeks.push({
        title: `Week ${weekCounter++}: Structural Procedures`,
        description: 'Learning the exact step-by-step algorithms to tear down equations without making mistakes.',
        modules: [
          diffMap['D5'] ? 'Reverse Order of Operations (PEMDAS)' : 'The Two-Step Equation Framework',
          diffMap['D2'] ? 'The Balance Scale Strategy' : 'Isolating the Variable Step-by-Step',
          'Combining Like Terms'
        ],
        icon: '⚙️',
        status: weeks.length === 0 ? 'current' : 'upcoming'
      });
    }

    // Advanced & Applied (Level 3/4 & D1)
    const l34Struggled = (result.levelScores[3].total > 0 && result.levelScores[3].correct/result.levelScores[3].total < 0.8) || 
                         (result.levelScores[4].total > 0 && result.levelScores[4].correct/result.levelScores[4].total < 0.8);
    const needsAdvanced = l34Struggled || diffMap['D1'];

    if (needsAdvanced || weeks.length <= 1) {
      weeks.push({
        title: `Week ${weekCounter++}: Advanced Application`,
        description: 'Translating English into Math, handling parentheses, and solving complex problems.',
        modules: [
          diffMap['D1'] ? 'Decoding Word Problems (Translating Equations)' : 'Multi-Step Equation Strategies',
          'Distributive Property & Parentheses',
          'Variables on Both Sides'
        ],
        icon: '🚀',
        status: weeks.length === 0 ? 'current' : 'upcoming'
      });
    }

    // Always append Mastery week
    weeks.push({
      title: `Week ${weekCounter++}: Mastery & Synthesis`,
      description: 'Taking the final assessment to prove your mastery of linear equations.',
      modules: ['Timed Practice Sessions', 'Comprehensive Re-Assessment', 'Next Topic Introduction: Inequalities'],
      icon: '🏆',
      status: weeks.length === 0 ? 'current' : 'upcoming'
    });

    return weeks;
  }

  /**
   * Get remediation strategies for a specific difficulty type
   */
  function getStrategiesForDifficulty(difficultyType) {
    return REMEDIATION_STRATEGIES[difficultyType] || null;
  }

  // Public API
  return {
    generatePlan,
    getStrategiesForDifficulty,
    REMEDIATION_STRATEGIES,
  };

})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LearningPlanGenerator };
}
