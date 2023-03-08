import React, { useState, useEffect } from "react";
import Companycard from "./Companycard";

interface Data {
  symbol: string;
  name: string;
  status: string;
}

type DataProps = {
  jsonData: Data[];
};

type AddItemProps = {
  handleClick: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
};

type FilteredProps = {
  filteredData: any[];
};

type CompanyListProps = FilteredProps & DataProps & AddItemProps;

const CompanyList: React.FC<CompanyListProps> = ({
  filteredData,
  handleClick,
}) => {
  return (
    <div>
      {filteredData.map((item: any, index: number) => {
        return (
          <Companycard
            key={index}
            item={item}
            index={index}
            BtnOnClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default CompanyList;
