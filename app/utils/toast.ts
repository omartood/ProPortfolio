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

interface ToastMessages {
  loading: string;
  success: string;
  error: string | ((error: unknown) => string);
}

export async function promiseToast<T>(
  promise: Promise<T>,
  messages: ToastMessages,
  options?: ToastOptions
): Promise<T> {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    {
      duration: options?.duration,
    }
  );
}
