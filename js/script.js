document.addEventListener('DOMContentLoaded', () => {
    const formEl = document.querySelector('.form');
    const nameEl = formEl.querySelector('[name="name"]');
    const phoneEl = formEl.querySelector('[name="phone"]');
    const emailEl = formEl.querySelector('[name="email"]');
    const modalEl = document.querySelector('.modal');
    const messageEl = document.querySelector('.response');
    //const resultEl = document.querySelector('#result');
    const requestURL = 'https://60376bfd5435040017722533.mockapi.io/form';
    const requestErrorUrl = 'https://60376bfd5435040017722533.mockapi.io/formRej';
    modalEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            modalEl.classList.remove('modal--active');
        }
    })

    function sendForm(fio, phone, email) {
        const formData = `name=${encodeURIComponent(fio)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', requestURL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(formData);
        xhr.onload = () => {
            const response = xhr.response;
            if (xhr.status !== 201) {
                messageEl.textContent = 'Ошибка ' + response;
            }
            else {
                messageEl.textContent = 'Ваш вопрос успешно добавлен';
            }
            modalEl.classList.add('modal--active');
        }


    }

    // при отправке формы
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const fio = nameEl.value;
        const phone = phoneEl.value;
        const email = emailEl.value;
        const regFio = /^[а-яА-ЯёЁ-—\s]/;
        const regPhone = /^[0-9-+\s]/;
        const regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let err = false;
        messageEl.innerHTML = "";
        let message = "";
        if (fio.match(regFio) == null) {
            message += '<li>ФИО может содержать только русские буквы, пробелы, тире. Цифры, англ. буквы – нельзя.</li>';
            err = true;
        }
        if (phone.match(regPhone) == null) {
            message += '<li>телефон может содержать только цифры, “-”, пробелы, “+”.</li>';
            err = true;

        }
        if (email.match(regEmail) == null) {
            message += '<li>неправильный формат e-mail</li>';
            err = true;

        }
        if (err) {
            messageEl.innerHTML = '<p class="response__title">Исправьте следующие ошибки:</b><ul>' + message + '</ul>';
            modalEl.classList.add('modal--active');
            return;
        }

        sendForm(fio, phone, email);




    });
})
