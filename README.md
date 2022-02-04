<!-- PROJECT LOGO -->
<br />
<div align="center">
<p align="center">
  <img alt="Portion Mate logo" src="https://portion-mate-glasgow.readthedocs.io/en/latest/assets/logo.png" height="250px">

  <h3 align="center">Portion Mate</h3>

  <!-- BADGES / SHIELDS -->

  <p align="center">
    <a href="https://app.codacy.com/gh/ineshbose/portion-mate/dashboard" target="_blank"><img alt="Codacy grade" src="https://img.shields.io/codacy/grade/57b01d85bcfa4d8bb96978e1edb2edff?style=flat-square&logo=codacy&logoColor=white"></a>
    <a href="https://codeclimate.com/github/ineshbose/portion-mate" target="_blank"><img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/ineshbose/portion-mate?style=flat-square&logo=codeclimate&logoColor=white"></a>
    <a href="https://portion-mate-glasgow.readthedocs.io/" target="_blank"><img alt="Read the Docs" src="https://img.shields.io/readthedocs/portion-mate-glasgow?style=flat-square&logo=readthedocs&logoColor=white"></a>
    <a href="https://libraries.io/github/ineshbose/portion-mate/" target="_blank"><img alt="Libraries.io dependency status" src="https://img.shields.io/librariesio/github/ineshbose/portion-mate?style=flat-square&logo=libraries.io&logoColor=white"></a>
  </p>

  <!-- <p align="center">
  <a href="https://github.com/psf/black" target="_blank"><img alt="Code style black" src="https://img.shields.io/badge/-black%20formatter-000000.svg?style=flat-square&logo=python&logoColor=white&labelColor=000000"></a>
  <a href="https://github.com/microsoft/typescript" target="_blank"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white"></a>
  <a href="https://github.com/eslint/eslint" target="_blank"><img alt="ESLint" src="https://img.shields.io/badge/eslint-3A33D1?style=flat-square&logo=eslint&logoColor=white"></a>
  <a href="https://github.com/prettier/prettier" target="_blank"><img alt="Code style prettier" src="https://img.shields.io/badge/prettier-1A2C34?style=flat-square&logo=prettier&logoColor=F7BA3E"></a>
  <a href="https://github.com/airbnb/javascript" target="_blank"><img alt="Airbnb style guide" src="https://img.shields.io/static/v1?style=flat-square&message=Airbnb&color=FF5A5F&logo=Airbnb&logoColor=FFFFFF&label="></a>
  <a href="https://github.com/facebook/react-native" target="_blank"><img alt="React native" src="https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB
"></a>
  <a href="https://github.com/django/django" target="_blank"><img alt="Django" src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=green
"></a>
  <a href="https://github.com/expo/expo" target="_blank"><img alt="Expo" src="https://img.shields.io/badge/Expo-1B1F23?style=flat-square&logo=expo&logoColor=white
"></a>
  <a href="https://github.com/eva-design/eva" target="_blank"><img alt="Eva Design System" src="https://img.shields.io/badge/Eva%20Design%20System-36f?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACrFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8YHwjLAAAA43RSTlMAAAECAwQFBgcICQoLDA0ODxAREhQVFhcZGhscHR4fICEiIyQoKSorLC4vMDEzNDU2Nzg5Ojs8PT9AQUJDREVGR0hJSktMTU5PUFFSU1VWV1haW1xdXl9gYWJjZGVnaGlqa2xtb3BxcnN0dXZ3eHl6e3x9fn+AgYWGh4iKi4yNjo+QkZKTlJWWl5mbnJ2en6Gio6SlpqeoqaqrrK2usbKztba3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&logoColor=white"></a>
  <a href="https://github.com/python-poetry/poetry" target="_blank"><img alt="Poetry" src="https://img.shields.io/badge/Poetry-1f293c?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHNJREFUWMOtlt1rHFUYxn/ve85ks7vZZCvolZUY0QuvAqLUFi9KsRZRpDdCTUGKV176H7R/QLXxRgRFi6hUexEQvCtZQamorVuLad2UZkvbzTZJm6VWmmabOV7M7O7M7GQ/xAOHOWfPzHmf93nejxUiY88nC25p1zPUfAHnwA+nc+D7nb0f7l1i7yff89PPDz0pLZsaBfDTH2u88FuFx9kKLncOCJ/hMhiu83BEDyIj8o1LO08BgMBceY1d5SvsFD9yQfTSFDBRQ2nfEDsv9QSACqfPrfBieZGd6nckiBlOMEOShe097ssAAniWb35fY/fFKzxhIlq3JUnQ3waXAJq2hnIPABJOIONx6twq+y4vsScbuTzGSIrheHCkMXKhPwMSLnIZPvu5ztN/Vtmdk26P0mKiy+skSNcnBtpAwhsLWT4/W+OpS9fYlY2kZ9IIPejvMFBlZqo6AAN0pBBgPMcXZ28wVbnO87mkHOH9PunSxLNkrncQxlhwHQAqMD7GV2dvMrl4k33jmjC2zYTk/mT/LGg/JU6LUZjI8+0vNQqXb/DGDpMSlEntY/FRYmaq3IeBMAuIyhCRwirkR5k7X6e5cJMDSRB+LyDu2AB1wHWob5MQkQKBjAejHt9fuEXzUo29EyZuyHcpMeJKzEyVBitEpBhvRXErM7IZyHicWVilWVlm97hJNK5k+vHeYJUwmglEmIgia52PemAMP1Zu01ys81LR4glpwXiMw93a92HAJQy6uEytqpnLgAq/Lq3TqNR5rmCwrcgPWCgzM3V08F7QxUKP39pMBCAuXr/LncVbPJtTTACigePgcM2oKwVTOluy0RmBEQ8EKvV7NK6uMpmRBo69HI5XvbRhtz2RNFkkzkTraTS4amuL69duUzhzvjq2sVm9N3Q73jYlXLckyVetQe5vkq1UcVtu2k5MzBcPfV38DwAizV5ajkuC+oQOvsPUb5P/awnP87BjecTqtBidf+Tt08UhALjupdCdAdGfNjbJXK2Rv7aMl89h8jnEGsQYxJppUZ1/9J254pBp2DKWSEcXAdd8iHdjhbGFq2Tv3sOOF9ARD7UG9TzUM6i1qDXTYnX+sXe/Kw4XhABOurXfbOKtrpNZuYMRQUcziGcRVUQEUQWVMJmCXiLCpINJEn/HUgC4uHF1QZ9/2MSu38U2/sb+cx9jTMwwRlBVRALjaAgkwFBGOHLrw1fLfRmQtfWGOIo83ELvb6BbPvpgE7PxAB3xkJERNJcNNdbA69Y0Le8V0VYXlRK4g/UTBxoD1QHvwuW96o3Mi2eL4lnU2MDLQiEw2J4GUYmDCNeB9wIix5bf33+0Xxp2ZXfulY+nxei8GC2KMQmDJgEi9DwCBJWqiBypHX+5NEAdSi8vY699GoIwxZjnahAbGFJjwEgUSENEZmsDeN0XAEDh4Mk2E5r0PM5CQ4zMgpxY/mB/gyFHrwLLxJtfTouGctjA6wiAsqjOojJXnz0wtOGBAADseOtUiwnEaEmM/iBG51Y+er3K/zD+BYzRWKPnTc4MAAAAAElFTkSuQmCC&logoColor=white"></a>
  <a href="https://github.com/yarnpkg/yarn" target="_blank"><img alt="Yarn" src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white"></a>
  </p> -->
</p>
</div>



<!-- TABLE OF CONTENTS -->
<!-- NOT ADDED -->



<!-- ABOUT THE PROJECT -->
## About The Project

Portion Mate is an application that helps keep track of your food intake. More information to follow.

### Built With
* [Django](https://www.djangoproject.com/)
* [React Native](https://reactnative.dev/)
* [Django REST Framework](https://www.django-rest-framework.org/)

_For more information, please refer to the [Wiki](https://github.com/ineshbose/portion-mate/wiki)._



<!-- GETTING STARTED -->
<!-- NOT ADDED -->



<!-- CONTACT -->
## Contact

Inesh Bose - 2504266b@student.gla.ac.uk / Inesh.Bose@glasgow.ac.uk

Project Link: [https://github.com/ineshbose/portion-mate/](https://github.com/ineshbose/portion-mate/)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

The project has been proposed for Level 4 [Individual Project (H)](https://www.gla.ac.uk/coursecatalogue/course/?code=COMPSCI4025P) by [Dr. Oana Andrei](http://www.dcs.gla.ac.uk/~oandrei/).


<div align="right">
<p align="right">
  <a href="#">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/ineshbose/portion-mate?style=flat-square">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ineshbose/portion-mate?style=flat-square">
  </a>
</p>
</div>
