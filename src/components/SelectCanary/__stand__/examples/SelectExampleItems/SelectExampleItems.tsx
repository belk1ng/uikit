import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '##/components/SelectCanary';

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

export const SelectExampleItems = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Выберите значение"
      />
    </Example>
  );
};