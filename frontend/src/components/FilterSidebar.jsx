import { List, ListItem, Checkbox, Button, Typography } from "@mui/material";
import { useState } from "react";

const FilterSidebar = ({ categories, applyFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const handleApplyFilters = () => {
    // Pass selected categories to the parent component
    applyFilters(selectedCategories);
  };

  return (
    <div>
      <List>
        <ListItem>
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            color="primary"
          >
            Apply Filters
          </Button>
        </ListItem>
        <ListItem>
          <Typography variant="h6">Categories</Typography>
        </ListItem>
        <div className="flex flex-wrap md:flex-col">
          {categories.map((category) => (
            <ListItem key={category._id}>
              <Checkbox
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCategoryToggle(category._id)}
              />
              <Typography>{category.category_name}</Typography>
            </ListItem>
          ))}
        </div>
      </List>
    </div>
  );
};

export default FilterSidebar;
