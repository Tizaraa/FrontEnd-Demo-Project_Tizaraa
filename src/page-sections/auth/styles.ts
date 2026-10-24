import Link from "next/link";
import Card from "@component/Card";
import styled, { css } from "styled-components";

// Still used by the corporate invite page, which sits outside the auth layout.
export const StyledRoot = styled(Card)`
 width: 500px;
 overflow: hidden;
 .content {
  padding: 3rem 3.75rem 0px;
 }

 @media screen and (max-width: 550px) {
  width: 90%;
  .content {
   padding: 1.5rem 1rem 0px;
  }
 }
`;

// Card that holds every auth form (login, signup, OTP, reset password)
export const AuthCard = styled.div`
 width: 100%;
 max-width: 440px;
 margin: 0 auto;
 padding: 32px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.lg}px;
 box-shadow: ${({ theme }) => theme.tz.elevation.raised};
 color: ${({ theme }) => theme.tz.color.inkSoft};
 font-family: ${({ theme }) => theme.tz.font.body};

 @media screen and (max-width: 480px) {
  padding: 24px;
 }
`;

export const AuthTitle = styled.h1`
 margin: 0 0 8px;
 font-family: ${({ theme }) => theme.tz.font.display};
 font-size: 28px;
 font-weight: 600;
 line-height: 1.2;
 text-align: center;
 color: ${({ theme }) => theme.tz.color.ink};

 @media screen and (max-width: 480px) {
  font-size: 24px;
 }
`;

export const AuthSubtitle = styled.p`
 margin: 0 0 24px;
 font-size: 14px;
 line-height: 1.55;
 text-align: center;
 color: ${({ theme }) => theme.tz.color.slate};
`;

const textLinkStyles = css`
 padding: 0;
 border: none;
 background: none;
 font-family: inherit;
 font-size: 14px;
 font-weight: 600;
 line-height: 1.4;
 color: ${({ theme }) => theme.tz.color.emberDeep};
 text-decoration: none;
 cursor: pointer;
 border-radius: ${({ theme }) => theme.tz.radius.xs}px;
 transition: color ${({ theme }) => theme.tz.motion.fast};

 &:hover {
  color: ${({ theme }) => theme.tz.color.emberDark};
  text-decoration: underline;
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

// Secondary action that runs a handler (always type="button" so it never submits a form)
export const AuthTextButton = styled.button`
 ${textLinkStyles}
`;

// Secondary action that navigates
export const AuthTextLink = styled(Link)`
 ${textLinkStyles}
`;

export const AuthErrorText = styled.p`
 margin: 4px 0 0;
 font-size: 13px;
 line-height: 1.4;
 color: ${({ theme }) => theme.tz.tone.danger.fg};
`;

export const AuthSuccessNote = styled.p`
 margin: 0 0 16px;
 padding: 10px 12px;
 font-size: 14px;
 line-height: 1.5;
 text-align: center;
 color: ${({ theme }) => theme.tz.tone.success.fg};
 background: ${({ theme }) => theme.tz.tone.success.bg};
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
`;

// Small print row under the form, e.g. "Don't have an account? Sign up"
export const AuthFooter = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: center;
 gap: 6px;
 margin-top: 24px;
 padding-top: 20px;
 border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 font-size: 14px;
 color: ${({ theme }) => theme.tz.color.slate};
`;

export const AuthDivider = styled.div`
 display: flex;
 align-items: center;
 gap: 12px;
 margin: 20px 0;
 font-size: 13px;
 color: ${({ theme }) => theme.tz.color.slate};

 &::before,
 &::after {
  content: "";
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.tz.color.line};
 }
`;

// Neutral outlined button for third-party sign-in (Google, Facebook)
export const SocialButton = styled.button`
 display: flex;
 width: 100%;
 height: 44px;
 align-items: center;
 justify-content: center;
 gap: 8px;
 padding: 0 16px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;
 font-family: inherit;
 font-size: 15px;
 font-weight: 600;
 color: ${({ theme }) => theme.tz.color.ink};
 cursor: pointer;
 transition: background-color ${({ theme }) => theme.tz.motion.fast},
  border-color ${({ theme }) => theme.tz.motion.fast};

 &:hover {
  background: ${({ theme }) => theme.tz.color.mist};
  border-color: ${({ theme }) => theme.tz.color.slate};
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

// Plain inputs used where the shared TextField can't be swapped in
export const AuthLabel = styled.label`
 display: block;
 margin-bottom: 6px;
 font-size: 14px;
 font-weight: 500;
 color: ${({ theme }) => theme.tz.color.inkSoft};
`;

export const AuthInput = styled.input`
 width: 100%;
 height: 44px;
 padding: 0 14px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
 background: ${({ theme }) => theme.tz.color.paper};
 font-family: inherit;
 font-size: 15px;
 color: ${({ theme }) => theme.tz.color.ink};
 outline: none;
 transition: border-color ${({ theme }) => theme.tz.motion.fast},
  box-shadow ${({ theme }) => theme.tz.motion.fast};

 &:focus {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.tz.color.emberTint};
 }

 &[readonly] {
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
 }
`;
