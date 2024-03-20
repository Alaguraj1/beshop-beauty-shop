import React,{useState,useEffect} from 'react'
import axios from "axios"

const Images = ({ mediaLink }) => {
    const [mediaData, setMediaData] = useState(null);
  
    useEffect(() => {
      axios
        .get(mediaLink)
        .then((res) => {
          setMediaData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [mediaLink]);
  
    return mediaData ? (
      <img src={mediaData.source_url} alt="images" className='js-img'/>
    ) : (
      <p>Loading image...</p>
    );
  };
  
export default Images