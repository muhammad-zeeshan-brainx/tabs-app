import { useNavigate } from '@shopify/app-bridge-react';
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Select,
} from '@shopify/polaris';

import React from 'react';
import { useState, useCallback } from 'react';

import { useAuthenticatedFetch } from '../hooks';

export function TabForm() {
  const fetch = useAuthenticatedFetch();

  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  const [assignedTo, setAssignedTo] = useState('All Products');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title,
      label,
      description,
      assignedTo,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch('/api/tabs/new', requestOptions);

    setTitle('');
    setLabel('');
    setDescription('');
    setAssignedTo('All Products');
  };

  const handleEmailChange = useCallback((value) => setTitle(value), []);

  const handleLabelChange = useCallback((newValue) => setLabel(newValue), []);

  const handleDescriptionChange = useCallback(
    (newValue) => setDescription(newValue),
    []
  );

  const handleAssignedToChange = useCallback(
    (value) => setAssignedTo(value),
    []
  );

  const options = [
    { label: 'All Products', value: 'All Products' },
    { label: 'Chosen Products', value: 'Chosen Products' },
  ];

  return (
    <Card sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={title}
            onChange={handleEmailChange}
            label='Title'
            type='text'
          />

          <TextField
            value={label}
            onChange={handleLabelChange}
            label='Label (optional)'
            type='text'
            helpText={
              <span>
                Helps you identify panels in the app, not visible to your
                customers
              </span>
            }
          />

          <TextField
            label='Description'
            value={description}
            onChange={handleDescriptionChange}
            multiline={10}
            autoComplete='off'
          />

          <Select
            label='Assigned to'
            options={options}
            onChange={handleAssignedToChange}
            value={assignedTo}
          />

          <Button submit primary>
            Save Tab
          </Button>
        </FormLayout>
      </Form>
    </Card>
  );
}
