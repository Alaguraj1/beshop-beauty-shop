import categoryData from 'data/category/category';
import { Categories } from './Categories/Categories';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Category = () => {
  const categories = [...categoryData];

const [category, setCategory] = useState([])


useEffect(() => {
  GetCategory()
},[])

const GetCategory = () => {
  axios
  .get(`https://sreevidhya.co.in/file//wp-json/cocart/v1/products/categories/?per_page=100`)
  .then((response) => {
    setCategory(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}
console.log("category", category)

  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className='all-categories'>
        <div className='top-categories__items'>
          <Categories categories={category} />
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF --> */}
    </>
  );
};
