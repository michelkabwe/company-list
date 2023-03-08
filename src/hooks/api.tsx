export const removeItemAtIndex = (items: any[], index: number) => {
    const updatedList = [...items];
    updatedList.splice(index, 1);
    return updatedList;
  };

  /*export const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredData(
      jsonData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };*/
  