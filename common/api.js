import { setTimeout } from 'core-js';

const items = [
  { id: 0, label: 'Item 1', description: 'This item is useful to...' },
  { id: 1, label: 'Item 2', description: 'This item is useful to...' },
  { id: 2, label: 'Item 3', description: 'This item is useful to...' },
  { id: 3, label: 'Item 4', description: 'This item is useful to...' },
  { id: 4, label: 'Item 5', description: 'This item is useful to...' },
];

export const getItems = async () => {
  const result = await new Promise(resolve => {
    setTimeout(() => {
      resolve(items);
    }, 2000);
  });
  return result;
};
