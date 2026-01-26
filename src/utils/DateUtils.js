import { format, parse, isValid, parseISO, isSameDay } from "date-fns";

export function parseTodoDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }

  if (typeof value === "string") {
    let parsed = parseISO(value);
    if (isValid(parsed)) return parsed;

    const formats = ["h:mm a", "dd/MM/yyyy", "dd/MM/yyyy h:mm a"];

    for (let fmt of formats) {
      parsed = parse(value, fmt, new Date());
      if (isValid(parsed)) return parsed;
    }
  }

  return null;
}

export function formatTodoDate(date) {
  if (!date || !isValid(date)) return "";

  const now = new Date();

  if (isSameDay(date, now)) {
    return format(date, "h:mm a");
  } else {
    return format(date, "dd/MM/yyyy h:mm a");
  }
}

export function formatDate(date) {
  return format(date, "MM/dd/yyyy");
}

export function formatDateWithTime(date) {
  return format(date, "MM/dd/yyyy HH:mm");
}
