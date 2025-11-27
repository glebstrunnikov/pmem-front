export default defineEventHandler((event) => {
  const heap = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);

  if (heap > 600) {
    console.log("[MEM][REQ]", event.method, event.path, `heap=${heap}MB`);
  }
});
