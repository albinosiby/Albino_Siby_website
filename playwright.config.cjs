const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests', workers: 1,
  use: {baseURL: 'http://127.0.0.1:4180', launchOptions: {executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox']}},
  webServer: {command: 'python3 -m http.server 4180 --directory dist', url: 'http://127.0.0.1:4180', reuseExistingServer: false},
  projects: [
    {name: 'desktop', use: {viewport: {width: 1440, height: 1000}}},
    {name: 'mobile', use: {viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true}}
  ]
});
