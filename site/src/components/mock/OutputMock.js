import validator from 'validator';

export const validateCreditCard = (item) => {
    const itemReplace = item.replaceAll(' ', '');
    const checkLength = itemReplace.length === 16;
    const checkNumber = /^[0-9]+$/.test(itemReplace);
    return checkLength && checkNumber
}

export const validateYandexMoney = (item) => {
    const checkLength = item.length === 12;
    const checkNumber = /^[0-9]+$/.test(item);
    return checkLength && checkNumber
}

export const validateWebmoney = (item) => {
    const item1 = item.slice(0, 1);
    const item2 = item.slice(1);
    const checkItem1 = /^[a-zA-Z]$/.test(item1);
    const checkItem2 = validateYandexMoney(item2); 
    return checkItem1 && checkItem2;
}

export const paymant = [
    { paymentSystem: 'Сбербанк',
      placeholder: '0000 0000 0000 0000',
      error: 'Некорректный номер карты',
      validate: function (value) {
        return validateCreditCard(value)
      }},
      { paymentSystem: 'Альфа-банк',
      placeholder: '0000 0000 0000 0000',
      error: 'Некорректный номер карты',
      validate: function (value) {
        return validateCreditCard(value)
      }},
      { paymentSystem: 'РОСБАНК',
      placeholder: '0000 0000 0000 0000',
      error: 'Некорректный номер карты',
      validate: function (value) {
        return validateCreditCard(value)
      }},
      { paymentSystem: 'Газпромбанк',
      placeholder: '0000 0000 0000 0000',
      error: 'Некорректный номер карты',
      validate: function (value) {
        return validateCreditCard(value)
      }},
      { paymentSystem: 'Тинькофф Банк',
      placeholder: '0000 0000 0000 0000',
      error: 'Некорректный номер карты',
      validate: function (value) {
        return validateCreditCard(value)
      }},
      { paymentSystem: 'МКБ',
      placeholder: '0000 0000 0000 0000',
      error: 'Некорректный номер карты',
      validate: function (value) {
        return validateCreditCard(value)
      }},
      { paymentSystem: 'Qiwi Wallet',
      placeholder: '+7',
      error: 'Некорректный номер телефона',
      validate: function (value) {
        return validator.isMobilePhone(value)
      }},
      { paymentSystem: 'YandexMoney',
      placeholder: '00000000000',
      error: 'Некорректный номер кошелька',
      validate: function (value) {
        return validateYandexMoney(value)
      }},
      { paymentSystem: 'Webmoney',
      placeholder: 'Z000000000000',
      error: 'Некорректный номер кошелька',
      validate: function (value) {
        return validateWebmoney(value)
      }},
      { paymentSystem: 'Monero (XMR)',
      placeholder: 'Введите номер кошелька',
      error: 'Некорректный номер кошелька',
      validate: function (value) {
        return true
      }},
      { paymentSystem: 'Bitcoin (BTC)',
      placeholder: 'Введите номер кошелька',
      error: 'Некорректный номер кошелька',
      validate: function (value) {
        return validator.isBtcAddress(value)
      }},
      { paymentSystem: 'Ethereum (ETH)',
      placeholder: 'Введите номер кошелька',
      error: 'Некорректный номер кошелька',
      validate: function (value) {
        return validator.isEthereumAddress(value)
      }},
];

export const dealStatusMock = ['Открыта', 'В обработке', 'Выполнена'];