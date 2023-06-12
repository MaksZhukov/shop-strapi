export default [
    {
        method: "GET",
        path: "/jobs",
        handler: "controller.findJobs",
        config: {
            policies: [],
        },
    },
    {
        method: "POST",
        path: "/jobs",
        handler: "controller.createJob",
        config: {
            policies: [],
        },
    },
    {
        method: "DELETE",
        path: "/jobs/:id",
        handler: "controller.deleteJob",
        config: {
            policies: [],
        },
    },
];
