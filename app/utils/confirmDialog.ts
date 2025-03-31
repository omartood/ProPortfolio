export const confirmDelete = async (itemName: string): Promise<boolean> => {
  return window.confirm(`Are you sure you want to delete this ${itemName}?`);
};
