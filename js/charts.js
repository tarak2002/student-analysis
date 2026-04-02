/**
 * AI Tutor - Lightweight Canvas Charts
 * Custom chart rendering for assessment results visualization
 */

const Charts = (() => {

  /**
   * Draw a score ring (donut chart)
   */
  function drawScoreRing(canvas, score, options = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = options.size || 160;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = (size / 2) - 12;
    const lineWidth = 10;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * (score / 100));

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#F3F4F6';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Animated fill
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    if (score >= 70) {
      gradient.addColorStop(0, '#10B981');
      gradient.addColorStop(1, '#14B8A6');
    } else if (score >= 40) {
      gradient.addColorStop(0, '#F59E0B');
      gradient.addColorStop(1, '#FBBF24');
    } else {
      gradient.addColorStop(0, '#EF4444');
      gradient.addColorStop(1, '#F87171');
    }

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  /**
   * Animate score ring from 0 to target
   */
  function animateScoreRing(canvas, targetScore, options = {}) {
    let current = 0;
    const duration = options.duration || 1500;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(targetScore * eased);
      drawScoreRing(canvas, current, options);

      // Update text if callback provided
      if (options.onUpdate) {
        options.onUpdate(current);
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  /**
   * Draw a horizontal bar chart
   */
  function drawBarChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = options.width || 400;
    const height = options.height || 250;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 20, bottom: 40, left: 120 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const barHeight = Math.min(30, (chartHeight / data.length) - 8);
    const maxValue = Math.max(...data.map(d => d.value), 1);

    data.forEach((item, i) => {
      const y = padding.top + i * (chartHeight / data.length) + (chartHeight / data.length - barHeight) / 2;
      const barWidth = (item.value / maxValue) * chartWidth;

      // Label
      ctx.fillStyle = '#4B5563';
      ctx.font = '500 12px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, padding.left - 10, y + barHeight / 2);

      // Bar background
      ctx.fillStyle = '#F3F4F6';
      ctx.beginPath();
      ctx.roundRect(padding.left, y, chartWidth, barHeight, 4);
      ctx.fill();

      // Bar fill
      if (barWidth > 0) {
        const gradient = ctx.createLinearGradient(padding.left, 0, padding.left + barWidth, 0);
        gradient.addColorStop(0, item.color || '#6366F1');
        gradient.addColorStop(1, item.colorEnd || lightenColor(item.color || '#6366F1', 20));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(padding.left, y, barWidth, barHeight, 4);
        ctx.fill();
      }

      // Value
      ctx.fillStyle = '#6B7280';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(item.value, padding.left + barWidth + 8, y + barHeight / 2);
    });
  }

  /**
   * Animate bar chart
   */
  function animateBarChart(canvas, data, options = {}) {
    const duration = options.duration || 1200;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const animatedData = data.map(d => ({
        ...d,
        value: Math.round(d.value * eased),
      }));

      drawBarChart(canvas, animatedData, options);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  /**
   * Draw a radar chart for skill areas
   */
  function drawRadarChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = options.size || 280;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radius = (size / 2) - 40;
    const n = data.length;
    const angleStep = (2 * Math.PI) / n;

    // Draw grid
    for (let ring = 1; ring <= 4; ring++) {
      const r = (radius / 4) * ring;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ring === 4 ? '#D1D5DB' : '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = idx * angleStep - Math.PI / 2;
      const r = (data[idx].value / 100) * radius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = (data[i].value / 100) * radius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#6366F1';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Labels
    ctx.fillStyle = '#4B5563';
    ctx.font = '500 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const labelR = radius + 22;
      let x = cx + labelR * Math.cos(angle);
      let y = cy + labelR * Math.sin(angle);

      // Adjust text alignment based on position
      if (Math.abs(Math.cos(angle)) > 0.8) {
        ctx.textAlign = Math.cos(angle) > 0 ? 'left' : 'right';
      } else {
        ctx.textAlign = 'center';
      }

      ctx.fillText(data[i].label, x, y);
    }
  }

  /**
   * Animate radar chart
   */
  function animateRadarChart(canvas, data, options = {}) {
    const duration = options.duration || 1200;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const animatedData = data.map(d => ({
        ...d,
        value: d.value * eased,
      }));

      drawRadarChart(canvas, animatedData, options);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  /**
   * Draw a simple pie / donut chart for the educator dashboard
   */
  function drawDonutChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = options.size || 200;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const outerRadius = (size / 2) - 10;
    const innerRadius = outerRadius * 0.6;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    let currentAngle = -Math.PI / 2;

    data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      currentAngle += sliceAngle;
    });
  }

  /**
   * Lighten a hex color
   */
  function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  }

  // Public API
  return {
    drawScoreRing,
    animateScoreRing,
    drawBarChart,
    animateBarChart,
    drawRadarChart,
    animateRadarChart,
    drawDonutChart,
  };

})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Charts };
}
