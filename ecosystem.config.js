module.exports = {
    apps: [
        {
            name: `mits_data`,
            script: "serve",
            env: {
                PM2_SERVE_PATH: "./frontend/dist",
                PM2_SERVE_PORT: 5173,
                PM2_SERVE_SPA: "true",
                NODE_ENV: 'production',
            },
        },
    ],
};
