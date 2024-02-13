import Layout from "@/components/display/Layout";

interface ServiceLayoutProps extends React.PropsWithChildren {
  //
}

const ServiceLayout = (props: ServiceLayoutProps) => {
  const { children } = props;

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer />
    </Layout>
  );
};

export default ServiceLayout;
