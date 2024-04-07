
// Mobile nav button
const navBtn = document.querySelector('.mobile-nav-btn');
const nav = document.querySelector('.mobile-nav');
const menuIcon = document.querySelector('.nav-icon');
const fade = document.querySelector('.mobile-nav-fade');

navBtn.onclick = function () {
	nav.classList.toggle('mobile-nav--open');
	fade.classList.toggle('mobile-nav-fade--open');
	menuIcon.classList.toggle('nav-icon--active');
	document.body.classList.toggle('no-scroll');
};

fade.onclick = function () {
	nav.classList.toggle('mobile-nav--open');
	fade.classList.toggle('mobile-nav-fade--open');
	menuIcon.classList.toggle('nav-icon--active');
	document.body.classList.toggle('no-scroll');
};




// select style lib
customSelect('select');

// calendar lib
const DateTime = easepick.DateTime;
const dates = [
  '2024-04-02',
  '2024-04-18',
  '2024-04-19',
  '2024-04-20',
  '2024-04-25',
  '2024-04-28',
].map(d => {
  if (d instanceof Array) {
    const start = new DateTime(d[0], 'DD.MM.YYYY');
    const end = new DateTime(d[1], 'DD.MM.YYYY');

    return [start, end];
  }

  return new DateTime(d, 'YYYY-MM-DD');
});
const picker = new easepick.create({
  element: document.getElementById('date'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
    'https://easepick.com/css/demo_hotelcal.css',
    'https://easepick.com/css/demo_prices.css',
  ],
  lang: "ru-Ru",
  format: "DD.MM.YYYY",
  plugins: ['RangePlugin', 'LockPlugin'],
  RangePlugin: {
    tooltipNumber(num) {
      return num - 1;
    },
    locale: {
      one: 'night',
      other: 'nights',
    },
  },
  LockPlugin: {
    minDate: new Date(),
    minDays: 1,
    inseparable: true,
    filter(date, picked) {
      if (picked.length === 1) {
        const incl = date.isBefore(picked[0]) ? '[)' : '(]';
        return !picked[0].isSame(date, 'day') && date.inArray(dates, incl);
      }

      return date.inArray(dates, '[)');
    },
  },
  setup(picker) {
    // generate random prices
    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const prices = {};
    dates.forEach(x => {
      prices[x] = randomInt(50, 200);
    });

    // add price to day element
    picker.on('view', (evt) => {
      const { view, date, target } = evt.detail;
      const d = date ? date.format('DD.MM.YYYY') : null;

      if (view === 'CalendarDay' && prices[d]) {
        const span = target.querySelector('.day-price') || document.createElement('span');
        span.className = 'day-price';
        span.innerHTML = `$ ${prices[d]}`;
        target.append(span);
      }
    });
  }
});

// footer input validation
const inputSubscribe = document.querySelector('.subscribe__input');
const label = document.querySelector('.subscribe__label');


inputSubscribe.addEventListener('input', () => {
  if (inputSubscribe.value.trim() !== '') {
    label.classList.add('subscribe__label--top')
  } else {
    label.classList.remove('subscribe__label--top')
  }
});

