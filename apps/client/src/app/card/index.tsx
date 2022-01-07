import './card.css';
import { Favorite, FavoriteBorder, Link } from '@mui/icons-material';
import { ImageData } from '../types';
import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';

export default function Card(props: { data: ImageData, likeHandler: any }) {
  const { data } = props;
  const [like, setLike] = useState(data.liked);

  const updateLike = () => {
    setLike(!data.liked)
    props.likeHandler(data)
  }

  const [copiedText, setCopiedText] = useState<string>();

  const onCopy = () => {
    setCopiedText(data.url)
    navigator.clipboard.writeText(data.url)
  }

  return (
    <div id="card-front" className="rounded shadow">
      <div>
        <h2>
          {data.title}
          <span>{data.date}</span>
        </h2>
      </div>
      <p>{data.explanation}</p>
      <div className="logo-container">
        <img src={data.url} alt="" />
      </div>
      <div id="action-area">
        <IconButton>
          {like ? <Favorite onClick={updateLike} id="like"/> : <FavoriteBorder onClick={updateLike} id="like" />}
        </IconButton>
        <Tooltip title={copiedText === data.url
          ? "Copied!"
          : "Copy To Clipboard"}>
          <IconButton onClick={onCopy}>
            <Link/>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
