/**
 * Utility functions for currency, numbers, and WhatsApp communication
 */

export const NGN_TO_USD_RATE = 1500; // Reference exchange rate for diaspora investors

/**
 * Format a number into standard Nigerian Naira string: ₦150,000,000
 */
export function formatNaira(amount: number, showDecimals = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₦0';
  }
  const formatted = new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);

  return `₦${formatted}`;
}

/**
 * Compact Naira format for quick badges and summary filters: e.g. ₦45M, ₦2.5M
 */
export function formatCompactNaira(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `₦${(amount / 1_000_000_000).toFixed(amount % 1_000_000_000 === 0 ? 0 : 1)}B`;
  }
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}k`;
  }
  return `₦${amount}`;
}

/**
 * Estimated USD equivalent for Nigerians in the diaspora
 */
export function formatEstimatedUSD(nairaAmount: number): string {
  const usd = Math.round(nairaAmount / NGN_TO_USD_RATE);
  return `~$${new Intl.NumberFormat('en-US').format(usd)} USD`;
}

/**
 * Generate official PrimeKey Realty WhatsApp enquiry URL with pre-filled message
 */
export const OFFICIAL_PHONE = '+2348039004567';
export const OFFICIAL_DISPLAY_PHONE = '+234 (0) 803 900 4567';
export const OFFICIAL_EMAIL = 'enquiries@primekeyrealty.ng';
export const OFFICIAL_OFFICE_LAGOS = 'Plot 14 Admiralty Way, Lekki Phase 1, Lagos';
export const OFFICIAL_OFFICE_ABUJA = '3rd Floor, Maitama Gateway Mall, Maitama, Abuja';

export function getWhatsAppUrl(propertyTitle?: string, propertyId?: string, price?: number): string {
  let message = `Hello PrimeKey Realty, I am interested in consulting about your Nigerian property portfolio.`;
  
  if (propertyTitle) {
    message = `Hello PrimeKey Realty, I am interested in enquiring about:\n*${propertyTitle}*`;
    if (propertyId) {
      message += ` (Ref: PK-${propertyId.toUpperCase()})`;
    }
    if (price) {
      message += `\nAsking Price: ${formatNaira(price)}`;
    }
    message += `\n\nPlease let me know the current availability, title documents, and schedule a physical or virtual inspection. Thank you.`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/2348039004567?text=${encoded}`;
}

export function getInspectionWhatsAppUrl(
  propertyTitle: string,
  preferredDate: string,
  inspectionType: string,
  clientName: string
): string {
  const message = `Hello PrimeKey Realty,\nI would like to book an inspection:\n*Property:* ${propertyTitle}\n*Client Name:* ${clientName}\n*Preferred Date:* ${preferredDate}\n*Inspection Mode:* ${inspectionType}\n\nPlease confirm availability of your agent.`;
  return `https://wa.me/2348039004567?text=${encodeURIComponent(message)}`;
}
