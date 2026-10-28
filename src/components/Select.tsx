// import { SpaceProps } from "styled-system";
// import ReactSelect, { Props } from "react-select";

// import Box from "@component/Box";
// import Typography from "@component/Typography";
// import { colors } from "@utils/themeColors";

// // ==============================================================
// type SelectOption = { label: any; value: any };

// interface SelectProps extends Props, SpaceProps {
//   value?: any;
//   label?: string;
//   errorText?: any;
//   isMulti?: boolean;
//   defaultValue?: any;
//   options: SelectOption[];
// }
// // ==============================================================

// const Select = ({ options, isMulti = false, id, label, errorText, ...props }: SelectProps) => {
//   // extract spacing props
//   let spacingProps = {};
//   for (const key in props) {
//     if (key.startsWith("m") || key.startsWith("p")) spacingProps[key] = props[key];
//   }

//   return (
//     <Box {...spacingProps}>
//       {label && (
//         <Typography fontSize="0.875rem" mb="6px">
//           {label}
//         </Typography>
//       )}

//       <ReactSelect
//         isMulti={isMulti}
//         options={options}
//         styles={customStyles}
//         theme={(theme) => ({
//           ...theme,
//           colors: {
//             ...theme.colors,
//             primary50: colors.gray[100],
//             primary: colors.primary.main,
//             neutral20: colors.text.disabled
//           }
//         })}
//         {...props}
//       />

//       {errorText && (
//         <Typography color="error.main" ml="0.25rem" mt="0.25rem" as="small">
//           {errorText}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// const customStyles = {
//   input: (styles) => ({ ...styles, height: 30 }),
//   option: (provided, state) => ({
//     ...provided,
//     color: "inherit",
//     cursor: "pointer",
//     backgroundColor: state.isFocused ? "rgba(0,0,0, 0.015)" : "inherit"
//   })
// };

// export default Select;

import { SpaceProps } from "styled-system";
import ReactSelect, { Props } from "react-select";

import Box from "@component/Box";
import Typography from "@component/Typography";
import tz from "../theme/tizaraa";

// ==============================================================
type SelectOption = { label: any; value: any };

interface SelectProps extends Props, SpaceProps {
 value?: any;
 label?: string;
 errorText?: any;
 isMulti?: boolean;
 defaultValue?: any;
 fullwidth?: boolean;
 options: SelectOption[];
}
// ==============================================================

const Select = ({
 isMulti = false,
 id,
 label,
 errorText,
 options,
 ...props
}: SelectProps) => {
 // extract spacing props
 let spacingProps = {};
 for (const key in props) {
  if (key.startsWith("m") || key.startsWith("p"))
   spacingProps[key] = props[key];
 }

 return (
  <Box {...spacingProps}>
   {label && (
    <Typography fontSize="0.875rem" mb="6px">
     {label}
    </Typography>
   )}

   <ReactSelect
    isMulti={isMulti}
    options={options}
    theme={(theme) => ({
     ...theme,
     borderRadius: tz.radius.sm,
     colors: {
      ...theme.colors,
      primary25: tz.color.mist,
      primary50: tz.color.lineSoft,
      primary: tz.color.ember,
      neutral20: tz.color.line,
      neutral30: tz.color.slate,
     },
    })}
    {...props}
    styles={mergeStyles(props.styles)}
   />

   {errorText && (
    <Typography color="error.main" ml="0.25rem" mt="0.25rem" as="small">
     {errorText}
    </Typography>
   )}
  </Box>
 );
};

// Matches text-field: 44px tall, 8px corners, ember focus ring
const customStyles = {
 control: (styles, state) => ({
  ...styles,
  minHeight: 44,
  cursor: "pointer",
  fontSize: 14,
  boxShadow: state.isFocused ? tz.focusRing : "none",
 }),
 input: (styles) => ({ ...styles, height: 30 }),
 singleValue: (styles) => ({ ...styles, color: tz.color.ink }),
 placeholder: (styles) => ({ ...styles, color: tz.color.slate }),
 indicatorSeparator: () => ({ display: "none" }),
 menu: (styles) => ({
  ...styles,
  overflow: "hidden",
  border: `1px solid ${tz.color.line}`,
  boxShadow: tz.elevation.overlay,
 }),
 option: (provided, state) => ({
  ...provided,
  fontSize: 14,
  cursor: "pointer",
  color: state.isSelected ? tz.color.emberDeep : tz.color.inkSoft,
  fontWeight: state.isSelected ? 600 : 400,
  backgroundColor: state.isSelected
   ? tz.color.emberTint
   : state.isFocused
   ? tz.color.mist
   : "inherit",
 }),
};

// Callers often pass `styles` for one part (usually menu zIndex);
// apply theirs on top of the base styles instead of replacing them
const mergeStyles = (overrides?: Props["styles"]) => {
 if (!overrides) return customStyles;

 const merged = { ...customStyles };
 for (const key of Object.keys(overrides)) {
  const base = customStyles[key];
  const extra = overrides[key];
  merged[key] = base
   ? (styles, state) => extra(base(styles, state), state)
   : extra;
 }
 return merged;
};

export default Select;
