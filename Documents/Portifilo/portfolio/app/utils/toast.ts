import toast, { Toast } from "react-hot-toast";

export type ToastType = "success" | "error" | "loading" | "custom";

interface ToastOptions {
  duration?: number;
  position?: Toast["position"];
  icon?: string | JSX.Element;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

/**
 * Show a success toast notification
 */
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  return toast.success(message, options);
};

/**
 * Show an error toast notification
 */
export const showErrorToast = (message: string, options?: ToastOptions) => {
  return toast.error(message, options);
};

/**
 * Show a loading toast notification that can be updated later
 */
export const showLoadingToast = (message: string, options?: ToastOptions) => {
  return toast.loading(message, options);
};

/**
 * Show a custom toast notification
 */
export const showCustomToast = (message: string, options?: ToastOptions) => {
  return toast(message, options);
};

/**
 * Dismiss all or specific toast notifications
 */
export const dismissToast = (toastId?: string) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};

/**
 * Update an existing toast notification
 */
export const updateToast = (
  toastId: string,
  message: string,
  type: ToastType,
  options?: ToastOptions
) => {
  switch (type) {
    case "success":
      return toast.success(message, { ...options, id: toastId });
    case "error":
      return toast.error(message, { ...options, id: toastId });
    case "loading":
      return toast.loading(message, { ...options, id: toastId });
    default:
      return toast(message, { ...options, id: toastId });
  }
};

type PromiseToastOptions = {
  loading: string;
  success: string;
  error: string;
};

/**
 * Promise toast handler - shows loading, then success/error based on promise resolution
 */
export const promiseToast = <T>(
  promise: Promise<T>,
  options: PromiseToastOptions
): Promise<T> => {
  return toast.promise(promise, options);
};
