import { colors } from "./colors/colors";
import { TizaraaTokens } from "./tizaraa";

export type Shadows = string[] & {
 small?: string;
 large?: string;
 badge?: string;
 border?: string;
 regular?: string;
};

type Colors = typeof colors;

export type Breakpoints = string[] & {
 sm?: string;
 md?: string;
 lg?: string;
 xl?: string;
};

export interface ThemeOption {
 colors: Colors;
 shadows: Shadows;
 breakpoints: Breakpoints;
 tz: TizaraaTokens;
}
