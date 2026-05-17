const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen',
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy',
  'Eighty', 'Ninety',
];

function convertHundreds(num) {
  if (num === 0) return '';
  let result = '';
  if (num >= 100) {
    result += ONES[Math.floor(num / 100)] + ' Hundred';
    num %= 100;
    if (num > 0) result += ' and ';
  }
  if (num >= 20) {
    result += TENS[Math.floor(num / 10)];
    if (num % 10 > 0) result += ' ' + ONES[num % 10];
  } else if (num > 0) {
    result += ONES[num];
  }
  return result;
}

export function numberToWords(num) {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToWords(-num);

  const n = Math.floor(num);
  let result = '';

  if (n >= 10000000) {
    result += convertHundreds(Math.floor(n / 10000000)) + ' Crore';
    const remainder = n % 10000000;
    if (remainder > 0) result += ' ';
    return result + (remainder > 0 ? numberToWords(remainder) : '');
  }

  if (n >= 100000) {
    result += convertHundreds(Math.floor(n / 100000)) + ' Lakh';
    const remainder = n % 100000;
    if (remainder > 0) result += ' ';
    return result + (remainder > 0 ? numberToWords(remainder) : '');
  }

  if (n >= 1000) {
    result += convertHundreds(Math.floor(n / 1000)) + ' Thousand';
    const remainder = n % 1000;
    if (remainder > 0) result += ' ';
    return result + (remainder > 0 ? numberToWords(remainder) : '');
  }

  return convertHundreds(n);
}

export function formatRupeesInWords(amount) {
  if (!amount || isNaN(amount) || amount === 0) return '';
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let result = 'Rupees ' + numberToWords(rupees);
  if (paise > 0) {
    result += ' and ' + numberToWords(paise) + ' Paise';
  }
  result += ' Only';
  return result;
}
