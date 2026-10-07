import { Flex, Text } from '@sanity/ui';

export function Logo() {
  return (
    <Flex align="center" gap={3} style={{ padding: '0 4px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/branding/mpas-symbol.png" alt="" height={22} style={{ height: 22, width: 'auto' }} />
      <Text size={1} weight="semibold">
        mpas Website Admin
      </Text>
    </Flex>
  );
}
