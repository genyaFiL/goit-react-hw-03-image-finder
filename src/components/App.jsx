import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { PixabayAPI } from './Pixabay/Pixabay';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import Notiflix from 'notiflix';
import css from './AppStyles.module.css';

const pixabayAPI = new PixabayAPI();

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    loading: false,
    endTotalHits: false,
    showModal: false,
  };

  onSubmit = value => {
    if (value === this.state.searchQuery) {
      return Notiflix.Notify.info(
        `You are currently viewing this query "${this.state.searchQuery}", try another query `
      );
    }
    this.setState({ images: [], searchQuery: value });
  };

  componentDidMount() {
    pixabayAPI.page = 1;
  }

  componentDidUpdate = async (_, prevState) => {
    pixabayAPI.q = this.state.searchQuery.trim();

    if (!pixabayAPI.q) {
      Notiflix.Notify.warning(
        `The field cannot be empty. Please enter a search query`
      );

      return;
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        pixabayAPI.page = 1;
        const { data } = await pixabayAPI.fetchPhotos();

        if (!data.hits.length) {
          Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      } catch (err) {
      } finally {
        this.setState({ loading: false, endTotalHits: false });
      }
    }
  };

  handleLoadMore = async () => {
    pixabayAPI.page += 1;

    try {
      const { data } = await pixabayAPI.fetchPhotos();

      if (data.totalHits <= pixabayAPI.page * pixabayAPI.perPage) {
        this.setState({ endTotalHits: true });

        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { loading, images, endTotalHits } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {loading && <Loader />}
        {images.length > 0 && !endTotalHits && !loading && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;
