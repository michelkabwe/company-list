import React, { useState, useEffect} from 'react'
import Companycard from './Companycard'

  interface FilteredProps {
    filteredData:any[]
  }

    const CompanyList:React.FC<FilteredProps>= ({filteredData }) => {

    return (
        <div>
            {filteredData.map((item: any , index: number) => {
                return (
                    
                <Companycard key={index} item={item} index={index}
                 />)}
            )} 
    </div>
    )
}

export default CompanyList
