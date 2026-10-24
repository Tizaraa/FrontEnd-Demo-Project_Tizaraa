import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { color, compose, space, SpaceProps } from "styled-system";
import systemCss from "@styled-system/css";
import { isValidProp } from "@utils/utils";
import { TextFieldProps } from "./index";

export const SyledTextField = styled.input.withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<InputHTMLAttributes<HTMLInputElement> & TextFieldProps>(
 (props) =>
  systemCss({
   padding: "8px 12px",
   height: "44px",
   fontSize: "inherit",
   color: "body.text",
   borderRadius: props.theme.tz.radius.sm,
   border: "1px solid",
   bg: "body.paper",
   transition: `border-color ${props.theme.tz.motion.fast}, box-shadow ${props.theme.tz.motion.fast}`,
   borderColor: "text.disabled",
   width: props.fullwidth ? "100%" : "inherit",
   outline: "none",
   fontFamily: "inherit",

   "&:hover": {
    borderColor: "gray.500",
   },
   "&:focus": {
    outline: "none",
    borderColor: props.theme.tz.color.ember,
    boxShadow: `0 0 0 3px ${props.theme.tz.color.emberTint}`,
   },
  }),
 compose(color)
);

export const TextFieldWrapper = styled.div.withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<TextFieldProps & SpaceProps>(
 (props) =>
  systemCss({
   position: "relative",
   width: props.fullwidth ? "100%" : "inherit",

   label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: 500,
    color: "text.hint",
   },

   small: {
    display: "block",
    color: "error.main",
    marginTop: "0.25rem",
    marginLeft: "0.25rem",
   },

   ".end-adornment": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "0.25rem",
   },
  }),
 compose(color, space)
);
