export default defineNitroPlugin(() => {
  setInterval(() => {
    const used = process.memoryUsage();
    const heap = Math.round(used.heapUsed / 1024 / 1024);
    const rss = Math.round(used.rss / 1024 / 1024);
    const uptime = Math.round(process.uptime() / 3600);

    console.log("[MEM]", `uptime=${uptime}h`, `heap=${heap}MB`, `rss=${rss}MB`);
  }, 1000 * 60 * 60); // every hour
});
