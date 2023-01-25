export const translateErrors = (error: any): string => {
  if (!error) {
    return '';
  }

  const errorKeys = Object.keys(error);
  const foundError = Object.keys(validationErrorTranslations).find((key) =>
    errorKeys.includes(key)
  );

  if (foundError) {
    return validationErrorTranslations[foundError];
  }

  return '';
};

const validationErrorTranslations: Record<string, string> = {
  required: 'Required field',
};
