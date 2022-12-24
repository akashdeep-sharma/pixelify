import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function PageName() {
  return (
    <Page>
      <TitleBar
        title="Help"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
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
