import React, { useState } from "react";

interface ExampleItemProps {
  name: string;
  handleSelect: () => void;
}

const ExampleItem: React.FC<ExampleItemProps> = (props) => {
  const { name, handleSelect } = props;
  return (
    <span className="button" onClick={handleSelect}>
      {name}
    </span>
  );
};

export default ExampleItem;
