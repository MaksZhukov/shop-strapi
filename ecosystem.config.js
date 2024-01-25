module.exports = {
    apps: [
        // {
        //     name: "app1",
        //     script: "./server.js",
        //     env: {
        //         PORT: 1337,
        //         NODE_ENV: "production",
        //     },
        // },
        // {
        //     name: "app2",
        //     script: "./server.js",
        //     env: {
        //         PORT: 1338,
        //         NODE_ENV: "production",
        //     },
        // },
        {
            script: "server.js",
            env: {
                NODE_ENV: "production",
            },
            instances: "4",
            exec_mode: "cluster",
            max_memory_restart: "800M",
            restart_delay: 5000,
            min_uptime: 300,
            max_restarts: 3,
        },
    ],
};
