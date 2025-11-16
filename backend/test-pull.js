const { pullRepo } = require('./controllers/pull.controller');

(async () => {
  try {
    console.log('Starting pullRepo test...');
    await pullRepo();
    console.log('pullRepo finished successfully');
  } catch (err) {
    console.error('pullRepo failed with error:');
    console.error(err);
    process.exitCode = 1;
  }
})();