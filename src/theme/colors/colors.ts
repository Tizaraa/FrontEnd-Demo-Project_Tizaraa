import tz from "../tizaraa";

const gray = {
 900: tz.color.ink, // Main Text
 800: tz.color.inkSoft, // Paragraph
 700: "#4B5263",
 600: tz.color.slate, // Low Priority form Title/Text
 500: "#9AA1AE",
 400: tz.color.line, // Border
 300: "#E9EBF0",
 200: tz.color.lineSoft, // Line Stroke
 100: tz.color.mist,
 white: tz.color.paper,
};

const textColor = {
 hint: gray[600],
 muted: gray[600],
 primary: gray[900],
 disabled: gray[400],
 secondary: gray[800],
};

const bodyColor = {
 default: gray[100],
 paper: gray["white"],
 text: textColor.primary,
};

const primaryColor = {
 light: tz.color.emberTint,
 main: tz.color.emberDeep,
 m: "",
 dark: tz.color.emberDark,
 text: "#ffffff",
 100: tz.color.emberTint,
 200: "#FAD3C2",
 300: "#F6A487",
 400: "#F37A53",
 500: tz.color.ember,
 600: "#D94716",
 700: tz.color.emberDeep,
 800: tz.color.emberDark,
 900: "#7F2A09",
};

const secondaryColor = {
 light: "rgba(14, 52, 96, 0.2)",
 main: tz.color.navy,
 dark: "#0A2647",
 text: "#ffffff",
 900: "#071A33",
 100: tz.color.navyTint,
};

const dark = { main: "#222" };

const warningColor = {
 main: tz.tone.warning.fill,
 text: textColor.primary,
};

const errorColor = {
 main: tz.tone.danger.fg,
 light: tz.tone.danger.bg,
 text: textColor.primary,
};

const successColor = {
 text: textColor.primary,
 main: tz.tone.success.fill,
 light: tz.tone.success.bg,
};

const defaultColor = {
 main: textColor.primary,
 dark: textColor.primary,
 text: textColor.primary,
 light: textColor.secondary,
};

const paste = {
 50: "#F5F5F5",
 100: "#DDFBF1",
 main: "#4BB4B4",
};

const marron = {
 50: "#f3f5f9",
 100: "#F6F2ED",
 main: "#BE7374",
};

export const blue = {
 100: "#DBF0FE",
 200: "#B8DEFE",
 300: "#94C9FE",
 400: "#7AB6FD",
 500: "#4E97FD",
 600: "#3975D9",
 700: "#2756B6",
 800: "#183C92",
 900: "#0E2979",
 main: "#4E97FD",
};

export const colors = {
 dark,
 gray,
 blue,
 paste,
 marron,
 text: textColor,
 body: bodyColor,
 error: errorColor,
 warn: warningColor,
 success: successColor,
 default: defaultColor,
 primary: primaryColor,
 secondary: secondaryColor,
};
