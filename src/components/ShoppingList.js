import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items: initialItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialItems);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function addItem(item) {
    setItems([...items, item]);
  }

  const itemsToDisplay = items.filter((item) => {
    const searchEmpty = search === "";
    const categoryAll = selectedCategory === "All";

    if (searchEmpty && categoryAll) return true;

    if (!searchEmpty && !categoryAll) {
      const regex = new RegExp(`\\b${search}`, "i");
      return regex.test(item.name) && item.category === selectedCategory;
    }
    if (!searchEmpty) {
      const regex = new RegExp(`\\b${search}`, "i");
      return regex.test(item.name);
    }
    if (!categoryAll) {
      return item.category === selectedCategory;
    }
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={addItem} />
      <Filter
        onSearchChange={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
