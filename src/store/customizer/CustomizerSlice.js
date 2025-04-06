import { createSlice } from '@reduxjs/toolkit';
import getStorage from '../../utils/storage';


const storage = getStorage('customizer_');
const getSetting = (key, value) => {
  const get = storage.get(key);
  if (get !== null) {
    return get;
  } else {
    storage.set(key, value);
    return value;
  }
}

const initialState = {
  activeDir: getSetting('activeDir', 'ltr'), // This can be ltr or rtl
  activeMode: getSetting('activeMode', 'light'), // This can be light or dark
  activeTheme: getSetting('activeTheme', 'BLUE_THEME'), // BLUE_THEME, GREEN_THEME, RED_THEME, BLACK_THEME, PURPLE_THEME, INDIGO_THEME
  SidebarWidth: getSetting('SidebarWidth', 270),
  MiniSidebarWidth: getSetting('MiniSidebarWidth', 87),
  TopbarHeight: getSetting('TopbarHeight', 70),
  isLayout: getSetting('isLayout', 'boxed'), // This can be full or boxed
  isCollapse: getSetting('isCollapse', false), // to make sidebar Mini by default
  isSidebarHover: getSetting('isSidebarHover', false),
  isMobileSidebar: getSetting('isMobileSidebar', false),
  isHorizontal: getSetting('isHorizontal', false),
  isLanguage: getSetting('isLanguage', 'en'),
  isCardShadow: getSetting('isCardShadow', true),
  borderRadius: getSetting('borderRadius', 7),
};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.activeTheme = action.payload;
      storage.set('activeTheme', state.activeTheme);
    },
    setDarkMode: (state, action) => {
      state.activeMode = action.payload;
      storage.set('activeMode', state.activeMode);
    },
    setDir: (state, action) => {
      state.activeDir = action.payload;
      storage.set('activeDir', state.activeDir);
    },
    setLanguage: (state, action) => {
      state.isLanguage = action.payload;
      storage.set('isLanguage', state.isLanguage);
    },
    setCardShadow: (state, action) => {
      state.isCardShadow = action.payload;
      storage.set('isCardShadow', state.isCardShadow);
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
      storage.set('isCollapse', state.isCollapse);
    },
    hoverSidebar: (state, action) => {
      state.isSidebarHover = action.payload;
      storage.set('isSidebarHover', state.isSidebarHover);
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebar = !state.isMobileSidebar;
      storage.set('isMobileSidebar', state.isMobileSidebar);
    },
    toggleLayout: (state, action) => {
      state.isLayout = action.payload;
      storage.set('isLayout', state.isLayout);
    },
    toggleHorizontal: (state, action) => {
      state.isHorizontal = action.payload;
      storage.set('isHorizontal', state.isHorizontal);
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
      storage.set('borderRadius', state.borderRadius);
    },
  },
});

export const {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  hoverSidebar,
  toggleMobileSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setLanguage,
  setCardShadow,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
