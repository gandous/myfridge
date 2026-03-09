export type ColorVariant =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "success"
  | "none";

export type SizeVariant = "sm" | "md" | "lg" | "xl";

const baseTheme = {
  borderRadius: {
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
  },
  margin: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  iconSize: {
    sm: 18,
    md: 24,
    lg: 32,
    xl: 48,
  },
  fontFamilyWeb:
    "-apple-system, BlinkMacSystemFont, Cantarell, Roboto, Helvetica, Arial, sans-serif",
  fontSize: {
    h1: {
      fontSize: 40,
      fontWeight: 600,
    },
    h2: {
      fontSize: 35,
      fontWeight: "600",
    },
    h3: {
      fontSize: 30,
      fontWeight: "600",
    },
    h4: {
      fontSize: 25,
      fontWeight: "600",
    },
    h5: {
      fontSize: 20,
      fontWeight: "600",
    },
    h6: {
      fontSize: 17,
      fontWeight: "500",
    },
    p: {
      fontSize: 15,
    },
    p2: {
      fontSize: 13,
    },
    default: {
      fontSize: 15,
    },
  },
};

const lightThemeColor = {
  primary: "#9141ac",
  background: "rgb(242, 242, 242)",
  backgroundInput: "rgb(220, 220, 220)",
  card: "rgb(255, 255, 255)",
  text: "rgb(28, 28, 30)",
  textSecondary: "rgb(28, 28, 30)",
  border: "rgb(199, 199, 204)",
  notification: "rgb(255, 69, 58)",
  red: "#e7000b",
  backgroundRed: "#c10007",
  orange: "#f54900",
  backgroundOrange: "#ca3500",
  green: "rgb(52, 209, 88)",
  backgroundGreen: "#008236",
  link: "rgb(0, 122, 255)",
};

export const lightTheme = {
  colors: lightThemeColor,
  ...baseTheme,
};

const darkThemeColor = {
  primary: "#9141ac",
  secondary: "#9141ac",
  background: "rgb(0, 0, 0)",
  backgroundModal: "rgba(0, 0, 0, 0.5)",
  backgroundInput: "rgb(38, 38, 38)",
  card: "#161616",
  text: "#eee",
  textSecondary: "rgb(151, 151, 152)",
  border: "rgb(38, 38, 38)",
  notification: "rgb(255, 69, 58)",
  red: "#e7000b",
  backgroundRed: "#c10007",
  orange: "#f54900",
  backgroundOrange: "#ca3500",
  green: "rgb(52, 209, 88)",
  backgroundGreen: "#008236",
  link: "rgb(0, 122, 255)",
};

export const darkTheme = {
  colors: darkThemeColor,
  ...baseTheme,
};
