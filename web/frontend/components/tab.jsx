import {Card, Tabs} from '@shopify/polaris';
import {useState, useCallback, Component} from 'react';
import  Help  from './Help';
import Pixel  from './Pixel';


export function TabMenu() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) =>  { setSelected(selectedTabIndex) },
    [],
  );

  const tabs = [
    {
      id: 'Pixel',
      content: 'Pixel',
      accessibilityLabel: 'Pixel',
      panelID: 'pixel',
      url: '/pixel',
    },
    {
      id: 'Help',
      content: 'Help',
      panelID: 'help',
      url: '/help',
    },
  ];

  return (
    <>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}> </Tabs>
        {tabs[selected].content == "Pixel" ? <Pixel></Pixel> : <Help></Help> }
      
    </>
  );
}