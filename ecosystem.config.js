module.exports = {
  apps: [
    {
      name: 'e-wo',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: 'app.js',
      args: 'start',
      env: {
        NODE_ENV: 'development',
        ENV: 'test',
      },
      env_test: {
        NODE_ENV: 'development',
        ENV: 'test',
      },
      env_production: {
        NODE_ENV: 'production',
        ENV: 'prod',
      },
    },
  ],
}
