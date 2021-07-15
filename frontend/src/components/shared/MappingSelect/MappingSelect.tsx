import React from "react";
import { Dictionary } from "types";

import { MenuItem, Select } from "@material-ui/core";

interface MappingSelectProps {
  value: any;
  setValue: (value: any) => void;
  mapping: Dictionary<string>;
}

const MappingSelect = (props: MappingSelectProps) => {
  const { value, setValue, mapping, ...rest } = props;
  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      fullWidth
      value={value}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        setValue(event.target.value as string)
      }
    >
      {Object.keys(mapping).map((mappingValue: string) => (
        <MenuItem value={mappingValue}>{mappingValue}</MenuItem>
      ))}
    </Select>
  );
};

export default MappingSelect;
