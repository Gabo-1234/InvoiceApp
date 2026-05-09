export const isRequired = value => value !== undefined && value !== null && String(value).trim() !== '';
export const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
export const isPositiveNumber = value => {
  const number = typeof value === 'number' ? value : Number(value);
  return !Number.isNaN(number) && number > 0;
};

export const MaxDate = new Date().toISOString().split('T')[0];

export function validateInvoiceForm(values = {}) {
  const errors = {};

  if (!isRequired(values.invoiceNumber)) {
    errors.invoiceNumber = 'Invoice number is required';
  }

  if (!isRequired(values.customerName)) {
    errors.customerName = 'Customer name is required';
  }

  if (!isRequired(values.customerEmail)) {
    errors.customerEmail = 'Customer email is required';
  } else if (!isEmail(values.customerEmail)) {
    errors.customerEmail = 'Customer email is invalid';
  }

  if (!isRequired(values.dueDate)) {
    errors.dueDate = 'Due date is required';
  }

  if (!Array.isArray(values.items) || values.items.length === 0) {
    errors.items = 'At least one invoice item is required';
  } else {
    const itemErrors = values.items.map(item => {
      const itemError = {};

      if (!isRequired(item.description)) {
        itemError.description = 'Description is required';
      }

      if (!isRequired(item.quantity)) {
        itemError.quantity = 'Quantity is required';
      } else if (!isPositiveNumber(item.quantity)) {
        itemError.quantity = 'Quantity must be a positive number';
      }

      if (!isRequired(item.unitPrice)) {
        itemError.unitPrice = 'Unit price is required';
      } else if (!isPositiveNumber(item.unitPrice)) {
        itemError.unitPrice = 'Unit price must be a positive number';
      }

      return itemError;
    });

    if (itemErrors.some(itemError => Object.keys(itemError).length > 0)) {
      errors.items = itemErrors;
    }
  }

  return errors;
}

export function validateCustomerInfo(values = {}) {
  const errors = {};

  if (!isRequired(values.name)) {
    errors.name = 'Customer name is required';
  }

  if (!isRequired(values.email)) {
    errors.email = 'Customer email is required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Customer email is invalid';
  }

  if (!isRequired(values.address)) {
    errors.address = 'Customer address is required';
  }

  return errors;
}

export function hasFormErrors(errors = {}) {
  if (Array.isArray(errors)) {
    return errors.some(error => hasFormErrors(error));
  }
  return Object.keys(errors).length > 0;
}


