/**
 * Tema "Bosque encantado" para Flores Poéticas
 * Paleta: verde bosque, musgo, crema, rosa pétalo, dorado tenue
 */

export const themeColors = {
  forest: '#1B3A2B',
  moss: '#4F6F52',
  cream: '#F5F1E9',
  petal: '#D9A5B3',
  gold: '#C2A878',
};

export const themeFonts = {
  title: "'Playfair Display', Georgia, serif",
  body: "'Lora', 'Libre Baskerville', Georgia, serif",
};

const antdTheme = {
  token: {
    colorPrimary: themeColors.forest,
    colorPrimaryHover: themeColors.moss,
    colorPrimaryActive: '#0f261c',
    colorSuccess: themeColors.moss,
    colorWarning: themeColors.gold,
    colorError: '#b85450',
    colorInfo: themeColors.moss,
    colorBgContainer: '#ffffff',
    colorBgLayout: 'transparent',
    colorBgElevated: 'rgba(255, 255, 255, 0.92)',
    colorBorder: 'rgba(27, 58, 43, 0.12)',
    colorBorderSecondary: 'rgba(27, 58, 43, 0.06)',
    colorText: '#1B3A2B',
    colorTextSecondary: '#4F6F52',
    fontFamily: themeFonts.body,
    fontSize: 15,
    borderRadius: 16,
    borderRadiusLG: 20,
    borderRadiusSM: 12,
    boxShadow: '0 4px 20px rgba(27, 58, 43, 0.08)',
    boxShadowSecondary: '0 8px 32px rgba(27, 58, 43, 0.12)',
  },
  components: {
    Button: {
      primaryShadow: '0 2px 8px rgba(27, 58, 43, 0.25)',
      defaultShadow: '0 2px 6px rgba(27, 58, 43, 0.06)',
      borderRadius: 9999,
      borderRadiusLG: 9999,
      borderRadiusSM: 9999,
      fontWeight: 500,
      controlHeight: 40,
      controlHeightLG: 44,
    },
    Card: {
      borderRadiusLG: 20,
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(27, 58, 43, 0.06)',
      boxShadowTertiary: '0 8px 40px rgba(27, 58, 43, 0.1)',
    },
    Input: {
      borderRadius: 12,
      activeShadow: '0 0 0 2px rgba(79, 111, 82, 0.2)',
    },
    Table: {
      borderRadius: 12,
    },
    Menu: {
      itemBorderRadius: 12,
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverColor: '#fff',
      itemSelectedColor: '#fff',
      itemSelectedBg: 'rgba(79, 111, 82, 0.5)',
      itemHoverBg: 'rgba(79, 111, 82, 0.25)',
    },
    Layout: {
      headerBg: 'transparent',
      bodyBg: 'transparent',
    },
  },
};

export default antdTheme;
