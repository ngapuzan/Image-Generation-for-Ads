import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser',
  fullyParallel:false,
  use:{baseURL:'http://127.0.0.1:3100',headless:true,launchOptions:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{}},
  webServer:{command:'npm run dev',url:'http://127.0.0.1:3100/api/status',env:{PORT:'3100',IMAGE_API_KEY:''},reuseExistingServer:false,timeout:30000}
});
