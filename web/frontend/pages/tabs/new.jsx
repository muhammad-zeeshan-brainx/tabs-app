import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { TabForm } from '../../components/TabForm';
export default function NewTab() {
  const breadcrumbs = [{ content: 'Tabs', url: '/' }];

  return (
    <Page fullWidth>
      <TitleBar
        title='Add New'
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <Layout.AnnotatedSection
        id='storeDetails'
        title='Add static tab'
        description='Static tabs are added here in the app settings. You may create a Static tab once and it will be added to all your Products (or wide range of them).'
      >
        <TabForm />
      </Layout.AnnotatedSection>
    </Page>
  );
}
