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
            <Heading>Thankyou for choosing Pixelify</Heading>
            <TextContainer>
<br></br>
         For support, please send us email on <b>support@aaowle.com</b>
           </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
