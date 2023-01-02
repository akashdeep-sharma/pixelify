import { Card, Page, Layout, TextContainer, Heading, Button, TextField, FormLayout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useState, useCallback, useLayoutEffect} from 'react';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function Pixel() {

    const fetch = useAuthenticatedFetch();


    async function loadShopConfig() {
        var data = await fetch("/api/getIntialConfig");
    
        if (data.status == 200) 
          data = await data.json();

        console.log("load data", data);
        setpixelId(data);

      }



    

      useLayoutEffect(() => {
        loadShopConfig();
      },[]);


    const [ pixelId , setpixelId ] = useState([]);

 


    const [ newPixelCard , setnewPixelCard ] = useState(false);


    const [textFieldValue, setTextFieldValue] = useState('');

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    async function onSubmitNewPixel() {
        var data = await fetch("/api/addPixel",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/text'
          },
          body: JSON.stringify({id: textFieldValue})
        });
    
        if (data.status == 200){
        data = await data.text();
        console.log("Added new pixel", data);
        setnewPixelCard(false)
        }

    }


    async function deletPixelID(id) {
      var data = await fetch("/api/deletPixelID",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/text'
        },
        body: JSON.stringify({id: id})
      });
  
      if (data.status == 200){
      data = await data.text();
      console.log("Deleted pixel", data);
      loadShopConfig();
      }

  }


    
  return (
    <Page>
      <TitleBar
        title="Pixel"
      />
      <Layout>
        <Layout.Section>
        {pixelId.map( (id, index ) => (  
            <Card
            title={ "Pixel Number " + (index + 1) }
            secondaryFooterActions={[{content: 'Delete', onAction: () => deletPixelID(id) }]}
          >
            <Card.Section title={id}>
              
            </Card.Section>
          </Card>
            
        ))}  

        { newPixelCard && (
            <Card
            title= "Add New Pixel" 
            secondaryFooterActions={[{content: 'Cancel', onAction: () => setnewPixelCard(false) } ]}
            primaryFooterAction={{content: 'Save',  onAction: onSubmitNewPixel }}
            >
            <Card.Section>
            <TextField
                            label="Add New Pixel ID"
                            value={textFieldValue}
                            onChange={handleTextFieldChange}
                            placeholder="Example: 1234567890"
                            autoComplete="off"
                            requiredIndicator
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
