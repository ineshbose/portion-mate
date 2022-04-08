<!-- PROJECT LOGO -->
<br />
<div align="center">
<p align="center">
  <img alt="Portion Mate logo" src="https://portion-mate.readthedocs.io/en/latest/assets/logo.svg" height="250px">

  <h3 align="center">Portion Mate</h3>
  <h5 align="center">Dissertation</h5>

  <p align="center">
    <a href="https://github.com/ineshbose/portion-mate/actions/workflows/build-dissertation.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/ineshbose/portion-mate/Compile%20Dissertation?logo=github-actions&logoColor=white&style=flat-square"></a>
    <a href="https://www.latex-project.org/" target="_blank"><img alt="LaTeX" src="https://img.shields.io/badge/language-LaTeX-008080?logo=latex&logoColor=white&style=flat-square"></a>
    <a href="https://overleaf.com/" target="_blank"><img alt="Overleaf" src="https://img.shields.io/badge/editor-Overleaf-47A141?logo=overleaf&logoColor=white&style=flat-square"></a>
    <a href="https://zotero.org/" target="_blank"><img alt="Zotero" src="https://img.shields.io/badge/referencing-Zotero-CC2936?logo=zotero&logoColor=white&style=flat-square"></a>
  </p>
</p>
</div>

## _Abstract_

> The Eatwell Guide is a recommendation given by Public Health England on having a balanced diet. Following and maintaining a diet may be difficult for people, and logging can help them keep track of their plan. However, the task of logging itself can also require a lot of commitment which can cause people inconvenience and make them give it up.
>
> This project aims to develop an application that solves these problems of maintaining a diet plan; this was achieved through months of research and development into users, food and logging, in order to create a fully-integrated and convenient system that does not add a burden onto users, but rather motivates them to adhere to their plan. Considering the time-frame, this project also leaves development open-ended with scope for future work that can be passed over to or taken over by developers who can make use of the open-source side projects created and best practices followed by the system without great difficulty.
>
> To confirm the usability of the application, evaluation was carried out through a survey where participants could share their thoughts with the help of System Usability Scale that also in-turn helps in analysing the results to a score that deemed the system as acceptable.

## About This Document

This document follows the [provided template (`/dissertation @ 89738d2`)](https://github.com/ineshbose/portion-mate/tree/89738d2aa8959f847b1b542e6dc466de8165126b/dissertation) that can be found on [Overleaf](https://www.overleaf.com/latex/templates/university-of-glasgow-level-4-computing-science-project-template/spqpnkvzjdbw) and [GitHub](https://github.com/johnhw/l4template). It provides a class module file [`l4proj.cls`](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls) with attribution to the authors and modifiers.

```tex
\ProvidesClass{l4proj}[%
 2009/01/09 Colin Perkins <csp@dcs.gla.ac.uk>.%
 2009/09/16 Modified by Tim Storer <tws@dcs.gla.ac.uk> to support non pdf modes.%
 2011/02/15 Modified by Gregg Hamilton <hamiltgr@dcs.gla.ac.uk> for use in final year projects.%
 2012/10/18 Modified by Patrick Prosser, use geometry to control margins, simplified.%
 2018/09/14 Modified by John Williamson, improve typographic appearance%
]
```

However, this class has been extended with features such as supporting syntax highlighting for [JavaScript](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls#L603), [TypeScript](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls#L661), [YAML](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls#L648), and [TOML](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls#L669) using [`listings`](https://ctan.org/pkg/listings) (not [`minted`](https://ctan.org/pkg/minted)), and autogenerating labels for [headings](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls#L511) and [figures](https://github.com/ineshbose/portion-mate/blob/develop/dissertation/l4proj.cls#L274).

Majority of writing and working with [LaTeX](https://www.latex-project.org/) was with [Overleaf](https://overleaf.com/), and required a separate repository since branching and symlinks are not supported as of yet (changes are still synchronised here). The chapters have been divided into separate files (using [`subfiles`](https://ctan.org/pkg/subfiles)) in [`chapters/`](https://github.com/ineshbose/portion-mate/tree/develop/dissertation/chapters), and compilation is through [**`pdflatex`**](https://www.tug.org/applications/pdftex/) that requires `--shell-escape` and [`inkscape`](https://inkscape.org/) enabled for [`svg`](https://ctan.org/pkg/svg) support. Referencing was managed using [Zotero](https://zotero.org/) and their [API](https://api.zotero.org/), split into separate files. These are added using [`biblatex`](https://ctan.org/pkg/biblatex) with the default `numeric` style.

```tex
%=============================================================================
% CHAPTER NAME
% description about chapter

% ## Guidance

% -   Some guidance about the chapter if provided or necessary.

% -   This would help in writing and fill criterias.
%=============================================================================

\documentclass[../main.tex]{subfiles}
% \graphicspath{{\subfix{../images/}}}

\begin{document}

% contents ..

\end{document}
```
