export const baseColor = {
  primary: "#FA5F0C",
};

export const lightColors = {
  ...baseColor,
  background: "#fff",
  backgroundSecondary: "#191919",
  backgroundDisabled: "#000",
  transparent: "transparent",
  text: "#000000",
  textSubtle: "#000",
  textSecondary: "#fff",
  textDisabled: "#000",
  detail: "#19191999",
  input: "#C4C4C499",
  inputSecondary: "#494949",
  inputReadOnly: "#494949",
  border: "#000000",
  disabled: "#C4C4C4",
  checkbox: "#D9D9D9",
  checkboxDisabled: "#979797",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
    cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
    violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};

type Colors = typeof lightColors;

export const darkColors: Colors = {
  ...baseColor,
  background: "#fff",
  backgroundSecondary: "#191919",
  backgroundDisabled: "#000",
  transparent: "transparent",
  text: "#000000",
  textSubtle: "#000",
  textSecondary: "#fff",
  textDisabled: "#000",
  detail: "#19191999",
  input: "#C4C4C499",
  inputSecondary: "#494949",
  inputReadOnly: "#494949",
  border: "#000000",
  disabled: "#C4C4C4",
  checkbox: "#D9D9D9",
  checkboxDisabled: "#979797",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
    cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
    violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};
