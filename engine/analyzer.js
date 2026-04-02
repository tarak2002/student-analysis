/**
 * AI Tutor - Assessment Analyzer Engine
 * 
 * Hybrid rule-based + pattern matching diagnosis system.
 * Analyzes student responses to identify cognitive difficulties.
 */

const AssessmentAnalyzer = (() => {

  /**
   * Analyze a single student response against a question
   */
  function analyzeResponse(question, studentAnswer) {
    const result = {
      questionId: question.id,
      level: question.level,
      type: question.type,
      studentAnswer: studentAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: false,
      diagnosedDifficulties: [],
      confidence: 0,
    };

    // Normalize answer for comparison
    const normalizedStudent = normalizeAnswer(studentAnswer);
    const normalizedCorrect = normalizeAnswer(question.correctAnswer);

    // Check if correct
    if (question.acceptableAnswers.some(a => normalizeAnswer(a) === normalizedStudent)) {
      result.isCorrect = true;
      result.confidence = 1.0;
      return result;
    }

    // Match against known wrong answers
    const wrongAnswerStr = String(studentAnswer).trim();
    if (question.wrongAnswers && question.wrongAnswers[wrongAnswerStr]) {
      result.diagnosedDifficulties = question.wrongAnswers[wrongAnswerStr].map(dType => ({
        type: dType,
        source: 'pattern_match',
        evidence: `Answer "${studentAnswer}" for "${question.equation || question.text.substring(0, 40)}..."`,
      }));
      result.confidence = 0.85;
    } else {
      // Fallback: infer difficulty from answer characteristics
      const inferred = inferDifficulty(question, studentAnswer);
      result.diagnosedDifficulties = inferred.difficulties;
      result.confidence = inferred.confidence;
    }

    return result;
  }

  /**
   * Normalize an answer for comparison (handle strings, numbers, whitespace)
   */
  function normalizeAnswer(answer) {
    if (answer === null || answer === undefined || answer === '') return '';
    const str = String(answer).trim().toLowerCase();
    const num = parseFloat(str);
    if (!isNaN(num)) return String(num);
    return str;
  }

  /**
   * Infer difficulty type when no exact wrong-answer pattern matches
   */
  function inferDifficulty(question, studentAnswer) {
    const difficulties = [];
    let confidence = 0.5;
    const answer = parseFloat(studentAnswer);
    const correct = parseFloat(question.correctAnswer);

    if (isNaN(answer)) {
      difficulties.push({
        type: 'D4',
        source: 'inference',
        evidence: `Non-numeric answer "${studentAnswer}" suggests foundational gap`,
      });
      confidence = 0.7;
      return { difficulties, confidence };
    }

    // Check if answer is the negative of correct (sign error)
    if (Math.abs(answer + correct) < 0.01 && correct !== 0) {
      difficulties.push({
        type: 'D3',
        source: 'inference',
        evidence: `Answer ${answer} is the negative of correct answer ${correct} — likely sign error`,
      });
      confidence = 0.8;
    }

    // Check if answer matches a number from the equation (foundational)
    if (question.equation) {
      const numbersInEquation = question.equation.match(/-?\d+\.?\d*/g) || [];
      if (numbersInEquation.map(Number).includes(answer) && answer !== correct) {
        difficulties.push({
          type: 'D4',
          source: 'inference',
          evidence: `Answer ${answer} is a number from the equation, not the solution — suggests foundational gap`,
        });
        confidence = 0.75;
      }
    }

    // Word problem: check if answer is way off (interpretation issue)
    if (question.type === 'word' && Math.abs(answer - correct) > correct * 2) {
      difficulties.push({
        type: 'D1',
        source: 'inference',
        evidence: `Answer ${answer} is far from correct (${correct}) on a word problem — likely interpretation error`,
      });
      confidence = 0.65;
    }

    // If nothing specific detected, mark as general procedural error
    if (difficulties.length === 0) {
      difficulties.push({
        type: 'D2',
        source: 'inference',
        evidence: `Answer ${answer} doesn't match known patterns — likely procedural error`,
      });
      confidence = 0.4;
    }

    return { difficulties, confidence };
  }

  /**
   * Analyze a complete set of student responses
   * Returns comprehensive assessment result
   */
  function analyzeStudent(studentResponses, personality = null) {
    const results = [];
    const difficultyCounts = {};
    const difficultyEvidence = {};
    let totalCorrect = 0;
    let totalAttempted = 0;
    const levelScores = { 1: { correct: 0, total: 0 }, 2: { correct: 0, total: 0 }, 3: { correct: 0, total: 0 }, 4: { correct: 0, total: 0 } };
    const typeScores = { solve: { correct: 0, total: 0 }, word: { correct: 0, total: 0 }, error_identification: { correct: 0, total: 0 } };

    // Initialize difficulty tracking
    Object.keys(DIFFICULTY_TYPES).forEach(d => {
      difficultyCounts[d] = 0;
      difficultyEvidence[d] = [];
    });

    // Analyze each response
    studentResponses.forEach(response => {
      const question = getQuestionById(response.questionId);
      if (!question) return;

      const analysis = analyzeResponse(question, response.answer);
      analysis.timeTaken = response.timeTaken;
      results.push(analysis);

      totalAttempted++;
      if (analysis.isCorrect) {
        totalCorrect++;
      }

      // Track level scores
      if (levelScores[question.level]) {
        levelScores[question.level].total++;
        if (analysis.isCorrect) levelScores[question.level].correct++;
      }

      // Track type scores
      if (typeScores[question.type]) {
        typeScores[question.type].total++;
        if (analysis.isCorrect) typeScores[question.type].correct++;
      }

      // Accumulate difficulty signals
      analysis.diagnosedDifficulties.forEach(d => {
        if (difficultyCounts[d.type] !== undefined) {
          difficultyCounts[d.type]++;
          difficultyEvidence[d.type].push(d.evidence);
        }
      });
    });

    // Calculate overall score
    const overallScore = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    // Determine primary difficulties (sorted by frequency, filter out 0)
    const primaryDifficulties = Object.entries(difficultyCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type,
        name: DIFFICULTY_TYPES[type]?.name || type,
        icon: DIFFICULTY_TYPES[type]?.icon || '❓',
        color: DIFFICULTY_TYPES[type]?.color || '#666',
        count,
        evidence: difficultyEvidence[type],
        severity: getSeverity(count, totalAttempted),
      }));

    // Determine strengths
    const strengths = [];
    Object.entries(levelScores).forEach(([level, score]) => {
      if (score.total > 0 && (score.correct / score.total) >= 0.8) {
        strengths.push(`Level ${level} equations`);
      }
    });
    Object.entries(typeScores).forEach(([type, score]) => {
      if (score.total > 0 && (score.correct / score.total) >= 0.8) {
        const typeName = type === 'solve' ? 'Procedural solving' : type === 'word' ? 'Word problems' : 'Error identification';
        strengths.push(typeName);
      }
    });

    // Determine highest level reached with >60% accuracy
    let highestMasteredLevel = 0;
    for (let l = 1; l <= 4; l++) {
      if (levelScores[l].total > 0 && (levelScores[l].correct / levelScores[l].total) >= 0.6) {
        highestMasteredLevel = l;
      } else {
        break;
      }
    }

    // Calculate average time
    const avgTime = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + (r.timeTaken || 0), 0) / results.length)
      : 0;

    // --- BEHAVIORAL ANALYSIS ---
    const behavioralInsights = [];
    
    // 1. Rushing / Carelessness (< 8s and incorrect)
    const rushingStats = results.filter(r => r.timeTaken < 8 && !r.isCorrect);
    if (rushingStats.length >= 3) {
      behavioralInsights.push({
        type: 'Rushing / Carelessness',
        icon: '⏱️',
        severity: 'high',
        description: `Rushed through ${rushingStats.length} questions in under 8 seconds, resulting in errors.`,
      });
    }

    // 2. Rapid Guessing (String of very fast < 5s errors)
    const rapidGuessing = results.filter(r => r.timeTaken < 5 && !r.isCorrect);
    if (rapidGuessing.length >= 2 && personality?.errorAttitude === 'avoidant') {
      behavioralInsights.push({
        type: 'Frustration-Driven Guessing',
        icon: '🏃',
        severity: 'high',
        description: `Avoidant error attitude combined with extremely rapid answering (<5s) indicates frustration.`,
      });
    } else if (rapidGuessing.length >= 3) {
      behavioralInsights.push({
        type: 'Rapid Guessing',
        icon: '🎲',
        severity: 'medium',
        description: `Multiple answers submitted almost instantly, suggesting guessing rather than solving.`,
      });
    }

    // 3. Methodical / Cautious (> 25s and correct)
    const methodicalStats = results.filter(r => r.timeTaken > 25 && r.isCorrect);
    if (methodicalStats.length >= 2 && overallScore >= 70) {
      behavioralInsights.push({
        type: 'Methodical & Cautious',
        icon: '🐢',
        severity: 'low',
        description: `Takes extended time (>25s) but achieves high accuracy. Indicates careful processing.`,
      });
    }

    // 4. Productive Struggle (> 25s and incorrect)
    const struggleStats = results.filter(r => r.timeTaken > 25 && !r.isCorrect);
    if (struggleStats.length >= 3) {
      behavioralInsights.push({
        type: 'Requires Active Intervention',
        icon: '🧗',
        severity: 'high',
        description: `Trying hard (spending >25s per question) but consistently getting them wrong. High risk of burnout.`,
      });
    } else if (struggleStats.length >= 1 && personality?.errorAttitude === 'persistent') {
      behavioralInsights.push({
        type: 'Productive Struggle',
        icon: '💪',
        severity: 'low',
        description: `Shows strong persistence on difficult questions due to 'persistent' error attitude.`,
      });
    }
    
    // Default positive behavior if none flagged
    if (behavioralInsights.length === 0) {
      behavioralInsights.push({
        type: 'Steady Pacing',
        icon: '✅',
        severity: 'low',
        description: 'Maintains a consistent, productive pace across different difficulty levels.',
      });
    }

    return {
      overallScore,
      totalCorrect,
      totalAttempted,
      levelScores,
      typeScores,
      primaryDifficulties,
      strengths,
      highestMasteredLevel,
      averageTime: avgTime,
      behavioralInsights,
      detailedResults: results,
    };
  }

  /**
   * Get severity label based on error count
   */
  function getSeverity(count, total) {
    const ratio = count / Math.max(total, 1);
    if (ratio >= 0.4) return 'high';
    if (ratio >= 0.2) return 'medium';
    return 'low';
  }

  /**
   * Determine if a student should advance to the next level
   * (Adaptive difficulty logic)
   */
  function shouldAdvanceLevel(levelResults) {
    if (levelResults.length === 0) return false;
    const correct = levelResults.filter(r => r.isCorrect).length;
    const accuracy = correct / levelResults.length;
    return accuracy >= 0.6; // 60% threshold to advance
  }

  // Public API
  return {
    analyzeResponse,
    analyzeStudent,
    shouldAdvanceLevel,
    normalizeAnswer,
  };

})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AssessmentAnalyzer };
}
