import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updatePropertyStatus } from "../../store/propertyStatus.slice";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";

const TypeSelector: React.FC = () => {
  const status = useSelector((state:any)=>state.status)
  const [value, setValue] = useState(status);
  const dispatch = useDispatch();

  function handleUpdate(value: SegmentedValue) {
    setValue(value as string);
    dispatch(updatePropertyStatus(value));
  }

  return (
    <Segmented
      options={["FORSALE", "RENT", "SOLD"]}
      value={value}
      onChange={handleUpdate}
    />
  );
};

export default TypeSelector;
