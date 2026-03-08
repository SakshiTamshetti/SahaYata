export const getWhatsAppLink = (phone: string, message: string) => {
  const cleanNumber = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  // Using api.whatsapp.com for better compatibility across devices
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
};
