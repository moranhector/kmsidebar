import React, { createContext, useState } from 'react';

const KillerContext = createContext();

const KillerProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <KillerContext.Provider
      value={{ token, setToken, albumId, setAlbumId, userId, setUserId }}
    >
      {children}
    </KillerContext.Provider>
  );
};

export { KillerProvider, KillerContext };
