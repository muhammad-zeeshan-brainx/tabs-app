import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  IndexTable,
  TextStyle,
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { ProductsCard } from '../components';
import { TabsListing } from '../components/TabsListing';
export default function HomePage() {
  const breadcrumbs = [{ content: '', url: '/' }];
  return (
    <Page fullWidth>
      <TitleBar title='Tabs' breadcrumbs={breadcrumbs} primaryAction={null} />
      <Layout.AnnotatedSection
        id='storeDetails'
        title='Static Tabs'
        description='Static tabs are added here in the app settings. You may create a Static tab once and it will be added to all your Products (or wide range of them).
        
        Static tabs are useful for some content that is the same for all products, like Shipping terms, Reviews tab and so on.'
      >
        <TabsListing />
      </Layout.AnnotatedSection>
    </Page>
  );
}
