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
    pageNumber: null,
    query: '',
    totalHits: null,
    perPage: null,
    isModalOpen: false,
    modalImgURL: '',
  };

  fetchData = async (query, pageNumber, perPage) => {
    try {
      this.setState({ isLoading: true });
      const galleryItems = await getItems(query, pageNumber, perPage);
      this.setState({
        images: galleryItems.hits,
        perPage: perPage,
        pageNumber: pageNumber,
        query: query,
        totalHits: galleryItems.totalHits,
      });
    } catch (error) {
      console.error('ERROR:', error);
      alert(error);
      throw error;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = async () => {
    const moreItems = await getItems(
      this.state.query,
      this.state.pageNumber + 1,
      this.state.perPage
    );
    this.setState({
      images: [...this.state.images, ...moreItems.hits],
      pageNumber: this.state.pageNumber + 1,
    });
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
        <Searchbar handleSearch={this.fetchData} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            data={this.state.images}
            onClick={this.handleOpenModal}
          />
        )}
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
