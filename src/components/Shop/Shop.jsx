import { Products } from 'components/Product/Products/Products';
import { PagingList } from 'components/shared/PagingList/PagingList';
import { usePagination } from 'components/utils/Pagination/Pagination';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import Select from "react-select";
import { AsideItem } from '../shared/AsideItem/AsideItem';
import axios from 'axios';

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ isNew: false, isSale: true });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get(`https://sreevidhya.co.in/file//wp-json/cocart/v1/products/categories/?per_page=100`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://sreevidhya.co.in/file/wp-json/cocart/v1/products/?per_page=100`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    const filteredByName = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter products based on the selected category (if any)
    const filteredByCategory = selectedCategory
      ? filteredByName.filter(product =>
          product.categories.some(cat => cat.id === selectedCategory)
        )
      : filteredByName;

    // Sort filtered products by price
    const sortedProducts = [...filteredByCategory];
    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) =>
        parseFloat(a.price.replace("₹", "").replace(",", "")) -
        parseFloat(b.price.replace("₹", "").replace(",", ""))
      );
    } else if (sortOrder === "desc") {
      sortedProducts.sort((a, b) =>
        parseFloat(b.price.replace("₹", "").replace(",", "")) -
        parseFloat(a.price.replace("₹", "").replace(",", ""))
      );
    }

    setFilteredProducts(sortedProducts);
  }, [searchQuery, sortOrder, products, selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (selectedOption) => {
    setSortOrder(selectedOption.value);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const sortingOptions = [
    { value: "asc", label: "Low to High" },
    { value: "desc", label: "High to Low" },
  ];

  const recentlyViewed = products.slice(0, 3);
  const todaysTop = products.slice(3, 6);
  const paginate = usePagination(filteredProducts, 9);

console.log("products",products)

  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className='shop'>
        <div className='wrapper'>
          <div className='shop-content'>
            {/* <!-- Shop Aside --> */}
            <div className='shop-aside'>
              <div className='box-field box-field__search'>
                <input
                  type='search'
                  className='form-control'
                  placeholder='Search'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <i className='icon-search'></i>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Categories</span>

                <ul>
                  {
                    categories.map((item) => {
                      return (
                        <li key={item.id} onClick={() => handleCategoryClick(item.id)}>
                          <a  >{item.name}</a>
                        </li>
                      )
                    })
                  }
                </ul>

              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Price</span>
                <div className='range-slider'>
                  <Range
                    min={0}
                    max={100}
                    defaultValue={[0, 20]}
                    tipFormatter={(value) => `${value}$`}
                    allowCross={false}
                    tipProps={{
                      placement: 'bottom',
                      prefixCls: 'rc-slider-tooltip',
                    }}
                  />
                </div>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>You have viewed</span>
                {recentlyViewed.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Top 3 for today</span>
                {todaysTop.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
            </div>
            {/* <!-- Shop Main --> */}
            <div className='shop-main'>
              <div className='shop-main__filter'>
                <div className='shop-main__checkboxes'>
                  <label className='checkbox-box'>
                    <input
                      checked={filter.isSale}
                      onChange={() =>
                        setFilter({ ...filter, isSale: !filter.isSale })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    SALE
                  </label>
                  <label className='checkbox-box'>
                    <input
                      checked={filter.isNew}
                      onChange={() =>
                        setFilter({ ...filter, isNew: !filter.isNew })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    NEW
                  </label>
                </div>
                <div className='shop-main__select'>
                  <Select
                    options={sortingOptions}
                    value={sortingOptions.find((option) => option.value === sortOrder)}
                    onChange={handleSortChange}
                    placeholder="Sort by Price"
                  />

                </div>
              </div>
              <div className='shop-main__items'>
                <Products products={paginate?.currentData() && filteredProducts} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
        <img
          className='shop-decor js-img'
          src='/assets/img/shop-decor.jpg'
          alt=''
        />
      </div>
    </div>
  );
};
