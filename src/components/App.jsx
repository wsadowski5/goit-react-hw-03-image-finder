import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { getItems } from './PixabayAPI/PixabayAPI';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    pageNumber: 1,
    query: '',
    totalHits: null,
    perPage: 12,
    isModalOpen: false,
    modalImgURL: '',
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = event.target[1].value;
    const pageNumber = 1;
    this.setState({ images: [], query: inputValue, pageNumber: pageNumber });
    form.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.pageNumber !== this.state.pageNumber ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      try {
        const galleryItems = await getItems(
          this.state.query,
          this.state.pageNumber,
          this.state.perPage
        );

        this.setState(({ images }) => ({
          images: [...images, ...galleryItems.hits],
          totalHits: galleryItems.totalHits,
        }));
      } catch (error) {
        console.error('ERROR:', error);
        alert(error);
        throw error;
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  handleOpenModal = imgURL => {
    this.setState({ isModalOpen: true, modalImgURL: imgURL });

    document.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        this.handleCloseModal();
      }
    });
  };

  handleCloseModal = e => {
    this.setState({ isModalOpen: false });
    document.removeEventListener('keyup', event => {});
  };

  render() {
    return (
      <div>
        <Searchbar handleSearch={this.handleSubmitForm} />

        <ImageGallery data={this.state.images} onClick={this.handleOpenModal} />

        {this.state.isLoading ? <Loader /> : null}

        {this.state.totalHits > this.state.perPage && (
          <Button onClick={this.loadMore} />
        )}
        {this.state.isModalOpen && (
          <Modal
            handleClose={this.handleCloseModal}
            modalImage={this.state.modalImgURL}
          />
        )}
      </div>
    );
  }
}
