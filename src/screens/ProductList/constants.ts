import { toast } from 'react-toastify';
import { MESSAGES } from 'constants/notify';

export const notifications = {
  productDeleted: () => toast.success(MESSAGES.success.productDeleted),
  productNotDeleted: () => toast.error(MESSAGES.error.productNotDeleted),
};
