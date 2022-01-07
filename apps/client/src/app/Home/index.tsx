import './home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../card';
import { ImageData } from '../types';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';

const baseUrl = 'https://api.nasa.gov/planetary/apod'
const params = {
  'api_key': process.env['NX_API_KEY'] as string,
  'count': 10
}

export function Home() {
  const [data, setData] = useState([]);
  
  const parseData = (data: ImageData[], pulledData: ImageData[]) => {
    for (let i = 0; i < data.length; i++) {
      const image = data[i]
      const existImg = pulledData.find(d => d.url === image.url)
      if (existImg) {
        image.liked = existImg.liked
      } else {
        image.liked = false
      }
    }
  }
  
  useEffect(() => {
    const pulledData = localStorage.getItem('data')
    axios.get(baseUrl, { params }).then((res) => {
      if (pulledData) {
        parseData(res.data, JSON.parse(pulledData));
      }
      setData(res.data)
      localStorage.setItem('data', JSON.stringify(res.data))
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  
  const updateLike = (image: ImageData) => {
    image.liked = !image.liked
    localStorage.setItem('data', JSON.stringify(data))
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome to Astronomy of The Day 👋
          </h1>
        </div>

        <div id="middle-content">
          {data.map(image => {
            return <Card data={image} likeHandler={updateLike} />
          })}
        </div>

        <p id="love">
          Carefully crafted with <HeartIcon />. Author: Giang Bui Huong. Empowered with Nx, ReactJS, Material UI, Axios.
          
        </p>
      </div>
    </div>
  );
}

export default Home;
