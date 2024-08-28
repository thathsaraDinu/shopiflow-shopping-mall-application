import InventoryTable from '@/components/inventory/inventoryTable';
import OverallInventory from '@/components/inventory/overallInventory';

import React from 'react';

const Inventory = () => {
  return (
    <>
      <OverallInventory />
      <InventoryTable />
    </>
  );
};

export default Inventory;
