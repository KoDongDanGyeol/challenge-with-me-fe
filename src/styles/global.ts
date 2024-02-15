import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

const StyledGlobal = styled.createGlobalStyle`
  :root[data-theme="light"] {
    --color-gray0: ${(props) => props.theme.color.light.gray0};
    --color-gray50: ${(props) => props.theme.color.light.gray50};
    --color-gray100: ${(props) => props.theme.color.light.gray100};
    --color-gray200: ${(props) => props.theme.color.light.gray200};
    --color-gray300: ${(props) => props.theme.color.light.gray300};
    --color-gray400: ${(props) => props.theme.color.light.gray400};
    --color-gray500: ${(props) => props.theme.color.light.gray500};
    --color-gray600: ${(props) => props.theme.color.light.gray600};
    --color-gray700: ${(props) => props.theme.color.light.gray700};
    --color-gray800: ${(props) => props.theme.color.light.gray800};
    --color-gray900: ${(props) => props.theme.color.light.gray900};

    --color-red50: ${(props) => props.theme.color.light.red50};
    --color-red100: ${(props) => props.theme.color.light.red100};
    --color-red200: ${(props) => props.theme.color.light.red200};
    --color-red300: ${(props) => props.theme.color.light.red300};
    --color-red400: ${(props) => props.theme.color.light.red400};
    --color-red500: ${(props) => props.theme.color.light.red500};
    --color-red600: ${(props) => props.theme.color.light.red600};
    --color-red700: ${(props) => props.theme.color.light.red700};
    --color-red800: ${(props) => props.theme.color.light.red800};
    --color-red900: ${(props) => props.theme.color.light.red900};

    --color-yellow50: ${(props) => props.theme.color.light.yellow50};
    --color-yellow100: ${(props) => props.theme.color.light.yellow100};
    --color-yellow200: ${(props) => props.theme.color.light.yellow200};
    --color-yellow300: ${(props) => props.theme.color.light.yellow300};
    --color-yellow400: ${(props) => props.theme.color.light.yellow400};
    --color-yellow500: ${(props) => props.theme.color.light.yellow500};
    --color-yellow600: ${(props) => props.theme.color.light.yellow600};
    --color-yellow700: ${(props) => props.theme.color.light.yellow700};
    --color-yellow800: ${(props) => props.theme.color.light.yellow800};
    --color-yellow900: ${(props) => props.theme.color.light.yellow900};

    --color-green50: ${(props) => props.theme.color.light.green50};
    --color-green100: ${(props) => props.theme.color.light.green100};
    --color-green200: ${(props) => props.theme.color.light.green200};
    --color-green300: ${(props) => props.theme.color.light.green300};
    --color-green400: ${(props) => props.theme.color.light.green400};
    --color-green500: ${(props) => props.theme.color.light.green500};
    --color-green600: ${(props) => props.theme.color.light.green600};
    --color-green700: ${(props) => props.theme.color.light.green700};
    --color-green800: ${(props) => props.theme.color.light.green800};
    --color-green900: ${(props) => props.theme.color.light.green900};

    --color-primary50: ${(props) => props.theme.color.light.primary50};
    --color-primary100: ${(props) => props.theme.color.light.primary100};
    --color-primary200: ${(props) => props.theme.color.light.primary200};
    --color-primary300: ${(props) => props.theme.color.light.primary300};
    --color-primary400: ${(props) => props.theme.color.light.primary400};
    --color-primary500: ${(props) => props.theme.color.light.primary500};
    --color-primary600: ${(props) => props.theme.color.light.primary600};
    --color-primary700: ${(props) => props.theme.color.light.primary700};
    --color-primary800: ${(props) => props.theme.color.light.primary800};
    --color-primary900: ${(props) => props.theme.color.light.primary900};
  }
  :root[data-theme="dark"] {
    --color-gray0: ${(props) => props.theme.color.dark.gray0};
    --color-gray50: ${(props) => props.theme.color.dark.gray50};
    --color-gray100: ${(props) => props.theme.color.dark.gray100};
    --color-gray200: ${(props) => props.theme.color.dark.gray200};
    --color-gray300: ${(props) => props.theme.color.dark.gray300};
    --color-gray400: ${(props) => props.theme.color.dark.gray400};
    --color-gray500: ${(props) => props.theme.color.dark.gray500};
    --color-gray600: ${(props) => props.theme.color.dark.gray600};
    --color-gray700: ${(props) => props.theme.color.dark.gray700};
    --color-gray800: ${(props) => props.theme.color.dark.gray800};
    --color-gray900: ${(props) => props.theme.color.dark.gray900};

    --color-red50: ${(props) => props.theme.color.dark.red50};
    --color-red100: ${(props) => props.theme.color.dark.red100};
    --color-red200: ${(props) => props.theme.color.dark.red200};
    --color-red300: ${(props) => props.theme.color.dark.red300};
    --color-red400: ${(props) => props.theme.color.dark.red400};
    --color-red500: ${(props) => props.theme.color.dark.red500};
    --color-red600: ${(props) => props.theme.color.dark.red600};
    --color-red700: ${(props) => props.theme.color.dark.red700};
    --color-red800: ${(props) => props.theme.color.dark.red800};
    --color-red900: ${(props) => props.theme.color.dark.red900};

    --color-yellow50: ${(props) => props.theme.color.dark.yellow50};
    --color-yellow100: ${(props) => props.theme.color.dark.yellow100};
    --color-yellow200: ${(props) => props.theme.color.dark.yellow200};
    --color-yellow300: ${(props) => props.theme.color.dark.yellow300};
    --color-yellow400: ${(props) => props.theme.color.dark.yellow400};
    --color-yellow500: ${(props) => props.theme.color.dark.yellow500};
    --color-yellow600: ${(props) => props.theme.color.dark.yellow600};
    --color-yellow700: ${(props) => props.theme.color.dark.yellow700};
    --color-yellow800: ${(props) => props.theme.color.dark.yellow800};
    --color-yellow900: ${(props) => props.theme.color.dark.yellow900};

    --color-green50: ${(props) => props.theme.color.dark.green50};
    --color-green100: ${(props) => props.theme.color.dark.green100};
    --color-green200: ${(props) => props.theme.color.dark.green200};
    --color-green300: ${(props) => props.theme.color.dark.green300};
    --color-green400: ${(props) => props.theme.color.dark.green400};
    --color-green500: ${(props) => props.theme.color.dark.green500};
    --color-green600: ${(props) => props.theme.color.dark.green600};
    --color-green700: ${(props) => props.theme.color.dark.green700};
    --color-green800: ${(props) => props.theme.color.dark.green800};
    --color-green900: ${(props) => props.theme.color.dark.green900};

    --color-primary50: ${(props) => props.theme.color.dark.primary50};
    --color-primary100: ${(props) => props.theme.color.dark.primary100};
    --color-primary200: ${(props) => props.theme.color.dark.primary200};
    --color-primary300: ${(props) => props.theme.color.dark.primary300};
    --color-primary400: ${(props) => props.theme.color.dark.primary400};
    --color-primary500: ${(props) => props.theme.color.dark.primary500};
    --color-primary600: ${(props) => props.theme.color.dark.primary600};
    --color-primary700: ${(props) => props.theme.color.dark.primary700};
    --color-primary800: ${(props) => props.theme.color.dark.primary800};
    --color-primary900: ${(props) => props.theme.color.dark.primary900};
  }

  html,
  body {
    min-width: 360px;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-weight: 400;
    font-family:
      var(--font-notoSansKr),
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: rgb(var(--color-gray900));
    background: rgb(var(--color-gray0));
    word-wrap: break-word;
    word-break: keep-all;
    white-space: normal;
    -webkit-text-size-adjust: none;
    -webkit-overflow-scrolling: touch;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  label {
    cursor: pointer;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    display: inline-block;
    color: rgb(var(--color-gray900));
    text-decoration: none;
  }
  button {
    display: inline-block;
    padding: 0;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-family: var(--font-notoSansKr), sans-serif;
    color: rgb(var(--color-gray900));
    border: 0;
    border-radius: 0;
    background: none;
    vertical-align: top;
    cursor: pointer;
    &[disabled] {
      cursor: default;
    }
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-family: var(--font-notoSansKr), sans-serif;
    color: rgb(var(--color-gray900));
    border: 0;
    border-radius: 0;
    background: none;
    vertical-align: top;
    -webkit-appearance: none;
    &:disabled,
    &:read-only {
      cursor: default;
    }
  }
  input {
    &[type="button"],
    &[type="reset"],
    &[type="submit"] {
      cursor: pointer;
    }
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }
    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    &:-ms-input-placeholder,
    &::-moz-placeholder,
    &::-webkit-input-placeholder {
      color: rgb(var(--color-gray500));
    }
  }
  select {
  }
  textarea {
    overflow: auto;
    resize: vertical;
    &:-ms-input-placeholder,
    &::-moz-placeholder,
    &::-webkit-input-placeholder {
      color: rgb(var(--color-gray500));
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    th,
    td {
      text-align: left;
    }
  }

  .sr-only {
    position: absolute;
    margin: -1px;
    padding: 0;
    width: 1px;
    height: 1px;
    border: 0;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    white-space: nowrap;
  }

  .header-opened {
    overflow: hidden;
  }

  .markdown {
    position: relative;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    font-weight: 400;
    font-family: var(--font-notoSansKr);
    color: rgb(var(--color-gray900));
    background: rgb(var(--color-gray0));
    word-wrap: break-word;

    * + * {
      margin-top: 1em;
    }

    ul {
      padding-left: 1.25em;
      list-style-type: disc;
      ul {
        list-style-type: circle;
      }
      ul ul {
        list-style-type: square;
      }
    }

    ol {
      padding-left: 1.25em;
      list-style-type: decimal;
    }

    li {
      ul,
      ol {
        margin-top: 0.5em;
      }
      & + li {
        margin-top: 0.5em;
      }
    }

    .task-list-item {
      text-indent: -1.25em;
      list-style-type: none;
      input[type="checkbox"] {
        margin: 0;
        width: auto;
        vertical-align: middle;
        appearance: auto;
        -webkit-appearance: auto;
      }
    }

    h1 {
      font-size: ${(props) => props.theme.typo.size["2xl"]};
      line-height: ${(props) => props.theme.typo.leading["2xl"]};
    }

    h2 {
      font-size: ${(props) => props.theme.typo.size.xl};
      line-height: ${(props) => props.theme.typo.leading.xl};
    }

    h3 {
      font-size: ${(props) => props.theme.typo.size.lg};
      line-height: ${(props) => props.theme.typo.leading.lg};
    }

    h4 {
      font-size: ${(props) => props.theme.typo.size.base};
      line-height: ${(props) => props.theme.typo.leading.base};
    }

    strong,
    b {
      font-weight: 700;
    }

    em {
      font-style: italic;
    }

    a {
      text-decoration: underline;
    }

    hr {
      border-top: 1px solid rgb(var(--color-gray200));
      margin: 1em 0;
    }

    img {
      max-width: 100%;
    }

    blockquote {
      padding: 0 1em;
      color: rgb(var(--color-gray500));
      border-left: 0.25em solid rgb(var(--color-gray300));
    }

    .markdown-table {
      table {
        border: 1px solid rgb(var(--color-gray300));
        th,
        td {
          margin: 0;
          padding: 0.25em 0.5em;
          text-align: left;
          background: rgb(var(--color-gray50));
          border: 1px solid rgb(var(--color-gray300));
        }
      }
    }

    .markdown-table-auto {
      table {
        overflow-x: auto;
        width: auto;
      }
    }

    .markdown-card {
      & + .markdown-card {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid rgb(var(--color-gray200));
      }
    }

    .code-block {
      border: 1px solid rgb(var(--color-gray300));
      border-radius: 4px;
    }

    .code-inline {
      margin-top: 0;
      display: inline-block;
      padding: 0.25em 0.5em;
      background: rgb(var(--color-gray50));
      border: 1px solid rgb(var(--color-gray300));
      border-radius: 4px;
      font-size: ${(props) => props.theme.typo.size.xs};
      line-height: ${(props) => props.theme.typo.leading.xs};
    }

    .color-gray {
      color: rgb(var(--color-gray500));
    }
    .color-success {
      color: rgb(var(--color-primary500));
    }
    .color-danger {
      color: rgb(var(--color-red500));
    }

    sub,
    sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }
    sup {
      top: -0.5em;
    }
    sub {
      bottom: -0.25em;
    }

    [data-footnotes] {
      font-size: ${(props) => props.theme.typo.size.xs};
      line-height: ${(props) => props.theme.typo.leading.xs};
      border-top: 1px solid rgb(var(--color-gray300));
    }

    [data-footnote-ref] {
      text-decoration: none;
      &:before {
        content: "[";
      }
      &:after {
        content: "]";
      }
    }

    [data-footnote-backref] {
      text-decoration: none;
    }
  }
`

export default StyledGlobal
