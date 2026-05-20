/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored", 
};

export const ToastService = {
  success: (message: string) => {
    toast.success(message, defaultOptions);
  },
  error: (message: string) => {
    toast.error(message, defaultOptions);
  },
  info: (message: string) => {
    toast.info(message, defaultOptions);
  },
  warn: (message: string) => {
    toast.warn(message, defaultOptions);
  },
  loading: (message: string) => {
    return toast.loading(message, defaultOptions);
  },
  update: (id: any, message: string, type: 'success' | 'error') => {
    toast.update(id, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 3000,
      ...defaultOptions
    });
  }
};