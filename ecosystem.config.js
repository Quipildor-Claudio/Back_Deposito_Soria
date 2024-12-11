module.exports = {
    apps : [{
      name: "Sistema Deposito Soria Api",
      script: "./serve.js",
      watch:false,
      exec_mode:'cluster',
      max_memory_restart:'1000M',
      instances:1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }