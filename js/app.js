/**
 * AI Tutor - Application Controller
 * Manages views, assessment flow (personality + math), results rendering, and educator dashboard
 */

const App = (() => {

  // ── State ──────────────────────────────────────────────────
  let currentView = 'landing';
  let personalityState = {
    currentIndex: 0,
    responses: [],
    profile: null,
  };
  let assessmentState = {
    currentQuestionIndex: 0,
    responses: [],
    questionPool: [],       // All questions randomized into single pool
    startTime: null,
    questionStartTime: null,
  };
  let currentResults = null;
  let currentPlan = null;
  let currentPersonality = null;

  // ── Initialization ─────────────────────────────────────────
  function init() {
    // Set up navigation
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
    });

    // Set up action buttons
    document.getElementById('btn-start-assessment').addEventListener('click', startPersonalityTest);
    document.getElementById('btn-view-demo').addEventListener('click', viewDemo);
    document.getElementById('btn-educator').addEventListener('click', () => navigateTo('educator'));
    document.getElementById('btn-submit-answer').addEventListener('click', submitAnswer);
    document.getElementById('btn-hint').addEventListener('click', toggleHint);
    document.getElementById('btn-view-plan').addEventListener('click', () => navigateTo('plan'));
    document.getElementById('btn-restart').addEventListener('click', () => navigateTo('landing'));

    // Enter key for answer submission
    document.getElementById('answer-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') submitAnswer();
    });

    // Scroll shadow on navbar
    window.addEventListener('scroll', () => {
      document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 10);
    });

    // Show landing view
    navigateTo('landing');
  }

  // ── Navigation ─────────────────────────────────────────────
  function navigateTo(view) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    // Show target view
    const targetView = document.getElementById(`view-${view}`);
    if (targetView) {
      targetView.classList.add('active');
      // Re-trigger animation
      targetView.style.animation = 'none';
      targetView.offsetHeight; // force reflow
      targetView.style.animation = null;
    }

    // Update nav buttons
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.nav === view);
    });

    currentView = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ══════════════════════════════════════════════════════════
  // PERSONALITY TEST FLOW
  // ══════════════════════════════════════════════════════════

  function startPersonalityTest() {
    personalityState = {
      currentIndex: 0,
      responses: [],
      profile: null,
    };
    navigateTo('personality');
    renderPersonalityQuestion();
  }

  function renderPersonalityQuestion() {
    const idx = personalityState.currentIndex;

    if (idx >= PERSONALITY_QUESTIONS.length) {
      // Done — analyse & move to math assessment
      currentPersonality = analyzePersonality(personalityState.responses);
      startMathAssessment();
      return;
    }

    const question = PERSONALITY_QUESTIONS[idx];
    const total = PERSONALITY_QUESTIONS.length;

    // Progress
    document.getElementById('personality-progress-fill').style.width =
      ((idx / total) * 100) + '%';
    document.getElementById('personality-progress-text').textContent =
      `Question ${idx + 1} of ${total}`;

    // Question text
    document.getElementById('personality-question-text').textContent = question.text;

    // Category badge
    const catMap = {
      learning_style: '🧠 Learning Style',
      confidence: '💪 Confidence',
      motivation: '🎯 Motivation',
      study_habits: '📚 Study Habits',
      error_attitude: '🔄 Problem Solving',
    };
    document.getElementById('personality-category').textContent =
      catMap[question.category] || question.category;

    // Options
    const container = document.getElementById('personality-options');
    container.innerHTML = '';

    question.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'personality-option';
      btn.style.animationDelay = `${i * 0.08}s`;
      btn.innerHTML = `
        <span class="option-letter">${opt.id.toUpperCase()}</span>
        <span class="option-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => selectPersonalityOption(question.id, opt.id));
      container.appendChild(btn);
    });

    // Animate card
    const card = document.getElementById('personality-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'questionSlideIn 0.4s ease';
  }

  function selectPersonalityOption(questionId, answerId) {
    // Visual feedback
    const options = document.querySelectorAll('.personality-option');
    options.forEach(opt => {
      opt.classList.remove('selected');
      opt.style.pointerEvents = 'none';
    });
    // Find the clicked option
    const question = PERSONALITY_QUESTIONS.find(q => q.id === questionId);
    const optIdx = question.options.findIndex(o => o.id === answerId);
    if (options[optIdx]) options[optIdx].classList.add('selected');

    personalityState.responses.push({ questionId, answerId });

    setTimeout(() => {
      personalityState.currentIndex++;
      renderPersonalityQuestion();
    }, 400);
  }

  // ══════════════════════════════════════════════════════════
  // MATH ASSESSMENT FLOW (Randomized Single Pool)
  // ══════════════════════════════════════════════════════════

  function startMathAssessment() {
    // Combine ALL questions into a single randomized pool
    const allQuestions = [...QUESTIONS];
    shuffleArray(allQuestions);

    assessmentState = {
      currentQuestionIndex: 0,
      responses: [],
      questionPool: allQuestions,
      startTime: Date.now(),
      questionStartTime: Date.now(),
    };

    navigateTo('assessment');
    renderQuestion();
  }

  /** Fisher-Yates shuffle */
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderQuestion() {
    const pool = assessmentState.questionPool;
    const idx = assessmentState.currentQuestionIndex;

    if (idx >= pool.length) {
      finishAssessment();
      return;
    }

    const question = pool[idx];
    assessmentState.questionStartTime = Date.now();

    const total = pool.length;
    const progressPercent = (idx / total) * 100;

    // Update progress bar
    document.querySelector('.progress-bar-fill').style.width = progressPercent + '%';
    document.querySelector('.progress-text').textContent =
      `Question ${idx + 1} of ${total}`;

    // Update level badge
    const levelBadge = document.getElementById('level-badge');
    levelBadge.className = `level-badge level-${question.level}`;
    levelBadge.textContent = `Level ${question.level}`;

    // Render question card
    const typeLabel = question.type === 'word' ? '📖 Word Problem' :
      question.type === 'error_identification' ? '🔍 Error Identification' : '✏️ Solve';

    document.getElementById('question-type-label').textContent = typeLabel;
    document.getElementById('question-text').textContent = question.text;

    // Show equation display for solve-type questions
    const eqDisplay = document.getElementById('equation-display');
    if (question.equation && question.type === 'solve') {
      eqDisplay.textContent = question.equation;
      eqDisplay.style.display = 'block';
    } else {
      eqDisplay.style.display = 'none';
    }

    // Clear input and hint
    const input = document.getElementById('answer-input');
    input.value = '';
    input.focus();
    document.getElementById('hint-box').classList.remove('visible');
    document.getElementById('hint-text').textContent = question.hint;

    // Animate card
    const card = document.querySelector('.question-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'questionSlideIn 0.4s ease';
  }

  function submitAnswer() {
    const input = document.getElementById('answer-input');
    const answer = input.value.trim();

    if (!answer) {
      input.style.borderColor = '#EF4444';
      setTimeout(() => input.style.borderColor = '', 500);
      return;
    }

    const pool = assessmentState.questionPool;
    const idx = assessmentState.currentQuestionIndex;
    const question = pool[idx];
    const timeTaken = Math.round((Date.now() - assessmentState.questionStartTime) / 1000);

    // Parse answer
    let parsedAnswer = answer;
    const num = parseFloat(answer);
    if (!isNaN(num)) parsedAnswer = num;

    // Store response
    assessmentState.responses.push({
      questionId: question.id,
      answer: parsedAnswer,
      timeTaken: timeTaken,
    });

    // Show feedback
    const analysis = AssessmentAnalyzer.analyzeResponse(question, parsedAnswer);
    showFeedback(analysis.isCorrect);

    // Move to next question after feedback
    setTimeout(() => {
      assessmentState.currentQuestionIndex++;
      renderQuestion();
    }, 800);
  }

  function showFeedback(isCorrect) {
    const overlay = document.getElementById('feedback-overlay');
    const icon = document.getElementById('feedback-icon');
    icon.textContent = isCorrect ? '✅' : '❌';
    overlay.classList.add('show');
    setTimeout(() => overlay.classList.remove('show'), 800);
  }

  function toggleHint() {
    const hintBox = document.getElementById('hint-box');
    hintBox.classList.toggle('visible');
  }

  function finishAssessment() {
    currentResults = AssessmentAnalyzer.analyzeStudent(assessmentState.responses, currentPersonality);
    currentPlan = LearningPlanGenerator.generatePlan(currentResults, currentPersonality);

    navigateTo('results');
    renderResults();
  }

  // ── Demo Mode ──────────────────────────────────────────────
  function viewDemo() {
    const randomIndex = Math.floor(Math.random() * SAMPLE_STUDENTS.length);
    const demoStudent = SAMPLE_STUDENTS[randomIndex];
    currentPersonality = generateSamplePersonality(demoStudent.id);
    currentResults = AssessmentAnalyzer.analyzeStudent(demoStudent.responses, currentPersonality);
    currentPlan = LearningPlanGenerator.generatePlan(currentResults, currentPersonality);

    navigateTo('results');
    renderResults(demoStudent);
  }

  // ══════════════════════════════════════════════════════════
  // RESULTS RENDERING
  // ══════════════════════════════════════════════════════════

  function renderResults(studentInfo = null) {
    if (!currentResults) return;

    // Animate score ring
    const scoreCanvas = document.getElementById('score-ring-canvas');
    const scoreNumber = document.getElementById('score-number');
    Charts.animateScoreRing(scoreCanvas, currentResults.overallScore, {
      size: 160,
      onUpdate: (val) => { scoreNumber.textContent = val + '%'; },
    });

    // Summary text
    const summaryEl = document.getElementById('results-summary');
    let summaryHtml = currentPlan.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (studentInfo) {
      summaryHtml = `<strong>${studentInfo.avatar} ${studentInfo.name}</strong> (${studentInfo.grade})<br><br>` + summaryHtml;
    }
    summaryEl.innerHTML = summaryHtml;

    // Stat cards
    document.getElementById('stat-correct').textContent = `${currentResults.totalCorrect}/${currentResults.totalAttempted}`;
    document.getElementById('stat-level').textContent = `Level ${currentResults.highestMasteredLevel}`;
    document.getElementById('stat-avg-time').textContent = `${currentResults.averageTime}s`;
    document.getElementById('stat-difficulties').textContent = currentResults.primaryDifficulties.length;

    // Personality profile
    renderPersonalityProfile();
    
    // Behaviors
    renderBehaviorProfile();

    // Level performance bars
    renderLevelPerformance();

    // Difficulty breakdown
    renderDifficultyBreakdown();

    // Charts
    renderResultsCharts();

    // Strengths
    renderStrengths();
  }

  function renderPersonalityProfile() {
    const container = document.getElementById('personality-profile-container');
    if (!container || !currentPersonality) {
      if (container) container.style.display = 'none';
      return;
    }
    container.style.display = 'block';

    const p = currentPersonality;
    container.innerHTML = `
      <h2 class="section-title">🧠 Learning Profile</h2>
      <div class="personality-profile-grid">
        <div class="personality-trait card">
          <div class="trait-icon" style="background: ${p.styleInfo.color}15; color: ${p.styleInfo.color};">
            ${p.styleInfo.icon}
          </div>
          <div class="trait-name">${p.styleInfo.name}</div>
          <div class="trait-desc">${p.styleInfo.description}</div>
        </div>
        <div class="personality-trait card">
          <div class="trait-icon" style="background: ${p.confidenceInfo.color}15; color: ${p.confidenceInfo.color};">
            ${p.confidenceInfo.icon}
          </div>
          <div class="trait-name">${p.confidenceInfo.label}</div>
          <div class="trait-desc">Math confidence level</div>
        </div>
        <div class="personality-trait card">
          <div class="trait-icon" style="background: #6366F115; color: #6366F1;">
            ${{ achievement: '🏆', curiosity: '🔍', social: '👥', goal: '🎯' }[p.motivation] || '🎯'}
          </div>
          <div class="trait-name">${p.motivation.charAt(0).toUpperCase() + p.motivation.slice(1)}-Driven</div>
          <div class="trait-desc">Primary motivation style</div>
        </div>
        <div class="personality-trait card">
          <div class="trait-icon" style="background: #14B8A615; color: #14B8A6;">
            ${{ short: '⚡', medium: '⏱️', long: '🕐' }[p.pace] || '⏱️'}
          </div>
          <div class="trait-name">${{ short: 'Short Bursts', medium: 'Medium Sessions', long: 'Deep Focus' }[p.pace]}</div>
          <div class="trait-desc">Preferred study duration</div>
        </div>
      </div>
    `;
  }

  function renderBehaviorProfile() {
    const container = document.getElementById('behavior-profile-container');
    if (!container || !currentResults || !currentResults.behavioralInsights || currentResults.behavioralInsights.length === 0) {
      if (container) container.style.display = 'none';
      return;
    }
    container.style.display = 'block';

    const insightsHtml = currentResults.behavioralInsights.map(insight => `
      <div class="personality-trait card" style="border-left: 4px solid var(--${insight.severity === 'high' ? 'red' : insight.severity === 'medium' ? 'amber' : 'emerald'}-400);">
        <div class="trait-icon" style="background: var(--gray-100); color: var(--gray-800);">
          ${insight.icon}
        </div>
        <div class="trait-name">${insight.type}</div>
        <div class="trait-desc">${insight.description}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <h2 class="section-title">⏱️ Mentality & Behavioral Analysis</h2>
      <div class="personality-profile-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        ${insightsHtml}
      </div>
    `;
  }

  function renderLevelPerformance() {
    const container = document.getElementById('level-perf-container');
    container.innerHTML = '';

    const targetHeights = [];

    for (let level = 1; level <= 4; level++) {
      const score = currentResults.levelScores[level];
      const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
      const attempted = score.total > 0;
      targetHeights.push(attempted ? pct : 0);

      const card = document.createElement('div');
      card.className = 'level-perf-card card';
      card.innerHTML = `
        <div class="level-perf-bar">
          <div class="level-perf-fill level-${level}" style="height: 0%; transition: none;"></div>
        </div>
        <div class="level-perf-score">${attempted ? pct + '%' : '—'}</div>
        <div class="level-perf-label">Level ${level}</div>
      `;
      container.appendChild(card);
    }

    // Force the browser to paint the 0% state first, then animate to target
    setTimeout(() => {
      const fills = container.querySelectorAll('.level-perf-fill');
      fills.forEach((fill, i) => {
        // Re-enable transition
        fill.style.transition = 'height 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        // Stagger the animation
        setTimeout(() => {
          fill.style.height = targetHeights[i] + '%';
        }, 50 + i * 150);
      });
    }, 100);
  }

  function renderDifficultyBreakdown() {
    const container = document.getElementById('difficulty-list');
    container.innerHTML = '';

    if (currentResults.primaryDifficulties.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <div class="icon">🎉</div>
          <p>No significant difficulties detected! Great job!</p>
        </div>
      `;
      return;
    }

    currentResults.primaryDifficulties.forEach((diff, i) => {
      const item = document.createElement('div');
      item.className = 'difficulty-item animate-in';
      item.style.animationDelay = `${i * 0.1}s`;
      item.innerHTML = `
        <div class="difficulty-icon-wrapper" style="background: ${diff.color}15;">
          ${diff.icon}
        </div>
        <div class="difficulty-info">
          <div class="difficulty-name">${diff.name}</div>
          <div class="difficulty-evidence">${diff.count} occurrence${diff.count > 1 ? 's' : ''} detected</div>
        </div>
        <span class="severity-badge ${diff.severity}">${diff.severity}</span>
      `;
      container.appendChild(item);
    });
  }

  function renderResultsCharts() {
    // Radar chart - skill areas
    const radarCanvas = document.getElementById('radar-chart');
    if (radarCanvas) {
      const typeData = [
        {
          label: 'One-step',
          value: currentResults.levelScores[1].total > 0
            ? (currentResults.levelScores[1].correct / currentResults.levelScores[1].total) * 100 : 0,
        },
        {
          label: 'Two-step',
          value: currentResults.levelScores[2].total > 0
            ? (currentResults.levelScores[2].correct / currentResults.levelScores[2].total) * 100 : 0,
        },
        {
          label: 'Negatives',
          value: currentResults.levelScores[3].total > 0
            ? (currentResults.levelScores[3].correct / currentResults.levelScores[3].total) * 100 : 0,
        },
        {
          label: 'Parentheses',
          value: currentResults.levelScores[4].total > 0
            ? (currentResults.levelScores[4].correct / currentResults.levelScores[4].total) * 100 : 0,
        },
        {
          label: 'Word Problems',
          value: currentResults.typeScores.word.total > 0
            ? (currentResults.typeScores.word.correct / currentResults.typeScores.word.total) * 100 : 0,
        },
      ];
      Charts.animateRadarChart(radarCanvas, typeData, { size: 280 });
    }

    // Bar chart - difficulty distribution
    const barCanvas = document.getElementById('bar-chart');
    if (barCanvas) {
      const barData = currentResults.primaryDifficulties.slice(0, 5).map(d => ({
        label: d.name.length > 18 ? d.name.substring(0, 18) + '…' : d.name,
        value: d.count,
        color: d.color,
      }));
      if (barData.length > 0) {
        Charts.animateBarChart(barCanvas, barData, { width: 400, height: 200 });
      } else {
        // Clear bar chart if no data
        const ctx = barCanvas.getContext('2d');
        ctx.clearRect(0, 0, barCanvas.width, barCanvas.height);
      }
    }
  }

  function renderStrengths() {
    const container = document.getElementById('strengths-container');
    container.innerHTML = '';

    if (currentResults.strengths.length === 0) {
      container.innerHTML = '<span class="difficulty-evidence">Keep practicing to build your strengths!</span>';
      return;
    }

    currentResults.strengths.forEach(s => {
      const tag = document.createElement('span');
      tag.className = 'strength-tag';
      tag.innerHTML = `✅ ${s}`;
      container.appendChild(tag);
    });
  }

  // ══════════════════════════════════════════════════════════
  // LEARNING PLAN RENDERING
  // ══════════════════════════════════════════════════════════

  function renderPlan() {
    if (!currentPlan) return;

    // Encouragement
    document.getElementById('plan-encouragement').textContent = currentPlan.encouragement;

    // Meta info
    document.getElementById('plan-total-time').textContent = currentPlan.estimatedTotalTime + ' min';
    document.getElementById('plan-focus-count').textContent = currentPlan.focusAreas.length + ' areas';
    document.getElementById('plan-steps-count').textContent = currentPlan.nextSteps.length + ' steps';

    // Personality-tailored note
    const personalityNote = document.getElementById('plan-personality-note');
    if (personalityNote && currentPersonality) {
      const p = currentPersonality;
      const styleAdvice = {
        visual: 'diagrams, color-coded notes, and video walkthroughs',
        auditory: 'verbal explanations, discussion with peers, and audio resources',
        kinesthetic: 'hands-on activities, interactive tools, and physical manipulatives',
        reading: 'written instructions, note-taking, and reading worked examples',
      };
      const paceAdvice = {
        short: 'Keep study sessions to 10-15 minutes with breaks',
        medium: 'Aim for 30-minute focused sessions',
        long: 'Extended deep-focus sessions will work well for you',
      };
      personalityNote.innerHTML = `
        <div class="personality-plan-note">
          <strong>${p.styleInfo.icon} Tailored for your learning style:</strong>
          This plan emphasizes <strong>${styleAdvice[p.primaryStyle]}</strong>.
          ${paceAdvice[p.pace]}. Activities are ordered for a <strong>${p.motivation}-driven</strong> learner.
        </div>
      `;
      personalityNote.style.display = 'block';
    }

    // Curriculum Roadmap
    renderCurriculum();

    // Focus areas
    const container = document.getElementById('focus-areas-container');
    container.innerHTML = '';

    currentPlan.focusAreas.forEach((area, i) => {
      const focusEl = document.createElement('div');
      focusEl.className = 'focus-area animate-in';
      focusEl.style.animationDelay = `${i * 0.15}s`;

      const rankClass = i < 3 ? `rank-${i + 1}` : 'rank-3';

      let strategiesHtml = area.strategies.map(s => `
        <div class="strategy-item">
          <div class="strategy-title">
            ${s.title}
            <span class="strategy-time">⏱ ${s.estimatedTime}</span>
          </div>
          <div class="strategy-desc">${s.description}</div>
          <div class="strategy-activity">
            <strong>📝 Activity:</strong> ${s.activity}
          </div>
        </div>
      `).join('');

      let resourcesHtml = area.resources.map(r => {
        const icon = r.type === 'video' ? '🎥' : r.type === 'practice' ? '📝' : r.type === 'interactive' ? '🎮' : r.type === 'game' ? '🕹️' : r.type === 'tip' ? '💡' : '📚';
        return `<span class="resource-tag">
          ${icon} <span class="resource-type">${r.type}</span> ${r.title}
        </span>`;
      }).join('');

      focusEl.innerHTML = `
        <div class="focus-area-header" onclick="this.parentElement.querySelector('.focus-area-content').style.display = this.parentElement.querySelector('.focus-area-content').style.display === 'none' ? 'block' : 'none'">
          <div class="focus-area-rank ${rankClass}">${i + 1}</div>
          <div class="focus-area-info">
            <div class="focus-area-name">${area.difficulty.icon} ${area.difficulty.name}</div>
            <div class="focus-area-meta">${area.strategies.length} strategies · ~${area.totalTime} min · ${area.difficulty.severity} priority</div>
          </div>
          <span style="color: var(--text-muted); font-size: 1.2rem;">▾</span>
        </div>
        <div class="focus-area-content">
          ${strategiesHtml}
          <div class="resources-section">
            <div class="resources-title">📚 Recommended Resources</div>
            <div class="resource-tags">${resourcesHtml}</div>
          </div>
        </div>
      `;

      container.appendChild(focusEl);
    });
  }

  function renderCurriculum() {
    const container = document.getElementById('curriculum-container');
    if (!container || !currentPlan || !currentPlan.curriculum || currentPlan.curriculum.length === 0) {
      if (container) container.style.display = 'none';
      return;
    }
    
    container.style.display = 'block';
    
    const weeksHtml = currentPlan.curriculum.map(week => `
      <div class="curriculum-week ${week.status}">
        <div class="curriculum-week-icon">${week.icon}</div>
        <div class="curriculum-week-content">
          <div class="curriculum-week-title">
            ${week.title}
            <span class="curriculum-week-status">${week.status}</span>
          </div>
          <div class="curriculum-week-desc">${week.description}</div>
          <div class="curriculum-modules">
            ${week.modules.map(mod => `<div class="curriculum-module">${mod}</div>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <h2 class="section-title">🗺️ Learning Roadmap</h2>
      <p style="color: var(--text-muted); margin-bottom: var(--space-4);">Your customized week-by-week module progression to build mastery.</p>
      <div class="curriculum-timeline">
        ${weeksHtml}
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════
  // EDUCATOR DASHBOARD
  // ══════════════════════════════════════════════════════════

  function renderEducatorDashboard() {
    const studentAnalyses = SAMPLE_STUDENTS.map(student => {
      const results = AssessmentAnalyzer.analyzeStudent(student.responses);
      const personality = generateSamplePersonality(student.id);
      const plan = LearningPlanGenerator.generatePlan(results, personality);
      return { student, results, plan, personality };
    });

    // Class-wide stats
    const avgScore = Math.round(
      studentAnalyses.reduce((sum, a) => sum + a.results.overallScore, 0) / studentAnalyses.length
    );
    const strugglingCount = studentAnalyses.filter(a => a.results.overallScore < 50).length;
    const proficientCount = studentAnalyses.filter(a => a.results.overallScore >= 70).length;

    document.getElementById('dashboard-avg-score').textContent = avgScore + '%';
    document.getElementById('dashboard-total-students').textContent = studentAnalyses.length;
    document.getElementById('dashboard-struggling').textContent = strugglingCount;
    document.getElementById('dashboard-proficient').textContent = proficientCount;

    // Misconception heatmap
    const difficultyAgg = {};
    Object.keys(DIFFICULTY_TYPES).forEach(d => { difficultyAgg[d] = 0; });

    studentAnalyses.forEach(a => {
      a.results.primaryDifficulties.forEach(d => {
        difficultyAgg[d.type] = (difficultyAgg[d.type] || 0) + d.count;
      });
    });

    const heatmapContainer = document.getElementById('heatmap-container');
    heatmapContainer.innerHTML = '';

    Object.entries(DIFFICULTY_TYPES).forEach(([key, info]) => {
      const count = difficultyAgg[key] || 0;
      const maxCount = Math.max(...Object.values(difficultyAgg), 1);
      const intensity = count / maxCount;

      const r = Math.round(239 * intensity);
      const g = Math.round(239 * (1 - intensity) + 68 * intensity);
      const b = Math.round(68 + (1 - intensity) * 100);
      const bgAlpha = 0.1 + intensity * 0.2;

      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.style.background = `rgba(${r}, ${g}, ${b}, ${bgAlpha})`;
      cell.innerHTML = `
        <div class="cell-icon">${info.icon}</div>
        <div class="cell-count">${count}</div>
        <div class="cell-label">${info.name}</div>
      `;
      heatmapContainer.appendChild(cell);
    });

    // Donut chart
    const donutCanvas = document.getElementById('class-donut-chart');
    if (donutCanvas) {
      Charts.drawDonutChart(donutCanvas, [
        { label: 'Proficient (70%+)', value: proficientCount, color: '#10B981' },
        { label: 'Developing (40-69%)', value: studentAnalyses.filter(a => a.results.overallScore >= 40 && a.results.overallScore < 70).length, color: '#F59E0B' },
        { label: 'Struggling (<40%)', value: strugglingCount, color: '#EF4444' },
      ], { size: 200 });
    }

    // Student table
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = '';

    const sorted = [...studentAnalyses].sort((a, b) => a.results.overallScore - b.results.overallScore);

    sorted.forEach(({ student, results, personality }) => {
      const scoreClass = results.overallScore >= 70 ? 'good' : results.overallScore >= 40 ? 'medium' : 'poor';
      const topDiffs = results.primaryDifficulties.slice(0, 2);
      const diffTags = topDiffs.map(d =>
        `<span class="diff-tag" style="background: ${d.color}15; color: ${d.color};">${d.icon} ${d.name.split(' ')[0]}</span>`
      ).join('');

      const row = document.createElement('tr');
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => showStudentDetail(student, results, personality));
      row.innerHTML = `
        <td>
          <span class="student-name">
            <span class="avatar">${student.avatar}</span>
            ${student.name}
          </span>
        </td>
        <td>${student.grade}</td>
        <td><span class="score-pill ${scoreClass}">${results.overallScore}%</span></td>
        <td>${results.totalCorrect}/${results.totalAttempted}</td>
        <td>${personality.styleInfo.icon} ${personality.styleInfo.name.split(' ')[0]}</td>
        <td><div class="diff-tags">${diffTags || '<span class="diff-tag">None</span>'}</div></td>
      `;
      tbody.appendChild(row);
    });
  }

  function showStudentDetail(student, results, personality) {
    const plan = LearningPlanGenerator.generatePlan(results, personality);

    const modal = document.getElementById('student-modal');
    document.getElementById('modal-student-name').textContent = `${student.avatar} ${student.name}`;

    const body = document.getElementById('modal-student-body');
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: var(--space-6);">
        <div style="font-size: 3rem; margin-bottom: var(--space-2);">${student.avatar}</div>
        <div style="font-size: 1.2rem; font-weight: 700;">${student.name}</div>
        <div style="color: var(--text-muted); font-size: 0.88rem;">${student.grade} · Score: ${results.overallScore}%</div>
        <div style="display: flex; gap: var(--space-2); justify-content: center; margin-top: var(--space-3); flex-wrap: wrap;">
          <span class="diff-tag" style="background: ${personality.styleInfo.color}15; color: ${personality.styleInfo.color};">${personality.styleInfo.icon} ${personality.styleInfo.name}</span>
          <span class="diff-tag" style="background: ${personality.confidenceInfo.color}15; color: ${personality.confidenceInfo.color};">${personality.confidenceInfo.icon} ${personality.confidenceInfo.label}</span>
        </div>
      </div>

      <div class="section-title">📊 Performance by Level</div>
      <div class="level-perf-grid" style="margin-bottom: var(--space-6);">
        ${[1, 2, 3, 4].map(level => {
          const s = results.levelScores[level];
          const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
          return `
            <div class="level-perf-card card" style="padding: var(--space-3);">
              <div class="level-perf-bar" style="height: 50px;">
                <div class="level-perf-fill level-${level}" style="height: ${s.total > 0 ? pct : 0}%;"></div>
              </div>
              <div class="level-perf-score">${s.total > 0 ? pct + '%' : '—'}</div>
              <div class="level-perf-label">L${level}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="section-title">⚠️ Diagnosed Difficulties</div>
      <div style="margin-bottom: var(--space-6);">
        ${results.primaryDifficulties.length > 0 ? results.primaryDifficulties.map(d => `
          <div class="difficulty-item" style="margin-bottom: var(--space-2);">
            <div class="difficulty-icon-wrapper" style="background: ${d.color}15;">${d.icon}</div>
            <div class="difficulty-info">
              <div class="difficulty-name">${d.name}</div>
              <div class="difficulty-evidence">${d.count} occurrence${d.count > 1 ? 's' : ''}</div>
            </div>
            <span class="severity-badge ${d.severity}">${d.severity}</span>
          </div>
        `).join('') : '<p style="color: var(--text-muted);">No significant difficulties detected! 🎉</p>'}
      </div>

      <div class="section-title">📋 Recommended Plan</div>
      <div class="plan-encouragement" style="margin-bottom: var(--space-4);">${plan.encouragement}</div>
      ${plan.focusAreas.slice(0, 2).map((area, i) => `
        <div style="margin-bottom: var(--space-3); padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-md);">
          <div style="font-weight: 600; margin-bottom: var(--space-2);">${area.difficulty.icon} ${area.difficulty.name}</div>
          ${area.strategies.slice(0, 1).map(s => `
            <div style="font-size: 0.88rem; color: var(--text-secondary);">${s.title}: ${s.description.substring(0, 150)}...</div>
          `).join('')}
        </div>
      `).join('')}
    `;

    modal.classList.add('show');
    document.getElementById('modal-close').onclick = () => modal.classList.remove('show');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('show'); };
  }

  // ── View Lifecycle Hooks ───────────────────────────────────
  const originalNavigateTo = navigateTo;

  function navigateToWithHooks(view) {
    if (view === 'plan' && currentPlan) {
      originalNavigateTo(view);
      renderPlan();
    } else if (view === 'educator') {
      originalNavigateTo(view);
      renderEducatorDashboard();
    } else {
      originalNavigateTo(view);
    }
  }

  navigateTo = navigateToWithHooks;

  // ── Public API ─────────────────────────────────────────────
  return { init };

})();

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
