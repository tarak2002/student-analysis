/**
 * AI Tutor - Personality & Learning Style Assessment
 * 
 * Short personality/learning-style quiz administered before
 * the math assessment. Results are used to personalize the
 * learning plan recommendations.
 */

const PERSONALITY_TYPES = {
  visual: { id: 'visual', name: 'Visual Learner', icon: '👁️', color: '#6366F1',
    description: 'You learn best through images, diagrams, and spatial understanding.' },
  auditory: { id: 'auditory', name: 'Auditory Learner', icon: '👂', color: '#14B8A6',
    description: 'You learn best through listening, discussion, and verbal explanation.' },
  kinesthetic: { id: 'kinesthetic', name: 'Kinesthetic Learner', icon: '✋', color: '#F59E0B',
    description: 'You learn best through hands-on practice and physical activity.' },
  reading: { id: 'reading', name: 'Reading/Writing Learner', icon: '📖', color: '#10B981',
    description: 'You learn best through reading text and writing notes.' },
};

const CONFIDENCE_LEVELS = {
  high: { label: 'Confident', icon: '💪', color: '#10B981' },
  medium: { label: 'Somewhat Confident', icon: '🤔', color: '#F59E0B' },
  low: { label: 'Not Very Confident', icon: '😟', color: '#EF4444' },
};

const PERSONALITY_QUESTIONS = [
  {
    id: 'PQ1',
    category: 'learning_style',
    text: 'When learning something new, I prefer to:',
    options: [
      { id: 'a', text: 'Watch a video or look at diagrams', style: 'visual' },
      { id: 'b', text: 'Listen to someone explain it', style: 'auditory' },
      { id: 'c', text: 'Try it out hands-on', style: 'kinesthetic' },
      { id: 'd', text: 'Read instructions or take notes', style: 'reading' },
    ],
  },
  {
    id: 'PQ2',
    category: 'learning_style',
    text: 'When I get stuck on a math problem, I usually:',
    options: [
      { id: 'a', text: 'Draw a picture or diagram to understand it', style: 'visual' },
      { id: 'b', text: 'Talk through the steps out loud', style: 'auditory' },
      { id: 'c', text: 'Try different numbers until something works', style: 'kinesthetic' },
      { id: 'd', text: 'Re-read the problem and my notes carefully', style: 'reading' },
    ],
  },
  {
    id: 'PQ3',
    category: 'learning_style',
    text: 'I remember things best when I:',
    options: [
      { id: 'a', text: 'See color-coded charts or mind maps', style: 'visual' },
      { id: 'b', text: 'Discuss them with friends or a teacher', style: 'auditory' },
      { id: 'c', text: 'Practice with real-world examples', style: 'kinesthetic' },
      { id: 'd', text: 'Write summaries in my own words', style: 'reading' },
    ],
  },
  {
    id: 'PQ4',
    category: 'confidence',
    text: 'How confident do you feel about solving math equations?',
    options: [
      { id: 'a', text: 'Very confident — I enjoy the challenge!', confidence: 'high' },
      { id: 'b', text: 'Somewhat confident — I can do basic ones', confidence: 'medium' },
      { id: 'c', text: 'Not very confident — math makes me nervous', confidence: 'low' },
    ],
  },
  {
    id: 'PQ5',
    category: 'motivation',
    text: 'What motivates you most when studying?',
    options: [
      { id: 'a', text: 'Getting the right answer and seeing progress', motivation: 'achievement' },
      { id: 'b', text: 'Understanding WHY things work', motivation: 'curiosity' },
      { id: 'c', text: 'Competing with or helping classmates', motivation: 'social' },
      { id: 'd', text: 'Reaching a personal goal I\'ve set', motivation: 'goal' },
    ],
  },
  {
    id: 'PQ6',
    category: 'study_habits',
    text: 'When do you study best?',
    options: [
      { id: 'a', text: 'In short bursts (10-15 minutes)', pace: 'short' },
      { id: 'b', text: 'In medium sessions (30-45 minutes)', pace: 'medium' },
      { id: 'c', text: 'In long focused sessions (1+ hour)', pace: 'long' },
    ],
  },
  {
    id: 'PQ7',
    category: 'error_attitude',
    text: 'When I make a mistake on a problem, I usually:',
    options: [
      { id: 'a', text: 'Get frustrated and want to move on', attitude: 'avoidant' },
      { id: 'b', text: 'Try to figure out what went wrong', attitude: 'analytical' },
      { id: 'c', text: 'Ask for help from a teacher or friend', attitude: 'collaborative' },
      { id: 'd', text: 'Start over from scratch', attitude: 'persistent' },
    ],
  },
];

/**
 * Analyze personality quiz responses and return a profile
 */
function analyzePersonality(responses) {
  const styleCounts = { visual: 0, auditory: 0, kinesthetic: 0, reading: 0 };
  let confidence = 'medium';
  let motivation = 'achievement';
  let pace = 'medium';
  let errorAttitude = 'analytical';

  responses.forEach(r => {
    const question = PERSONALITY_QUESTIONS.find(q => q.id === r.questionId);
    if (!question) return;
    const selected = question.options.find(o => o.id === r.answerId);
    if (!selected) return;

    if (selected.style) styleCounts[selected.style]++;
    if (selected.confidence) confidence = selected.confidence;
    if (selected.motivation) motivation = selected.motivation;
    if (selected.pace) pace = selected.pace;
    if (selected.attitude) errorAttitude = selected.attitude;
  });

  // Determine primary learning style
  const primaryStyle = Object.entries(styleCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  // Determine secondary style (if tied or close)
  const sorted = Object.entries(styleCounts).sort((a, b) => b[1] - a[1]);
  const secondaryStyle = sorted[1][1] > 0 ? sorted[1][0] : null;

  return {
    primaryStyle,
    secondaryStyle,
    styleInfo: PERSONALITY_TYPES[primaryStyle],
    styleCounts,
    confidence,
    confidenceInfo: CONFIDENCE_LEVELS[confidence],
    motivation,
    pace,
    errorAttitude,
  };
}

/**
 * Generate sample personality profiles for demo students
 */
function generateSamplePersonality(studentId) {
  const profiles = {
    'student_01': { primaryStyle: 'reading', confidence: 'high', motivation: 'achievement', pace: 'medium', errorAttitude: 'analytical' },
    'student_02': { primaryStyle: 'visual', confidence: 'medium', motivation: 'curiosity', pace: 'short', errorAttitude: 'collaborative' },
    'student_03': { primaryStyle: 'kinesthetic', confidence: 'medium', motivation: 'achievement', pace: 'medium', errorAttitude: 'persistent' },
    'student_04': { primaryStyle: 'auditory', confidence: 'low', motivation: 'social', pace: 'short', errorAttitude: 'avoidant' },
    'student_05': { primaryStyle: 'kinesthetic', confidence: 'medium', motivation: 'goal', pace: 'long', errorAttitude: 'analytical' },
    'student_06': { primaryStyle: 'visual', confidence: 'low', motivation: 'curiosity', pace: 'short', errorAttitude: 'avoidant' },
    'student_07': { primaryStyle: 'auditory', confidence: 'low', motivation: 'social', pace: 'short', errorAttitude: 'collaborative' },
    'student_08': { primaryStyle: 'reading', confidence: 'medium', motivation: 'achievement', pace: 'medium', errorAttitude: 'analytical' },
    'student_09': { primaryStyle: 'visual', confidence: 'medium', motivation: 'goal', pace: 'medium', errorAttitude: 'persistent' },
    'student_10': { primaryStyle: 'reading', confidence: 'high', motivation: 'curiosity', pace: 'long', errorAttitude: 'analytical' },
    'student_11': { primaryStyle: 'kinesthetic', confidence: 'medium', motivation: 'social', pace: 'short', errorAttitude: 'avoidant' },
    'student_12': { primaryStyle: 'visual', confidence: 'high', motivation: 'achievement', pace: 'medium', errorAttitude: 'analytical' },
    'student_13': { primaryStyle: 'auditory', confidence: 'medium', motivation: 'goal', pace: 'medium', errorAttitude: 'persistent' },
    'student_14': { primaryStyle: 'reading', confidence: 'high', motivation: 'achievement', pace: 'long', errorAttitude: 'analytical' },
    'student_15': { primaryStyle: 'kinesthetic', confidence: 'low', motivation: 'social', pace: 'short', errorAttitude: 'avoidant' },
    'student_16': { primaryStyle: 'visual', confidence: 'high', motivation: 'curiosity', pace: 'medium', errorAttitude: 'analytical' },
    'student_17': { primaryStyle: 'kinesthetic', confidence: 'high', motivation: 'achievement', pace: 'short', errorAttitude: 'persistent' },
    'student_18': { primaryStyle: 'auditory', confidence: 'medium', motivation: 'social', pace: 'medium', errorAttitude: 'collaborative' },
    'student_19': { primaryStyle: 'reading', confidence: 'high', motivation: 'goal', pace: 'long', errorAttitude: 'analytical' },
    'student_20': { primaryStyle: 'visual', confidence: 'low', motivation: 'curiosity', pace: 'short', errorAttitude: 'collaborative' },
  };

  const p = profiles[studentId] || profiles['student_01'];
  return {
    ...p,
    styleInfo: PERSONALITY_TYPES[p.primaryStyle],
    confidenceInfo: CONFIDENCE_LEVELS[p.confidence],
    secondaryStyle: null,
    styleCounts: { visual: 0, auditory: 0, kinesthetic: 0, reading: 0, [p.primaryStyle]: 3 },
  };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PERSONALITY_QUESTIONS, PERSONALITY_TYPES, CONFIDENCE_LEVELS, analyzePersonality, generateSamplePersonality };
}
