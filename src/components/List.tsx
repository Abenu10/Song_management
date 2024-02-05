import React from 'react';
import { useSelector } from 'react-redux';
import { ListStyled } from '../styledComponents/ListStyled';

const List = () => {
  const songs = useSelector((state) => state.songs);

  return (
    <ListStyled>
      {songs.map((song) => (
        <div key={song.id}>
          <img src={song.image} alt={song.title} />
          <h2>{song.title}</h2>
        </div>
      ))}
    </ListStyled>
  );
};

export default List;