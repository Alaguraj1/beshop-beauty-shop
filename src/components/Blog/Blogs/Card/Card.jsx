import Link from 'next/link';
import Images from "../Card/Images"
import { format } from 'date-fns';

export const Card = ({ blog }) => {
  const { title, id, image, excerpt, date, content, jetpack_featured_media_url } = blog;

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    
    // Check if the dateObject is valid
    if (isNaN(dateObject)) {
      return "Invalid Date";
    }
  
    const formattedDate = format(dateObject, 'dd MMM ');
    return formattedDate;
  }
  
  return (
    <div className='blog-item'>
      <Link href={`/blog/${id}`}>
        <a className='blog-item__img'>
          {blog?._links?.["wp:featuredmedia"]?.map((mediaLink) => (
            <Images key={mediaLink.href} mediaLink={mediaLink.href} className='js-img' />
          ))}

          <span className='blog-item__date'>
            <span>{formatDate(date)}</span> 
          </span>
        </a>
      </Link>
      <Link href={`/blog/${id}`}>
        <a className='blog-item__title' dangerouslySetInnerHTML={{ __html: title.rendered }}></a>
      </Link>
      <p dangerouslySetInnerHTML={{ __html: excerpt?.rendered }}></p>
      <Link href={`/blog/${id}`}>
        <a className='blog-item__link'>
          Read more <i className='icon-arrow-md'></i>
        </a>
      </Link>
    </div>
  );
};
