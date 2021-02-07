const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка!' }));
};

const getUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Пользователь не найден!' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Нет пользователя с таким id! Некоректные данные!' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка!' });
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Пользователь не добавлен! Ошибка данных' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка!' });
    });
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(() => {
      throw new Error('404');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Пользователь не найден!' });
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Информация не обновлена! Ошибка данных!' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка!' });
    });
};

const patchAva = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(() => {
      throw new Error('404');
    })
    .then((ava) => res.status(200).send({ data: ava }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Пользователь не найден!' });
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Информация не обновлена! Ошибка данных!' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка!' });
    });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUser,
  patchAva,
};
