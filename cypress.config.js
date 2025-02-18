const { defineConfig } = require("cypress");

const mochawesome = require('cypress-mochawesome-reporter/plugin');
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

const allureWriter = require("@shelex/cypress-allure-plugin/writer");//  loads  Allure  writer module add plugin for  enable allure report
const zephyr = require("zephyr-cypress-plugin");


module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {  //✅ Marking function as async ,But
    // implement node event listeners here  

      // Mochawesome reporter plugin setup
      mochawesome(on);
       
                    /*for Cucumber BDD integration, async/await is required 
                         because addCucumberPreprocessorPlugin is an async function.
                               */
     await addCucumberPreprocessorPlugin(on, config); // ✅ Waiting for async operation
      on("file:preprocessor", createEsbuildPlugin(config));
      allureWriter(on, config); // enable allure report Writes test execution data to allure-results/
     
      // JUnit Reporter
      on('after:run', (results) => {
        const { junitReport } = require('jest-junit');
        junitReport(results, 'cypress/reports/junit');
      });
      /* 
       1.in cmd   npm install zephyr-cypress-plugin --save-dev
      
       2. add config plugins  For Zephyr:
       Install a Zephyr plugin (if available) or use Zephyr REST API.
       Use curl to upload results to Zephyr.
      */
      zephyr(on, config); // Initialize Zephyr plugin (if available)

      // Enable filtering by tags ensures tag value passed correctly ci/cd
      config.env.TAGS = process.env.TAGS || "";

      return config;
    },
    // 👇 Ensures Cypress finds `.feature` files in the specified directory
    specPattern: "cypress/e2e/**/*.feature",//update [package.json file] 1 testfiles , 2.nonglobalstepdefintions,stepdefenitions

    /* for reporting mochawesome :
    in cmd -npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev
     modify config.js in reporter options 
    in cmd -npm install @shelex/cypress-allure-plugin --save-dev

    */
    /* reporter: "cypress-mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",    // Directory for storing results
      overwrite: false,                   // Do not overwrite previous reports
      html: true, // Generate HTML report  // html : false only generate JSON reports,                    
      json: true ,
      timestamp: 'mmddyyyy_HHMMss',                        // ✅ Generates a JSON report for merging
    },*/

    reporter: "mocha-multi-reporters", // for multiple reports using multi-reporter-config.json
    reporterOptions: {
      configFile: "multi-reporter-config.json"
    },

    reporterOptions: {
      allureResults: "cypress/reports/allure-results"
    },

    env: {
      allure: true  // // Enable Allure reporting dynamically , correct approch is env  for dynamic controll

      /*How to View Allure Reports After Test Execution:How to View Allure Reports After Test Execution:
      //Generate Allure Report (if using CI/CD):
      in cmd 1. allure generate cypress/reports --clean -o cypress/allure-report
      in cmd 2.allure open cypress/allure-report   open it automatically in browser
     */
    },

    env: {
      TAGS: "@smoke", // Run only smoke tests tagging in feature file
    },

    baseUrl: "https://example.com",
    browser: ["chrome", "firefox", "edge"], //  config for multiple broswers- cross-broswer testing parallel
  },
});
 