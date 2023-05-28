// import { Component } from 'react';
// import { nanoid } from 'nanoid';
import Searchbar from './Searchbar/Searchbar';
// import ContactList from './ContactList/ContactList';
// import Filter from './Filter/Filter';

export const App = () => {
  const onSubmit = false;
  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {/* <ImageGallery>
        <ImageGalleryItem />
      </ImageGallery>
      <Loader />
      <Button />

      <Modal /> */}
    </div>
  );
};
