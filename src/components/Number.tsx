import { Box, Text } from "@chakra-ui/react";

interface Props {
  number: string;
  numbers: any
}

export const Number = ({ number, numbers }: Props) => {
  return (
    <Box padding={2} bg={numbers[number] ? "blue.300" : "white"} margin='0 auto' boxShadow="md" rounded="full">
      <Box outline="4px solid blue" rounded='full'>
        <Text textAlign='center' fontSize="2xl" fontWeight={600} mt="5px">
          {number}
        </Text>
      </Box>
    </Box>
  );
};
