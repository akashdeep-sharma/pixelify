import { Card, Page, Layout, TextContainer, Heading, Button, TextField, FormLayout, Loading, Frame, Banner } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useState, useCallback, useLayoutEffect} from 'react';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import EmptyStateExample from "./EmptyCard";

export default function Pixel() {

    const fetch = useAuthenticatedFetch();


    async function loadShopConfig() {
        var data = await fetch("/api/getIntialConfig");
    
        if (data.status == 200){
          data = await data.json();

          console.log("load data", data);
          setpixelId(data);
        }
    }




      useLayoutEffect(() => {
        loadShopConfig();
      },[]);


    const [ pixelId , setpixelId ] = useState([]);

    const [ progress , setProgress ] = useState(false);

    const [ showBanner , setShowBanner ] = useState(false);

    const [ newPixelCard , setnewPixelCard ] = useState(false);


    const [textFieldValue, setTextFieldValue] = useState('');

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    async function onSubmitNewPixel() {
        setProgress(true)
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
        setnewPixelCard(false);
        await loadShopConfig();
        setShowBanner("success");
        setTimeout( () => setShowBanner(false), 4000 )
        }
        else {
          setShowBanner("critical");
          setTimeout( () => setShowBanner(false), 4000 )
        }
        setProgress(false)

    }


    async function deletPixelID(id) {
      setProgress(true)
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
      await loadShopConfig();
      setShowBanner("success");
      setTimeout( () => setShowBanner(false), 4000 )
      }
      else {
        setShowBanner("critical");
        setTimeout( () => setShowBanner(false), 4000 )
      }
      setProgress(false)

  }


    
  return (
    <Page>
      <TitleBar
        title="Pixel"
      />
      <Layout>
        <Layout.Section>
          <Frame>
          
          { progress && <Loading></Loading> }
          <br></br>
          { showBanner && <Banner
              title= { showBanner == "success"  ? "Done, Please refresh the page to see changes on site." : "Error, please try again after sometime."}
              status= { showBanner }
              onDismiss={() => {setShowBanner(false)}}
            /> }
          <br></br>
          { pixelId.length == 0 && <EmptyStateExample onAdd={setnewPixelCard}></EmptyStateExample>}
        {pixelId.map( (id, index ) => (  
            <Card
            id= {index}
            title={ "Pixel Number " + (index + 1) }
            secondaryFooterActions={[{content: 'Delete', destructive:true, onAction: () => deletPixelID(id) }]}
          >
            <Card.Section title= { "ID: " + id}>
              
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
        <br></br>
        <Button  primary onClick = { () => setnewPixelCard(true)}>Add New Pixel</Button>;

    
        </Frame>



        </Layout.Section>


      </Layout>
    </Page>
  );
}
