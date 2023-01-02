

import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import getRawBody from "raw-body";



import fs from 'fs';



export async function getAllMetfieldsValues(data){
    var session = data.res.locals.shopify.session;
    const clientRes = new shopify.api.clients.Rest({session})
    const response = await clientRes.get({path: 'metafields', 	query: { "key": "pixelify",
    "namespace": "IDs" }});
    
    return response.body.metafields[0].value;
}



export async function deletPixelID(data){
  var  newID = await getRawBody(data._req);
  newID = newID.toString();
  newID = JSON.parse(newID);
  console.log("here",newID.id);

  var session = data.res.locals.shopify.session;
  const clientRes = new shopify.api.clients.Rest({session})
  const response = await clientRes.get({path: 'metafields', 	query: { "key": "pixelify",
  "namespace": "IDs" }});
  
  var allpixelID = JSON.parse(response.body.metafields[0].value);

  console.log(allpixelID);

  var removedpixelIDs = allpixelID.filter(function(ele){ 
    return ele != newID.id; 
});


console.log(removedpixelIDs);
   
const client = new shopify.api.clients.Graphql({ session });


const queryString = `{
  shop {
    id
    name
    currencyCode
    checkoutApiSupported
    taxesIncluded
  }

}`


const shop = await client.query({
  data: queryString,
});

  var newlyMeta = await client.query({
    data: {
      query: CREATE_METFIELD_MUTATION,
      variables: {

            "metafields": [
              {
                "key": "pixelify",
                "namespace": "IDs",
                "type": "list.number_integer",
                "value": JSON.stringify(removedpixelIDs),
                "ownerId": shop.body.data.shop.id,
              }
            ]
          
      },
    },
  });
  
  console.log( JSON.stringify(newlyMeta.body.data.metafieldsSet) );


  return;
}


async function addScriptIntoTheme(data){
    var session = data.session;
    const clientRes = new shopify.api.clients.Rest({session})



    const response = await clientRes.get({path: 'themes', 	query: { role: 'main'}});

    console.log(response.body.themes[0]);

    // get existing theme.liquid code
    const response2 = await clientRes.get({path: `themes/${response.body.themes[0].id}/assets`, 	query: {   
        asset: {"key": "layout/theme.liquid"}
        }
    });


    // console.log(response2.body.asset.value);

    var themeCode = response2.body.asset.value;

    

    var updatedThemeCode = themeCode.replace('<head>',"<head>{% render 'MultiPixelPixelify' %}");

    // console.log(updatedThemeCode);

    const response3 = await clientRes.put({ // update theme.liquid
        path: `themes/${response.body.themes[0].id}/assets`,
        data: {
            asset: {
                "key": "layout/theme.liquid",
                "value": updatedThemeCode
            }
          },
      });

     // console.log("final",response3.body);

     const {pixelTemplate} = JSON.parse(fs.readFileSync('./config.json')); // get pixel code from local file

     const response4 = await clientRes.put({ // add new snippet with pixel code
        path: `themes/${response.body.themes[0].id}/assets`,
        data: {
            asset: {
                "key": "snippets/MultiPixelPixelify.liquid",
                "value": pixelTemplate
            }
          },
      });

      console.log("done",response4.body);












    return;
}



const CREATE_METFIELD_MUTATION = `
mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        createdAt
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;







export async function addMetafield(data) {



    var session = data.res.locals.shopify.session;


    const client = new shopify.api.clients.Graphql({ session });
    
    const queryString = `{
            shop {
              id
              name
              currencyCode
              checkoutApiSupported
              taxesIncluded
            }

      }`


    const shop = await client.query({
        data: queryString,
      });

      console.log(JSON.stringify(shop.body.data.shop))






    const clientRes = new shopify.api.clients.Rest({session})
    const response = await clientRes.get({path: 'metafields', 	query: { "key": "pixelify",
    "namespace": "IDs" }});
    



      console.log("allMetafileds", response.body.metafields);


      var  newID = await getRawBody(data._req);
      
      newID = newID.toString();
      newID = JSON.parse(newID);

      var pixelIDs = [newID.id];
      console.log('id', pixelIDs);

      if(response.body.metafields.length == 0){
        addScriptIntoTheme({session});
      }
      else{
        pixelIDs = pixelIDs.concat(JSON.parse(response.body.metafields[0].value)); // add new pixel ID with existing ID's
      }

      console.log(pixelIDs); 

    try {

          var newlyMeta = await client.query({
            data: {
              query: CREATE_METFIELD_MUTATION,
              variables: {

                    "metafields": [
                      {
                        "key": "pixelify",
                        "namespace": "IDs",
                        "type": "list.number_integer",
                        "value": JSON.stringify(pixelIDs),
                        "ownerId": shop.body.data.shop.id,
                      }
                    ]
                  
              },
            },
          });
          
          console.log( JSON.stringify(newlyMeta.body.data.metafieldsSet) );

      } catch (error) {
        console.log("error")
        if (error instanceof GraphqlQueryError) {
          throw new Error(
            `${error.message}\n${JSON.stringify(error.response, null, 2)}`
          );
        } else {
          throw error;
        }
      }


      

    
    return;
}


