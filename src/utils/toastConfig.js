import { createToastInterface, POSITION } from 'vue-toastification';

const options = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const toast = createToastInterface(options);
