import Add from './Add';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const mapping = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

const getModal = (type) => mapping[type];

const getModalComponent = (type) => {
  if (!type) {
    return null;
  }

  const ModalComponent = getModal(type);
  return <ModalComponent />;
};

export default getModalComponent;
