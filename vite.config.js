import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/<Components>/', // 여기에 GitHub 레포 이름 넣기
  plugins: [react()],
});
