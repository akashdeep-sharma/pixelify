import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";



export default function HomePage() {
  return (
    
    <Page narrowWidth>
      <TitleBar title="Pixelify" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
