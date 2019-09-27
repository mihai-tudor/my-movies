import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

export default async function launchChromeAndRunLighthouse(url) {
  const opts = {
    chromeFlags: ['--disable-web-security'],
    onlyCategories: ['performance'],
  };

  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
  opts.port = chrome.port;
  const results = await lighthouse(url, opts);
  await chrome.kill();
  return results.lhr;
}
