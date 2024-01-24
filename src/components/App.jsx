import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar, Button, Loader, Modal, ImageGallery } from 'components';
import { galleryReducer, initialState } from 'reducer/reducer';
import { getImages } from 'api/gallery';
import {
  closeModal,
  getImg,
  getTotal,
  loadingEnd,
  nextPage,
  setLoading,
  setQuery,
} from 'reducer/actions';

export function App() {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const { query, page, images, total, isLoading, largeImgUrl } = state;

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchData = () => {
      dispatch(setLoading());

      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            return toast.error('No images found');
          }

          dispatch(getImg(hits));
          dispatch(getTotal(totalHits));
        })
        .catch(() => toast.error('Sorry, something went wrong!'))
        .finally(() => dispatch(loadingEnd()));
    };

    fetchData();
  }, [page, query]);

  const onFormSubmit = newQuery => {
    if (!newQuery.trim()) {
      return toast.info('Please enter your query!');
    }

    if (query.toLowerCase() === newQuery.toLowerCase()) {
      return toast.warning('The request matches the previous one.');
    }

    dispatch(setQuery(newQuery));
  };

  const onLoadMore = () => {
    dispatch(nextPage());
  };

  const onCloseModal = str => {
    dispatch(closeModal(str));
  };

  const hasMoreImages = images.length < total;

  return (
    <>
      <ToastContainer />
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery images={images} onImgClick={onCloseModal} />

      {hasMoreImages ? <Button onClick={onLoadMore} /> : null}
      {isLoading && <Loader />}
      {largeImgUrl && <Modal img={largeImgUrl} closeModal={onCloseModal} />}
    </>
  );
}
