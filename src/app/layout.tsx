import RecoilProvider from "@/app/_components/config/RecoilProvider";

interface RootLayoutProps extends React.PropsWithChildren {
  //
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <RecoilProvider flag={true}>{children}</RecoilProvider>
      </body>
    </html>
  );
};

export default RootLayout;
