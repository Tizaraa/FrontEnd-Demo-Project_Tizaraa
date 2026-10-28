import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Brand tokens for plain CSS and CSS modules, which can't read the theme */
  :root {
    --tz-ember: ${({ theme }) => theme.tz.color.ember};
    --tz-ember-deep: ${({ theme }) => theme.tz.color.emberDeep};
    --tz-ember-dark: ${({ theme }) => theme.tz.color.emberDark};
    --tz-ember-tint: ${({ theme }) => theme.tz.color.emberTint};
    --tz-navy: ${({ theme }) => theme.tz.color.navy};
    --tz-navy-tint: ${({ theme }) => theme.tz.color.navyTint};
    --tz-ink: ${({ theme }) => theme.tz.color.ink};
    --tz-ink-soft: ${({ theme }) => theme.tz.color.inkSoft};
    --tz-slate: ${({ theme }) => theme.tz.color.slate};
    --tz-line: ${({ theme }) => theme.tz.color.line};
    --tz-line-soft: ${({ theme }) => theme.tz.color.lineSoft};
    --tz-mist: ${({ theme }) => theme.tz.color.mist};
    --tz-paper: ${({ theme }) => theme.tz.color.paper};
    --tz-radius-sm: ${({ theme }) => theme.tz.radius.sm}px;
    --tz-radius-md: ${({ theme }) => theme.tz.radius.md}px;
    --tz-radius-lg: ${({ theme }) => theme.tz.radius.lg}px;
    --tz-elevation-raised: ${({ theme }) => theme.tz.elevation.raised};
    --tz-motion-fast: ${({ theme }) => theme.tz.motion.fast};
    --tz-focus-ring: ${({ theme }) => theme.tz.focusRing};
    --tz-success: ${({ theme }) => theme.tz.tone.success.fg};
    --tz-success-bg: ${({ theme }) => theme.tz.tone.success.bg};
    --tz-warning: ${({ theme }) => theme.tz.tone.warning.fg};
    --tz-warning-bg: ${({ theme }) => theme.tz.tone.warning.bg};
    --tz-danger: ${({ theme }) => theme.tz.tone.danger.fg};
    --tz-danger-bg: ${({ theme }) => theme.tz.tone.danger.bg};
    --tz-font-display: ${({ theme }) => theme.tz.font.display};
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.55;
    font-family: ${({ theme }) => theme.tz.font.body};
    -webkit-font-smoothing: antialiased;
    /* transition: all 0.50s linear; */
    color: ${({ theme }) => theme.colors.body.text};
    background: ${({ theme }) => theme.colors.body.default};   
  }

  html {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.body.text};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.tz.font.display};
    color: ${({ theme }) => theme.tz.color.ink};
    letter-spacing: -0.01em;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  :focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.tz.focusRing};
    border-radius: ${({ theme }) => theme.tz.radius.xs}px;
  }

  ::selection {
    background: ${({ theme }) => theme.tz.color.emberTint};
    color: ${({ theme }) => theme.tz.color.ink};
  }

  /* Amounts line up when stacked */
  .price, .amount, .tabular-nums {
    font-variant-numeric: tabular-nums;
  }

  ${({ theme }) => theme.tz.media.reducedMotion} {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1031;
  position: fixed;
  overflow: hidden;
  border-radius: 0px 4px 4px 0px;
  background: ${({ theme }) => theme.colors.primary.main};
}

/* Fancy blur effect */
#nprogress .peg {
  right: 0px;
  width: 100px;
  height: 100%;
  display: block;
  position: absolute;
  box-shadow: 0 0 10px ${({ theme }: any) => theme.colors.primary.main}, 0 0 5px ${({
   theme,
  }: any) => theme.colors.primary.main};
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  top: 15px;
  right: 15px;
  z-index: 1031;
  display: block;
  position: fixed;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border-radius: 50%;
  border: solid 2px transparent;
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-left-color: ${({ theme }) => theme.colors.primary.main};

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default GlobalStyles;
