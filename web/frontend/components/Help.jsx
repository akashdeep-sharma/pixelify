import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function Help() {
  return (
    <Page>
      <TitleBar
        title="Help"
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Help</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
