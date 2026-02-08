import createTaskForm from "./taskForm";
import createProjectForm from "./projectModal";

const formManager = {
  activeForms: new Map(),

  showForm(formId, containerId, formCreator, onSubmit, onCancel = () => {}) {
    if (this.activeForms.has(formId)) return;

    const container = document.getElementById(containerId);
    const placement = containerId === "tasks-container" ? "prepend" : "append";

    const form = formCreator(
      (data) => {
        onSubmit(data);
        this.closeForm(formId);
      },
      () => {
        onCancel();
        this.closeForm(formId);
      },
    );
    this.activeForms.set(formId, { element: form, containerId, placement });

    placement === "prepend" ? container.prepend(form) : container.append(form);

    const input = form.querySelector("input, textarea");
    if (input) input.focus();
  },

  closeForm(formId) {
    const formObj = this.activeForms.get(formId);
    if (!formObj) return;

    formObj.element.remove();
    this.activeForms.delete(formId);
  },

  showTaskForm(onSubmit, onCancel) {
    this.showForm(
      "task-main",
      "tasks-container",
      createTaskForm,
      onSubmit,
      onCancel,
    );
  },

  showProjectForm(onSubmit, onCancel) {
    this.showForm(
      "project-new",
      "newProjectSection",
      createProjectForm,
      onSubmit,
      onCancel,
    );
  },
};

export default formManager;
