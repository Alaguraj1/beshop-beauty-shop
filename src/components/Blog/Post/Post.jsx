// import blogData from 'data/blog/blog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PostComment } from './PostComment/PostComment';
import { PostContent } from './PostContent/PostContent';
import axios from "axios"

export const Post = () => {

  const router = useRouter();
  // const blogs = [...blogData];
  const [blog, setBlog] = useState(null);

  // useEffect(() => {
  //   axios.get("https://sreevidhya.co.in/file/wp-json/wp/v2/posts/?per_page=100", {
  //     // auth: {
  //     //   username: userKey,
  //     //   password: userPassword
  //     // }
  //   }).then((res) => {
  //     setBlog(res.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [])

  console.log("blogsblogsblogsblogsblogsblogs",blog)


  useEffect(() => {
    axios.get("https://sreevidhya.co.in/file/wp-json/wp/v2/posts/?per_page=100").then((res) => {
      const postId = parseInt(router.query.id); // Convert to integer
      const data = res?.data?.find((bg) => bg.id === postId);
      setBlog(data)
    }).catch((error) => {
      console.log(error)
    })
     
  }, [router.query.id]);

  if (!blog) return <></>;

  return (
    <>
      {/* <!-- BEGIN POST --> */}
      <div className='post'>
        <div className='wrapper'>
          <PostContent blog={blog} />
          <PostComment blog={blog} />
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- POST EOF   --> */}
    </>
  );
};
