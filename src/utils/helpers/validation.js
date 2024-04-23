export const isValidField = field =>
  field !== undefined &&
  field !== null &&
  field !== '' &&
  field?.toString()?.trim()?.length > 0

export const isValidEmail = email => {
  const regEx = /\S+@\S+\.\S+/
  return regEx.test(email)
}
