import { useNavigate } from 'react-router-dom';
import { IndexTable, TextStyle, Card, Button } from '@shopify/polaris';

import React from 'react';
import { useEffect } from 'react';
import { useAuthenticatedFetch } from '../hooks';
import { useState, useCallback } from 'react';
import Switch from '@mui/material/Switch';

import { check } from 'prettier';

export function TabsListing() {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([]);
  const [isTabsChange, setIsTabsChange] = useState(false);

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

  const deleteHandler = async (event) => {
    const id = event.target.closest('button').id;
    try {
      const response = await fetch(`/api/tabs/${id}`, { method: 'DELETE' });
      console.log('delted successfully');
    } catch (error) {
      console.log('could not delete');
    }
  };

  const editHandler = async (event) => {
    const id = event.target.closest('button').id;

    try {
      const response = await fetch(`/api/tabs/${id}`);
      const data = await response.json();
      navigate('/tabs/new', { state: { data } });
    } catch (error) {
      console.log('could not find such tab', error);
    }
  };

  const toggleSwitchHandler = async (event) => {
    const id = event.target.closest('input').id;
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `/api/tabs/${id}/changeVisbility`;
    const response = await fetch(url, requestOptions);
    setIsTabsChange((prev) => !prev);
  };
  const rowMarkup = tabs?.map(({ _id, title, assignedTo, enable }, index) => (
    <IndexTable.Row id={_id} key={_id} position={index}>
      <IndexTable.Cell>
        <Switch checked={enable} onChange={toggleSwitchHandler} id={_id} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <TextStyle variation='strong'>{title}</TextStyle>
      </IndexTable.Cell>
      <IndexTable.Cell>{assignedTo}</IndexTable.Cell>
      <IndexTable.Cell>
        <Button primary id={_id} onClick={editHandler}>
          Edit
        </Button>
        <Button destructive id={_id} onClick={deleteHandler}>
          Delete
        </Button>
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
        headings={[{ title: '' }, { title: 'Tab' }, { title: 'Assigned To' }]}
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
