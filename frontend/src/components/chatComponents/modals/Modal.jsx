import { useDispatch, useSelector } from 'react-redux';
import getModal from './index.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { FilterProvider } from '../../../utils/FilterProvider';

const Modal = () => {
  const { isOpen, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  const ModalComponent = getModal(type);

  return (
    <FilterProvider>
      {ModalComponent ? (
        <ModalComponent isOpen={isOpen} close={handleClose} />
      ) : null}
    </FilterProvider>
  );
};

export default Modal;
