import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // VS Code extension에서 watch 모드로 실행
    watch: false,
  },
});
