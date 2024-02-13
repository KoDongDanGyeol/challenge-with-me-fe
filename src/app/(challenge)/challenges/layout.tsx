import Layout from "@/components/display/Layout";

interface ChallengeLayoutProps extends React.PropsWithChildren {
  //
}

const ChallengeLayout = (props: ChallengeLayoutProps) => {
  const { children } = props;

  return (
    <Layout>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default ChallengeLayout;
