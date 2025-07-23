import React from "react";

interface ExampleItemProps {
  name: string;
  handleSelect: () => void;
}

const ExampleItem: React.FC<ExampleItemProps> = ({ name, handleSelect }) => {
  return (
    <button
      className="example-button"
      onClick={handleSelect}
      type="button"
      aria-label={`Load example: ${name}`}
    >
      {name}
    </button>
  );
};

export default ExampleItem;
