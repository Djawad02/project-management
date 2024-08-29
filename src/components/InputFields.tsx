import React from "react";
import { HStack, Input, FormControl, FormLabel } from "@chakra-ui/react";

interface InputField {
  id: string;
  name?: string;
  label: string;
  placeholder: string;
  value?: string;
  component?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputFieldsProps {
  fields: InputField[];
}

const InputFields = ({ fields }: InputFieldsProps) => {
  return (
    <HStack spacing={2} mt={2} align="flex-start" flexWrap="wrap">
      {fields.map((field) => (
        <FormControl key={field.id}>
          <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
          {field.component ? (
            field.component
          ) : (
            <Input
              id={field.id}
              name={field.name || field.id}
              placeholder={field.placeholder}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        </FormControl>
      ))}
    </HStack>
  );
};

export default InputFields;
