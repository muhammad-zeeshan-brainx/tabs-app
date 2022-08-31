import { useNavigate } from '@shopify/app-bridge-react';
import { IndexTable, TextStyle, Card, Button } from '@shopify/polaris';
import React from 'react';

export function TabsListing() {
  const navigate = useNavigate();
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

  const rowMarkup = customers.map(({ id, name, location }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>
        <TextStyle variation='strong'>{name}</TextStyle>
      </IndexTable.Cell>
      <IndexTable.Cell>{location}</IndexTable.Cell>
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
