# SPA книга контактов c JWT авторизацией

Этапы запуска приложения в терминале:
в корневой папке запустить команду:
`npm i`

открыть новое окно терминала, перейти в серверную часть:
`cd server`

запустить команду:
`npm i`

запустить команду:
`npm run dev`

открыть новое окно терминала, перейти в клиентскую часть:
`cd client`

запустить команду:
`npm i`

запустить команду:
`npm start`

Откроется окно в браузере с приложением. 
Если пользователь заходит в первый раз, то ему необходимо зарегистрироваться и подтвердить учетную запись на электронной почте. Если пользователь уже был авторизован в течении последних 30 дней, то авторизация будет пройдена автоматически.

Функционал адресной книги полностью реализован, есть возможность добавлять новый контакт, изменять существующий, или удалять. 
Все изменения сразу же фиксируются в базе данных mongodb.



