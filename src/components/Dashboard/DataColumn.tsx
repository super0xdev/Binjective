import React from "react";

const DataColumn = ({
  title,
  value,
  estimatedValue,
}: {
  title: string;
  value: string | number | undefined;
  estimatedValue?: string | number;
}) => (
  <div className="flex items-center justify-between pt-4 md:justify-center md:pt-0">
    <div className="md:hidden">{title}</div>
    <div className="text-center">
      <span>{value}</span>
      {estimatedValue ? (
        <div className="text-sm">
          <span>{estimatedValue}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  </div>
);

export default DataColumn;
