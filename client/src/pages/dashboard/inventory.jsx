import InventoryTable from '@/components/inventory/inventoryTable';
import OverallInventory from '@/components/inventory/overallInventory';
import useProducts from '@/hooks/useProducts';
import React from 'react';

const Inventory = () => {
  const { data: tableData, refetch } = useProducts();

  return (
    <>
      <OverallInventory totalProducts={tableData?.length} />
      {tableData && (
        <InventoryTable
          data={tableData}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default Inventory;
