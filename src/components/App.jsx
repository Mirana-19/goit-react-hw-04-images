import { useEffect, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getImages } from 'api/gallery';
import { Searchbar, Button, Loader, Modal, ImageGallery } from 'components';
import 'react-toastify/dist/ReactToastify.css';
import { actionType } from 'reducer/actionTypes';
import { galleryReducer, initialState } from 'reducer/reducer';

export function App() {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  const { query, page, images, total, isLoading, largeImgUrl } = state;

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchData = () => {
      dispatch({ type: actionType.SET_LOADING });

      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            return toast.error('No images found');
          }

          dispatch({ type: actionType.GET_IMAGES, payload: hits });
          dispatch({ type: actionType.GET_TOTAL, payload: totalHits });
        })
        .catch(() => toast.error('Sorry, something went wrong!'))
        .finally(() => dispatch({ type: actionType.LOADING_END }));
    };

    fetchData();
  }, [page, query]);

  const onFormSubmit = query => {
    if (!query.trim()) {
      return toast.info('Please enter your query!');
    }
    dispatch({ type: actionType.SET_QUERY, payload: query });
  };

  const onLoadMore = () => {
    dispatch({ type: actionType.NEXT_PAGE });
  };

  const closeModal = str => {
    dispatch({ type: actionType.SET_IMG_URL, payload: str });
  };

  const hasMoreImages = images.length < total;

  return (
    <>
      <ToastContainer />
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery images={images} onImgClick={closeModal} />

      {hasMoreImages && <Button onClick={onLoadMore} />}
      {isLoading && <Loader />}
      {largeImgUrl && <Modal img={largeImgUrl} closeModal={closeModal} />}
    </>
  );
}
