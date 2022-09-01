import { useNavigate } from '@shopify/app-bridge-react';
import { IndexTable, TextStyle, Card, Button } from '@shopify/polaris';
import React from 'react';
import { useEffect } from 'react';
import { useAuthenticatedFetch } from '../hooks';
import { useState } from 'react';
import ToggleButton from 'react-toggle-button';
export function TabsListing() {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([]);
  const [isTabsChange, setIsTabsChange] = useState(false);

  const [toggleBtn, setToggleBtn] = useState(false);

  useEffect(async () => {
    const response = await fetch('/api/tabs');
    const data = await response.json();
    setTabs([...data.tabs]);
  }, [isTabsChange]);

  const customers = [
    {
      id: '3411',
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const rowMarkup = tabs?.map(({ _id, title, assignedTo, enable }, index) => (
    <IndexTable.Row id={_id} key={_id} position={index}>
      <IndexTable.Cell>
        <TextStyle variation='strong'>{title}</TextStyle>
      </IndexTable.Cell>
      <IndexTable.Cell>{assignedTo}</IndexTable.Cell>
      <IndexTable.Cell>
        <Button primary>Edit</Button>
        <Button destructive>Delete</Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const addNewHandler = () => {
    navigate('/tabs/new');
  };

  const settingHandler = () => {
    navigate('/tabs/setting');
  };

  return (
    <Card sectioned>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        headings={[{ title: 'Tab' }, { title: 'Assigned To' }, { title: '' }]}
        selectable={false}
      >
        {rowMarkup}
        <IndexTable.Row>
          <IndexTable.Cell>
            <Button primary onClick={addNewHandler}>
              Add New
            </Button>
          </IndexTable.Cell>
          <IndexTable.Cell></IndexTable.Cell>
          <IndexTable.Cell>
            <Button primary onClick={settingHandler}>
              Settings
            </Button>
          </IndexTable.Cell>
        </IndexTable.Row>
      </IndexTable>
    </Card>
  );
}
