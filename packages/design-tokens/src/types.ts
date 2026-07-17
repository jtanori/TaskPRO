/**
 * TaskPRO Design Tokens — public types.
 *
 * These types define the contract consumed by downstream expeditions (E3 UI,
 * mobile, web, future platforms). No downstream code should depend on raw
 * values; it depends only on these typed token and theme contracts.
 */

export type HexColor = string;
export type Pixels = number;
export type Percentage = string;
export type ShadowValue = string;

export type ThemeName = 'light' | 'dark' | 'highContrast';
export type ShadowMode = 'physical' | 'overlay' | 'border';
export type BorderEmphasis = 'subtle' | 'stronger' | 'prominent';

export interface ColorPalette {
  blue: HexColor;
  hover: HexColor;
  pressed: HexColor;
  light: HexColor;
}

export interface SecondaryColorPalette {
  teal: HexColor;
  light: HexColor;
  dark: HexColor;
}

export interface AccentColorPalette {
  orange: HexColor;
  warning: HexColor;
  success: HexColor;
  danger: HexColor;
  purpleAi: HexColor;
}

export interface NeutralColorPalette {
  white: HexColor;
  gray50: HexColor;
  gray100: HexColor;
  gray200: HexColor;
  gray300: HexColor;
  gray400: HexColor;
  gray500: HexColor;
  gray600: HexColor;
  gray700: HexColor;
  gray800: HexColor;
  gray900: HexColor;
  black: HexColor;
}

export interface SemanticSurfaceColors {
  primary: HexColor;
  secondary: HexColor;
  tertiary: HexColor;
  modal: HexColor;
  inverse: HexColor;
}

export interface SemanticTextColors {
  primary: HexColor;
  secondary: HexColor;
  tertiary: HexColor;
  disabled: HexColor;
  inverse: HexColor;
  placeholder: HexColor;
  link: HexColor;
}

export interface SemanticBorderColors {
  default: HexColor;
  focused: HexColor;
  error: HexColor;
  disabled: HexColor;
}

export interface SemanticIconColors {
  primary: HexColor;
  secondary: HexColor;
  disabled: HexColor;
  brand: HexColor;
  success: HexColor;
  warning: HexColor;
  danger: HexColor;
  ai: HexColor;
}

export interface StatusColorSet {
  background: HexColor;
  text: HexColor;
  border: HexColor;
}

export interface SemanticStatusColors {
  success: StatusColorSet;
  warning: StatusColorSet;
  error: StatusColorSet;
  info: StatusColorSet;
  pending: HexColor;
  offline: HexColor;
}

export interface SemanticColors {
  surface: SemanticSurfaceColors;
  text: SemanticTextColors;
  border: SemanticBorderColors;
  icon: SemanticIconColors;
  status: SemanticStatusColors;
}

export interface ColorTokens {
  primary: ColorPalette;
  secondary: SecondaryColorPalette;
  accent: AccentColorPalette;
  neutral: NeutralColorPalette;
  semantic: SemanticColors;
}

export interface FontFamilyTokens {
  primary: string;
  fallback: string;
}

export interface FontSizeTokens {
  displayXl: Pixels;
  displayL: Pixels;
  displayM: Pixels;
  headingXl: Pixels;
  headingL: Pixels;
  headingM: Pixels;
  headingS: Pixels;
  bodyXl: Pixels;
  bodyL: Pixels;
  bodyM: Pixels;
  bodyS: Pixels;
  caption: Pixels;
  micro: Pixels;
}

export interface FontWeightTokens {
  regular: 400;
  medium: 500;
  semibold: 600;
  bold: 700;
}

export interface LineHeightTokens {
  display: Percentage;
  headings: Percentage;
  body: Percentage;
  caption: Percentage;
}

export interface LetterSpacingTokens {
  display: Percentage;
  heading: Percentage;
  body: Percentage;
  caption: Percentage;
}

export interface TypographyTokens {
  fontFamily: FontFamilyTokens;
  fontSize: FontSizeTokens;
  fontWeight: FontWeightTokens;
  lineHeight: LineHeightTokens;
  letterSpacing: LetterSpacingTokens;
}

export interface SpacingTokens {
  baseUnit: Pixels;
  scale: Pixels[];
  xs: Pixels;
  sm: Pixels;
  md: Pixels;
  lg: Pixels;
  xl: Pixels;
  xxl: Pixels;
  xxxl: Pixels;
}

export interface RadiusTokens {
  xs: Pixels | Percentage;
  sm: Pixels | Percentage;
  md: Pixels | Percentage;
  lg: Pixels | Percentage;
  xl: Pixels | Percentage;
  xxl: Pixels | Percentage;
  pill: Pixels;
  circle: Percentage;
}

export interface BorderWidthTokens {
  hairline: Pixels;
  medium: Pixels;
  heavy: Pixels;
  focus: Pixels;
}

export interface ShadowTokens {
  xs: ShadowValue;
  sm: ShadowValue;
  md: ShadowValue;
  lg: ShadowValue;
  xl: ShadowValue;
}

export interface ElevationLevel {
  label: string;
  shadow: ShadowValue;
  zIndex: number;
}

export interface ElevationTokens {
  level0: ElevationLevel;
  level1: ElevationLevel;
  level2: ElevationLevel;
  level3: ElevationLevel;
  level4: ElevationLevel;
  level5: ElevationLevel;
}

export interface OpacityTokens {
  disabled: number;
  pressed: number;
  hover: number;
  overlay: number;
  modal: number;
  scrim: number;
}

export interface IconSizeTokens {
  tiny: Pixels;
  small: Pixels;
  medium: Pixels;
  default: Pixels;
  large: Pixels;
  xl: Pixels;
  illustration: Pixels;
  hero: Pixels;
}

export interface AvatarSizeTokens {
  xs: Pixels;
  small: Pixels;
  medium: Pixels;
  large: Pixels;
  xl: Pixels;
  profile: Pixels;
}

export interface TouchTargetTokens {
  minimum: { width: Pixels; height: Pixels };
  preferred: { width: Pixels; height: Pixels };
  primaryButtonHeight: Pixels;
  floatingButton: Pixels;
}

export interface ComponentHeightTokens {
  textInputHeight: Pixels;
  buttonHeight: Pixels;
  smallButtonHeight: Pixels;
  navigationBarHeight: Pixels;
  bottomTabHeight: Pixels;
  searchBarHeight: Pixels;
  listItemHeight: Pixels;
  cardMinHeight: Pixels;
}

export interface SizeTokens {
  icon: IconSizeTokens;
  avatar: AvatarSizeTokens;
  touchTarget: TouchTargetTokens;
  component: ComponentHeightTokens;
}

export interface LayoutTokens {
  mobileWidth: Pixels;
  contentPadding: Pixels;
  cardGap: Pixels;
  sectionGap: Pixels;
  largeSectionGap: Pixels;
}

export interface BreakpointTokens {
  phoneSmall: { min: Pixels; max: Pixels };
  phone: { min: Pixels; max: Pixels };
  largePhone: { min: Pixels; max: Pixels };
  tablet: { min: Pixels; max: Pixels };
  largeTablet: { min: Pixels; max: Pixels };
}

export interface ZIndexTokens {
  base: number;
  card: number;
  stickyHeader: number;
  dropdown: number;
  fab: number;
  bottomSheet: number;
  toast: number;
  modal: number;
  fullscreenOverlay: number;
  systemAlerts: number;
}

export interface AnimationTokens {
  fast: number;
  normal: number;
  medium: number;
  slow: number;
  extraSlow: number;
}

export interface MotionCurveTokens {
  standard: string;
  enter: string;
  exit: string;
  spring: string;
}

export interface ThemeColors {
  background: HexColor;
  surface: HexColor;
  surfaceSecondary: HexColor;
  card: HexColor;
  navigation: HexColor;
  text: HexColor;
  textSecondary: HexColor;
  textInverse: HexColor;
  border: HexColor;
  borderFocused: HexColor;
  primary: HexColor;
  primaryHover: HexColor;
  primaryPressed: HexColor;
  secondary: HexColor;
  success: HexColor;
  warning: HexColor;
  danger: HexColor;
  info: HexColor;
  disabled: HexColor;
  placeholder: HexColor;
  link: HexColor;
  ai: HexColor;
  icon: HexColor;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
  shadowMode: ShadowMode;
  borderEmphasis: BorderEmphasis;
}

export interface TokenContract {
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  borderWidth: BorderWidthTokens;
  shadow: ShadowTokens;
  elevation: ElevationTokens;
  opacity: OpacityTokens;
  size: SizeTokens;
  layout: LayoutTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
  animation: AnimationTokens;
  motion: MotionCurveTokens;
}
