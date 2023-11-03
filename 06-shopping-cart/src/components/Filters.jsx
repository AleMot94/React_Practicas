import { useId } from "react";
import { useFilter } from "../hooks/useFilter";
import "./Filters.css";

function Filters() {
  const { filters, setFilters } = useFilter();
  // los ID de los labels y los input es necesario que sean unicos
  // la forma de crear ids unicos para toda la aplicacion es con el useId
  const minPriceFilterId = useId();
  const categoruFilterId = useId();

  const handleChangePrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Price</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangePrice}
          value={filters.minPrice}
        />
        <span>{filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoruFilterId}>Category</label>
        <select id={categoruFilterId} onChange={handleChangeCategory}>
          <option value="all">Todos</option>
          <option value="laptops">Portatiles</option>
          <option value="smartphones">Celulares</option>
          <option value="home-decoration">Decoracion hogareña</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
