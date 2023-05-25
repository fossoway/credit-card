import {el, setChildren} from 'redom';
import useMask from 'masked-text-field';


const cardCheckout = () => {
    const cardNumber = el('span', 'xxxx xxxx xxxx xxxx', {className: 'card__number'});
    const cardName = el('span', 'John Doe', {className: 'card__name'});
    const cardDate = el('span', '04/24', {className: 'card__date'});

    const cardPersonal = el('div', {className: 'card__personal'}, [cardName, cardDate]);
    const creditCard = el('div', {className: 'credit-card'}, [cardNumber, cardPersonal]);

    const holder = el('div', {className: 'form__input-wrap form__input-wrap_holder'}, [
        el('label', {
            className: 'form__label form__holder-label',
        }, 'Card Holder'),
        el('input', {
            type: 'text',
            className: 'input input__holder',
        })
    ]);

    const number = el('div', {className: 'form__input-wrap form__input-wrap_number'}, [
        el('label', {
            className: 'form__label form__number-label',
        }, 'Card Number'),
        el('input', {
            type: 'text',
            className: 'input input__number',
            'data-mask': '#### #### #### ####',
        })
    ]);

    const date = el('div', {className: 'form__input-wrap form__input-wrap_date'}, [
        el('label', {
            className: 'form__label form__date-label',
        }, 'Card Expiry'),
        el('input', {
            type: 'text',
            className: 'input input__date',
            'data-mask': '##/##'
        })
    ]);

    const cvv = el('div', {className: 'form__input-wrap form__input-wrap_cvv'}, [
        el('label', {
            className: 'form__label form__cvv-label',
        }, 'CVV'),
        el('input', {
            type: 'text',
            className: 'input input__cvv',
            'data-mask': '###'
        })
    ]);

    const button = el('button', {className: 'form__button'}, 'CHECK OUT');

    holder.addEventListener('input', e => {
        cardName.textContent = e.target.value;
    });

    number.addEventListener('input', ({target: element}) => {
        element.value = useMask(element.dataset.mask, element.value, element.dataset?.type)
        cardNumber.textContent = element.value;
    });

    date.addEventListener('input', ({target: element}) => {
        element.value = useMask(element.dataset.mask, element.value, element.dataset?.type)
        cardDate.textContent = element.value;
    });

    cvv.addEventListener('input', ({target: element}) => {
        element.value = useMask(element.dataset.mask, element.value, element.dataset?.type);
    });

    const form = el('form', {action: '#',
                            className: 'form', 
                            id: 'form',}, [holder, number, date, cvv, button]);

    const card = el('div', {className: 'card'}, [el('p', 'Secure Checkout', {className: 'secure'}), creditCard, form]);

    return el('div', {className: 'wrapper'}, card);
}

setChildren(document.body, cardCheckout());