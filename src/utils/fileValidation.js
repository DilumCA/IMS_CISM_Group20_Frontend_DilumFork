const ALLOWED_FILE_TYPES = {
  cv: {
    extensions: ['.pdf', '.doc', '.docx'],
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  },
  image: {
    extensions: ['.jpg', '.jpeg', '.png'],
    mimeTypes: ['image/jpeg', 'image/png']
  }
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB

export const validateFile = (file, type) => {
  const errors = [];

  if (!file) {
    errors.push('No file selected.');
    return { isValid: false, errors };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size must be under 10MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const fileExtension = '.' + fileName.split('.').pop();
  const allowedConfig = ALLOWED_FILE_TYPES[type];

  if (!allowedConfig.extensions.includes(fileExtension)) {
    errors.push(`Invalid extension. Allowed: ${allowedConfig.extensions.join(', ')}`);
  }

  // Check MIME type
  if (!allowedConfig.mimeTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed: ${allowedConfig.mimeTypes.join(', ')}`);
  }

  return { isValid: errors.length === 0, errors };
};

export { ALLOWED_FILE_TYPES, MAX_FILE_SIZE };