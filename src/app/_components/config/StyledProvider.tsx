"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import useMount from "@/libs/hook/useMount";
import Global from "@/styles/global";
import { theme } from "@/styles/theme";

interface StyledProviderProps extends React.PropsWithChildren {
  //
}

const StyledProvider = (props: StyledProviderProps) => {
  const { children } = props;

  const { mountStructure } = useMount();
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (mountStructure.isMounted) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <Global />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default StyledProvider;
