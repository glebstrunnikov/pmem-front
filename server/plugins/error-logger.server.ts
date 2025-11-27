export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("error", (error, { event }) => {
    const heap = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);

    console.error(
      "[ERR]",
      "path=",
      event?.path,
      "heap=",
      heap + "MB",
      "message=",
      error?.message
    );
  });
});
