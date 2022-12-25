import { Card, Page, Layout, TextContainer, Heading, Button, TextField, FormLayout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useState, useCallback, Component} from 'react';

export default function Pixel() {
    const [ pixelId , setpixelId ] = useState(['666778897', '76786879']);

    const [ newPixelCard , setnewPixelCard ] = useState(false);


    const [textFieldValue, setTextFieldValue] = useState('');

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    
  return (
    <Page>
      <TitleBar
        title="Pixel"
      />
      <Layout>
        <Layout.Section>
        {pixelId.map( (id, index ) => (  
            <Card
            title={ "Pixel number : " + (index + 1) }
            secondaryFooterActions={[{content: 'Delete'}]}
          >
            <Card.Section title={id}>
              
            </Card.Section>
          </Card>
            
        ))}  

        { newPixelCard && (
            <Card
            title= "Add New Pixel" 
            secondaryFooterActions={[{content: 'Cancel', onAction: () => setnewPixelCard(false) } ]}
            primaryFooterAction={{content: 'Save'}}
            >
            <Card.Section>
            <TextField
                            label="Add New Pixel ID"
                            value={textFieldValue}
                            onChange={handleTextFieldChange}
                            placeholder="Example: 1234567890"
                            autoComplete="off"
                            />
            </Card.Section>
           

            </Card>
        )}
        </Layout.Section>
        <Layout.Section>
        <Button primary onClick = { () => setnewPixelCard(true)}>Add New Pixel</Button>;
        </Layout.Section>
      </Layout>
    </Page>
  );
}
