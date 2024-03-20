import Images from 'components/Blog/Blogs/Card/Images';
import Link from 'next/link';
import { format } from 'date-fns';


export const PostContent = ({ blog }) => {

  const { title, id, image, excerpt, date, content, tags } = blog;


  console.log("blogblog", blog)

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    // Check if the dateObject is valid
    if (isNaN(dateObject)) {
      return "Invalid Date";
    }

    const formattedDate = format(dateObject, 'dd MMM yyyy');
    return formattedDate;
  }


  return (
    <>
      <div className='post-top'>
        <h2 className='blog_post_heading' dangerouslySetInnerHTML={{__html : title?.rendered}}></h2>
        {/* <p>{blog.subTitle}</p> */}
        {/* <img src={blog.image} className='js-img' alt='' /> */}
        {blog?._links?.["wp:featuredmedia"]?.map((mediaLink) => (
          <Images key={mediaLink.href} mediaLink={mediaLink.href} className='js-img' />
        ))}
        <ul className='post-top__info'>
          <li className='post-top__date'>
            <i className='icon-date'></i>
            {formatDate(date)}
          </li>
          <li className='post-top__user'>
            <i className='icon-user2'></i>
            <a href='#/'>by {blog.authorName}</a>
          </li>
          <li className='post-top__watch'>
            <i className='icon-eye'></i>
            {blog.totalWatchCount}
          </li>
          <li className='post-top__comment'>
            <i className='icon-comment'></i>
            {blog.totalCommentCount}
          </li>
        </ul>
      </div>
      <div className='post-content'>
        <p dangerouslySetInnerHTML={{__html : content?.rendered}}></p>

        {/* <h6>{blog.titleTwo}</h6>
        <p>{blog.contentTwo}</p>
        <blockquote className='blockquote'>
          “{blog.quote.content}”
          <span className='blockquote-author'>{blog.quote.author}</span>
        </blockquote>
        <ul className='post-list'>
          {blog.postList.map((list, index) => (
            <li key={index}>
              <span>{list.title}</span>
              {list.content}
            </li>
          ))}
        </ul>
        <div
          className='discount discount-about js-img'
          style={{ backgroundImage: `url(${blog.discount.thumb})` }}
        >
          <div className='wrapper'>
            <div className='discount-info'>
              <span className='saint-text'>{blog.discount.silentText}</span>
              <h2>{blog.discount.title}</h2>
              <p>{blog.discount.content}</p>
              <ul>
                {blog.discount.attributes.map((attribute, index) => (
                  <li key={index}>
                    <span>{attribute.title}</span> - {attribute.content};
                  </li>
                ))}
              </ul>
              <Link href='/shop'>
                <a className='btn'>Shop now</a>
              </Link>
            </div>
          </div>
        </div>
        <p>{blog.contentThree}</p> */}
      </div>
      <div className='post-bottom'>
        <div className='post-bottom__info'>
          <div className='post-bottom__tags'>
            <span>Tags:</span>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <Link href='#/'>
                    <a>{tag}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='contacts-info__social'>
            <span>Share:</span>
            <ul>
              <li>
                <a href='#/'>
                  <i className='icon-facebook'></i>
                </a>
              </li>
              <li>
                <a href='#/'>
                  <i className='icon-twitter'></i>
                </a>
              </li>
              <li>
                <a href='#/'>
                  <i className='icon-insta'></i>
                </a>
              </li>
              <li>
                <a href='#/'>
                  <i className='icon-in'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className='post-bottom__nav'>
          <a href='#/'>
            <i className='icon-arrow'></i>previous post
          </a>
          <a href='#/'>
            next post<i className='icon-arrow'></i>
          </a>
        </div> */}
      </div>
    </>
  );
};
