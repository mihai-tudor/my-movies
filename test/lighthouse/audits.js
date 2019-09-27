const googleOptimal = {
  speedIndex: 1250,
  firstMeaningfulPaint: 1600,
  domSize: 1500,
  estimatedInputLatency: 50,
  totalByteWeight: 1638400,
  criticalRequestChains: 2,
};

const allAudits = [
  'first-contentful-paint',
  'first-meaningful-paint',
  'speed-index',
  'screenshot-thumbnails',
  'final-screenshot',
  'estimated-input-latency',
  'total-blocking-time',
  'max-potential-fid',
  'time-to-first-byte',
  'first-cpu-idle',
  'interactive',
  'user-timings',
  'critical-request-chains',
  'redirects',
  'mainthread-work-breakdown',
  'bootup-time',
  'uses-rel-preload',
  'uses-rel-preconnect',
  'font-display',
  'diagnostics',
  'network-requests',
  'network-rtt',
  'network-server-latency',
  'main-thread-tasks',
  'metrics',
  'performance-budget',
  'resource-summary',
  'third-party-summary',
  'uses-long-cache-ttl',
  'total-byte-weight',
  'offscreen-images',
  'render-blocking-resources',
  'unminified-css',
  'unminified-javascript',
  'unused-css-rules',
  'uses-webp-images',
  'uses-optimized-images',
  'uses-text-compression',
  'uses-responsive-images',
  'efficient-animated-content',
  'dom-size',
];

/**
 * Parses the Lighthouse audits to make them accessible from the tests.
 * @param {Object} report The Lighthouse report to parse.
 * @param {Object} pageOptimal The page optimal values.
 * @returns { {speedIndex: *, firstMeaningfulPaint: *, domSize: *, estimatedInputLatency: *,
 * totalByteWeight: *, criticalRequestChains: *} } The different audits to validate.
 */
const parseLighthouseReport = (report, pageOptimal) => {
  /**
   * Sanitize the audit value.
   * @param {number} value The audit value to be sanitized.
   * @param {string} auditName The audit used for logging purposes.
   * @returns {(number|error)} The audit sanitized value or n exception.
   */
  const sanitizeValue = (value, auditName) => {
    if (value === undefined || value === 0) {
      throw new Error(`The audit ${auditName} has incorrect value: ${value}`);
    } else {
      return value;
    }
  };

  const parseCriticalRequests = (valueObj) => {
    let value = 0;
    if (valueObj.displayValue.length > 0) {
      value = parseInt(valueObj.displayValue.split(' ')[0], 10);
    }
    return value;
  };

  const { audits } = report;

  console.log('======\n\n');
  // console.log(JSON.parse(audits));
  console.log(Object.keys(audits))
  console.log('\n\n======');

  const speedIndex = {
    value: sanitizeValue(audits['speed-index'].numericValue, 'speed-index'),
    googleOptimalValue: googleOptimal.speedIndex,
    pageOptimalValue: pageOptimal.speedIndex,
  };

  const firstMeaningfulPaint = {
    value: sanitizeValue(
      parseInt(audits['first-meaningful-paint'].numericValue, 10),
      'first-meaningful-paint',
    ),
    googleOptimalValue: googleOptimal.firstMeaningfulPaint,
    pageOptimalValue: pageOptimal.firstMeaningfulPaint,
  };

  const domSize = {
    value: sanitizeValue(audits['dom-size'].numericValue, 'dom-size'),
    googleOptimalValue: googleOptimal.domSize,
    pageOptimalValue: pageOptimal.domSize,
  };

  const estimatedInputLatency = {
    value: parseInt(audits['estimated-input-latency'].numericValue, 10),
    googleOptimalValue: googleOptimal.estimatedInputLatency,
    pageOptimalValue: pageOptimal.estimatedInputLatency,
  };

  const totalByteWeight = {
    value: sanitizeValue(
      audits['total-byte-weight'].numericValue,
      'total-byte-weight',
    ),
    googleOptimalValue: googleOptimal.totalByteWeight,
    pageOptimalValue: pageOptimal.totalByteWeight,
  };

  const criticalRequestChains = {
    value: parseCriticalRequests(audits['critical-request-chains']),
    googleOptimalValue: googleOptimal.criticalRequestChains,
    pageOptimalValue: pageOptimal.criticalRequestChains,
  };

  return {
    speedIndex,
    firstMeaningfulPaint,
    domSize,
    estimatedInputLatency,
    totalByteWeight,
    criticalRequestChains,
  };
};

module.exports = parseLighthouseReport;
