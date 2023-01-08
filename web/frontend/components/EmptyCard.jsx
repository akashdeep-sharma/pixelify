import {Card, EmptyState} from '@shopify/polaris';
import React from 'react';

export default  function EmptyStateExample(props) {
    return (
      <Card sectioned>
        <EmptyState 
          heading="Manage your pixels from here"
          action={{content: 'Add New pixel', onAction : () => props.onAdd(true) }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
        </EmptyState>
      </Card>
    );
  }