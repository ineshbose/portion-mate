<!-- PROJECT LOGO -->
<br />
<div align="center">
<p align="center">
  <img alt="Portion Mate logo" src="https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png" height="250px">

  <h3 align="center">Portion Mate</h3>
  <h5 align="center">Source Code Manual</h5>

  <p align="center">
    <!-- BADGES / SHIELDS -->
  </p>
</p>
</div>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* **`git`** *(optional)*: To have a copy of this code, you can clone it using [Git](https://git-scm.com/), however you can also [download a ZIP](https://github.com/ineshbose/portion-mate/archive/develop.zip) of the repository.
```sh
$ git clone https://github.com/ineshbose/portion-mate
$ cd portion-mate/src   # treat src as root
```

* **`poetry` / `pip`**: The backend uses Django, and therefore dependencies can be installed using either [`pip`](https://packaging.python.org/tutorials/installing-packages/) or [`poetry`](https://python-poetry.org/docs/basic-usage/#installing-dependencies) (preferred).
```sh
$ python3 -m venv env               # optional
$ source ./env/scripts/activate     # activate environment
$ poetry install
$ pip install .                     # if you don't use poetry
```

* **`yarn` / `npm`**: The frontend uses React Native, and therefore dependencies can be handled using either [`npm`](https://www.npmjs.com/) or [`yarn`](https://yarnpkg.com/) (preferred).
```sh
$ yarn install
$ npm install    # if you don't use yarn
```

### Running

This will require you to run backend and frontend separately using two terminals.

* Backend
```sh
$ python manage.py
```

* Frontend
```sh
$ yarn start
$ npm start      # if you don't use yarn
```
