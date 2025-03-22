import toast from "react-hot-toast";

// Custom toast UI for confirmation dialog
const ConfirmationToast = ({
  message,
  onConfirm,
  onCancel,
  t, // toast instance
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  t: { id: string };
}) => {
  return (
    <div className="max-w-md w-full bg-card border border-border shadow-lg rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium mb-3">{message}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                onConfirm();
                toast.dismiss(t.id);
              }}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                onCancel();
                toast.dismiss(t.id);
              }}
              className="inline-flex items-center px-3 py-1.5 border border-border text-xs font-medium rounded-md bg-card hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Show a confirmation dialog using toast
 * Returns a promise that resolves to true if confirmed, false if canceled
 */
export const confirmDialog = (
  message: string,
  options?: { position?: toast.ToastPosition }
): Promise<boolean> => {
  return new Promise((resolve) => {
    const toastId = toast(
      (t) => (
        <ConfirmationToast
          message={message}
          onConfirm={() => resolve(true)}
          onCancel={() => resolve(false)}
          t={t}
        />
      ),
      {
        duration: 50000, // Long duration to prevent auto-dismissal
        position: options?.position || "top-center",
        // Prevent duplicate toasts
        id: "confirm-dialog",
      }
    );
  });
};

/**
 * Show a delete confirmation dialog
 * Returns a promise that resolves to true if confirmed, false if canceled
 */
export const confirmDelete = (itemName: string = "item"): Promise<boolean> => {
  return confirmDialog(`Are you sure you want to delete this ${itemName}?`);
};
