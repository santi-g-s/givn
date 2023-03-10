import { NativeSelect, TextInput } from '@mantine/core';

const data = [
//   { value: 'eur', label: 'πͺπΊ EUR' },
  { value: 'usd', label: 'πΊπΈ USD' },
//   { value: 'cad', label: 'π¨π¦ CAD' },
//   { value: 'gbp', label: 'π¬π§ GBP' },
//   { value: 'aud', label: 'π¦πΊ AUD' },
];

export function CurrencyInput() {
  const select = (
    <NativeSelect
      data={data}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  return (
    <TextInput
      type="number"
      placeholder="1000"
      label="Transfer amount"
      rightSection={select}
      rightSectionWidth={92}
    />
  );
}