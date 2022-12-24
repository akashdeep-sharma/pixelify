import {Card, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';


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
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section>
        {tabs[selected].content == "Pixel" ? <pixel></pixel> : <help></help> }
      </Tabs>
    </Card>
  );
}