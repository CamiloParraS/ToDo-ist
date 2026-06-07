export default function showConfirmDialog(message, onConfirm, onCancel) {
  let cleanedUp = false;
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";

  const dialog = document.createElement("div");
  dialog.className = "confirm-dialog";
  dialog.setAttribute("role", "alertdialog");
  dialog.setAttribute("aria-label", "Confirm deletion");

  const msg = document.createElement("p");
  msg.className = "confirm-message";
  msg.textContent = message;

  const btnRow = document.createElement("div");
  btnRow.className = "confirm-buttons";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "confirm-cancel-btn";
  cancelBtn.textContent = "Cancel";

  const confirmBtn = document.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.className = "confirm-delete-btn";
  confirmBtn.textContent = "Delete";

  btnRow.append(cancelBtn, confirmBtn);
  dialog.append(msg, btnRow);
  overlay.append(dialog);
  document.body.append(overlay);

  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    overlay.remove();
    document.removeEventListener("keydown", escHandler);
  };

  const escHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cleanup();
      onCancel?.();
    }
  };
  document.addEventListener("keydown", escHandler);

  cancelBtn.addEventListener("click", () => {
    cleanup();
    onCancel?.();
  });

  confirmBtn.addEventListener("click", () => {
    cleanup();
    onConfirm();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      cleanup();
      onCancel?.();
    }
  });

  confirmBtn.focus();
}
