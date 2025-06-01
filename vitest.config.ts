import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
