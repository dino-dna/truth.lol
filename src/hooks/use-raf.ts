export const useRaf = (fn: () => void) => {
  let isRunning = false;
  let runOnComplete = false;
  return () => {
    if (isRunning) {
      runOnComplete = true;
      return;
    }
    isRunning = true;
    const run = () => {
      Promise.resolve(fn()).finally(() => {
        if (runOnComplete) return run();
        // reset state!
        isRunning = false;
        runOnComplete = false;
      });
    };
    window.requestAnimationFrame(run);
  };
};
