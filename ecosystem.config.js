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
            // instances: "max",
            env: {
                NODE_ENV: "production",
            },
            // exec_mode: "cluster",
        },
    ],
};
