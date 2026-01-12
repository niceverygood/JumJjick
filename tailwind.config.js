/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 점찍 브랜드 컬러
        'deepViolet': '#120924',        // 메인 배경
        'electricCoral': '#FF3366',     // Primary Action (점찍기 버튼)
        'mysticMint': '#00FFC2',        // Secondary Accent (궁합 점수)
        
        // 추가 컬러 팔레트
        'cardBg': '#1E1630',            // 카드 배경
        'starlight': '#FFFFFF',          // 메인 텍스트
        'lavenderGray': '#A79CB5',       // 서브 텍스트
        'error': '#FF4040',              // 에러/경고
        
        // 그라데이션용
        'deepVioletLight': '#1E1435',
        'coralDark': '#CC2952',
        'coralLight': '#FF5C85',
        'mintDark': '#00CC9B',
        'neonPurple': '#9B59FF',
        'neonBlue': '#4D7CFF',
      },
      fontFamily: {
        heading: ['System'],
        body: ['System'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        // 네온 글로우 효과
        'neon-coral': '0 0 20px rgba(255, 51, 102, 0.6), 0 0 40px rgba(255, 51, 102, 0.3)',
        'neon-mint': '0 0 20px rgba(0, 255, 194, 0.6), 0 0 40px rgba(0, 255, 194, 0.3)',
        'neon-purple': '0 0 20px rgba(155, 89, 255, 0.5)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'button': '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
