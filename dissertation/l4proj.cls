% =============================================================================
% l4proj.cls
%
% Template for final year projects in the School of Computing Science at the
% University of Glasgow. Adapted from the level 3 project template originally
% provided by Colin Perkins <csp@dcs.gla.ac.uk>.
%
% =============================================================================

\ProvidesClass{l4proj}[%
	2009/01/09 Colin Perkins <csp@dcs.gla.ac.uk>.%
	2009/09/16 Modified by Tim Storer <tws@dcs.gla.ac.uk> to support non pdf modes.%
	2011/02/15 Modified by Gregg Hamilton <hamiltgr@dcs.gla.ac.uk> for use in final year projects.%
	2012/10/18 Modified by Patrick Prosser, use geometry to control margins, simplified.%
	2018/09/14 Modified by John Williamson, improve typographic appearance%
]
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{report}}

\ProcessOptions
\LoadClass[10pt,a4paper]{report}

% Monospace font is Fira Mono Sans
% the body font used is FBB (Bembo)

\usepackage{iftex}

\ifPDFTeX
\usepackage{fbb}
\usepackage{FiraMono}
\usepackage{FiraSans}
\usepackage{textcomp}
\usepackage[english]{babel}
\usepackage[T1]{fontenc}
\else
% make sure the fonts are actually set
\usepackage{fontspec}
\usepackage{polyglossia}
\setromanfont[Path=./fonts/, BoldFont=fbb-Bold, UprightFont=fbb-Regular, ItalicFont=fbb-Italic, BoldItalicFont=fbb-BoldItalic]{fbb}
\setmonofont[Path=./fonts/, BoldFont=FiraMono-Bold, UprightFont=FiraMono-Regular]{FiraMono.ttf}
\setsansfont[Path=./fonts/, BoldFont=FiraSans-Bold, UprightFont=FiraSans-Regular, ItalicFont=FiraSans-Italic, BoldItalicFont=FiraSans-BoldItalic]{FiraSans.ttf}
\fi

\usepackage[libertine,bigdelims,vvarbb]{newtxmath} % bb from STIX
% \usepackage[cal=boondoxo]{mathalfa} % mathcal

\usepackage{microtype} % improve typography
\usepackage{anyfontsize} % allow any size of font
% \usepackage{amsmath,amsfonts,amsbsy,amssymb}
\usepackage[style]{abstract} % abstract styling
\usepackage[normalem]{ulem}

% set bibliography styling
% \usepackage{natbib}
% \bibpunct{(}{)}{;}{a}{}{;}
\usepackage[defernumbers=true]{biblatex}
\usepackage{csquotes}
\DeclareBibliographyCategory{cited}
\AtEveryCitekey{\addtocategory{cited}{\thefield{entrykey}}}
\DeclareCiteCommand{\citelink}
{\boolfalse{citetracker}%
	\boolfalse{pagetracker}%
	\usebibmacro{prenote}}
{\iffieldundef{postnote}
	{\href{\thefield{url}}{\printfield{title}}}
	{\href{\thefield{url}}{\thefield{postnote}}}}
{\multicitedelim}
{}
\setcounter{biburllcpenalty}{7000}
\setcounter{biburlucpenalty}{8000}
\renewcommand{\UrlFont}{\small\ttfamily}
\newcommand{\citecode}[1]{\citelink[\texttt{\citefield{#1}{title}}]{#1} \cite{#1}}


\usepackage{etoolbox}
\usepackage[compact]{titlesec} % section heading formatting
\usepackage{color} % colors
\usepackage[table,svgnames]{xcolor}

% Plotting graphs and charts
\usepackage{tikz}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
% \usepackage{pgf-pie}
\usetikzlibrary{arrows, automata, backgrounds, calendar, chains, matrix, mindmap, patterns, petri, shadows, shapes.geometric, shapes.misc, spy, trees}

\tikzset{
	chart/.style={
		legend label/.style={font={\scriptsize},anchor=west,align=left},
		legend box/.style={rectangle, draw, minimum size=5pt},
		axis/.style={black,semithick,->},
		axis label/.style={anchor=east,font={\tiny}},
	},
	bar chart/.style={
		chart,
		bar width/.code={
			\pgfmathparse{##1/2}
			\global\let\bar@w\pgfmathresult
		},
		bar/.style={very thick, draw=white},
		bar label/.style={font={\bfseries\small},anchor=north},
		bar value/.style={font={\footnotesize}},
		bar width=.75,
	},
	pie chart/.style={
		chart,
		slice/.style={line cap=round, line join=round, very thick,draw=white},
		pie title/.style={font={\bfseries}},
		slice type/.style n args={3}{
			##1/.style={pattern color=##2,pattern=##3},
			values of ##1/.style={}
		}
}}

\pgfdeclarelayer{background}
\pgfdeclarelayer{foreground}
\pgfsetlayers{background,main,foreground}

\newcommand{\pie}[3][]{
	\begin{scope}[#1]
		\pgfmathsetmacro{\curA}{90}
		\pgfmathsetmacro{\r}{1}
		\def\c{(0,0)}
		\node[pie title] at (90:1.3) {#2};
		\foreach \v/\s in{#3}{
			\pgfmathsetmacro{\deltaA}{\v/100*360}
			\pgfmathsetmacro{\nextA}{\curA + \deltaA}
			\pgfmathsetmacro{\midA}{(\curA+\nextA)/2}
			
			\path[slice,\s] \c
			-- +(\curA:\r)
			arc (\curA:\nextA:\r)
			-- cycle;
			\pgfmathsetmacro{\d}{max((\deltaA * -(.5/50) + 1) , .5)}
			
			\begin{pgfonlayer}{foreground}
				\path \c -- node[pos=\d,pie values,values of \s]{$\v\%$} +(\midA:\r);
			\end{pgfonlayer}
			
			\global\let\curA\nextA
		}
	\end{scope}
}

\newcommand{\legend}[2][]{
	\begin{scope}[#1]
		\path
		\foreach \n/\s in {#2}
		{
			++(0,-6pt) node[\s,legend box] {} +(4pt,0) node[legend label] {\n}
		}
		;
	\end{scope}
}

% \usepackage{parskip} % adjustable line spacing
\usepackage{listings} % nice code listings
% \usepackage{minted} % alternate code listings

\renewcommand*{\fps@figure}{ht}
\renewcommand*{\fps@table}{ht}

\newcommand{\code}[1]{\texttt{#1}} % simple to write monospace words

% remove dots from ToC
\usepackage[titles]{tocloft}
\renewcommand{\cftdot}{}
\usepackage[nottoc]{tocbibind}

\renewcommand\listoffigures{%
	\section*{\listfigurename}
	\@starttoc{lof}%
}

\renewcommand\listoftables{%
	\section*{\listtablename}
	\@starttoc{lot}%
}

% remove duplicate/same page numbers
% \renewcommand{\cftchapfillnum}[1]{
%   {\cftsecleader}\nobreak
%   \makebox[\@pnumwidth][\cftpnumalign]{%
%   {\cftsecpagefont #1}}\cftsecafterpnum\par
%   \gdef\currentcontentsnumber{#1}}
% % \renewcommand{\cftsecfillnum}[1]{
% %   {\cftsecleader}\nobreak
% %   \makebox[\@pnumwidth][\cftpnumalign]{%
% %   {\cftsecpagefont #1}}\cftsecafterpnum\par
% %   \gdef\currentcontentsnumber{#1}}
% \renewcommand{\cftsecfillnum}[1]{\expandafter\ifx\currentcontentsnumber#1
%   \hfill\nobreak\else
%   {\cftsecleader}\nobreak
%   \makebox[\@pnumwidth][\cftpnumalign]{%
%   {\cftsecpagefont #1}}\fi
%   \cftsecafterpnum\par
%   \gdef\currentcontentsnumber{#1}}
% \renewcommand{\cftsubsecfillnum}[1]{\expandafter\ifx\currentcontentsnumber#1
%   \hfill\nobreak\else
%   {\cftsubsecleader}\nobreak
%   \makebox[\@pnumwidth][\cftpnumalign]{%
%   {\cftsubsecpagefont #1}}\fi
%   \cftsubsecafterpnum\par
%   \gdef\currentcontentsnumber{#1}}

% from: https://gist.github.com/FelipeCortez/10729134
% set up listings for prettier output
\definecolor{bluekeywords}{rgb}{0.13, 0.19, 0.7}
\definecolor{greencomments}{rgb}{0.1, 0.5, 0.2}
\definecolor{redstrings}{rgb}{0.8, 0.15, 0.1}
\definecolor{graynumbers}{rgb}{0.5, 0.5, 0.5}
\definecolor{subtlegray}{rgb}{0.98, 0.98, 0.98}
\usepackage{lstautogobble}
\usepackage{listings}
\lstset{
	autogobble,
	columns=fullflexible,
	showspaces=false,
	showtabs=false,
	breaklines=true,
	showstringspaces=false,
	breakatwhitespace=true,
	escapeinside={(*@}{@*)},
	rulecolor=\color{lightgray},
	backgroundcolor=\color{subtlegray},
	commentstyle=\color{greencomments},
	keywordstyle=\color{bluekeywords},
	stringstyle=\color{redstrings},
	numberstyle=\color{graynumbers},
	basicstyle=\ttfamily\linespread{1.15}\footnotesize,
	frame=tb,
	framesep=12pt,
	framexleftmargin=12pt,
	tabsize=4,
	captionpos=b
}
%% ---

% nice number printing
\usepackage{numprint}

% allow PDF graphics
\usepackage{graphicx}
\usepackage{svg}

% allow section styling
%\usepackage{sectsty}

% make all cross-references clickable
\usepackage[hidelinks]{hyperref}

% enable styled captions
\usepackage[format=plain,labelfont={bf},tableposition=above,font={sf}]{caption}

\newcommand{\figurelabel}[1]{%
    \ifnum#1=1
        \thefigure\thesubfigure
    \else
        \thefigure
    \fi
}

\AtBeginEnvironment{document}{%
    \newcounter{subfigcheck}%
    \newcounter{lstingcheck}%
    \newcounter{tablecheck}%
}
\AtBeginEnvironment{subfigure}{\setcounter{subfigcheck}{1}}
\AfterEndEnvironment{subfigure}{\setcounter{subfigcheck}{0}}
\AtBeginEnvironment{lstlisting}{\setcounter{lstingcheck}{1}}
\AfterEndEnvironment{lstlisting}{\setcounter{lstingcheck}{0}}
\AtBeginEnvironment{table}{\setcounter{tablecheck}{1}}
\AfterEndEnvironment{table}{\setcounter{tablecheck}{0}}

\DeclareCaptionFormat{plain}{%
    \ifnum\thelstingcheck=1
        \label{lst:\thelstlisting}
    \else
        \ifnum\thetablecheck=1
            \label{table:\thetable}
        \else
            \label{fig:\figurelabel{\thesubfigcheck}}
        \fi
    \fi%
    #1#2#3\par%
}

\newcommand{\secfont}{\normalfont\sffamily}
% % style the sections and the abstract
% \allsectionsfont{\secfont}


\renewcommand{\abstractnamefont}{\Large\secfont}
\renewcommand{\abstitlestyle}[1]{{{\let\clearpage\relax \chapter*{#1}}}}

\usepackage[toc]{appendix}

% allow subfloats
\usepackage{subcaption}

% fix the margins and linespacing
\usepackage[top=3.5cm,bottom=4.0cm,left=3.5cm,right=3.5cm]{geometry}
\setlength{\parskip}{5pt plus 2pt}

% define the title page
\renewcommand\maketitle{
	\begin{titlepage}%
		\definecolor{UniBlue}{HTML}{00355F}
		
		\let\footnotesize\small
		\let\footnoterule\relax
		\let\footnote \thanks
		
		% the logo, full page width
		\vspace{1in}
		\includegraphics[width=\linewidth]{images/CompSci_colour.pdf}
		\vskip 0.5em
		\color{UniBlue}
		{\large \sffamily Honours Individual Project Dissertation}\\
		
		% title and author
		
		\vspace{1cm}
		\Large
		\vskip 5em%
		
		\begin{center}
			
			\color{UniBlue}
			\noindent
			{\Huge \scshape  \@title \par}%
			
			
			
			
			
		\end{center}
		\vfill
		{\Large
			\textbf{\@author}\\
			\@date}
		
		
		
	\end{titlepage}%
	
	\setcounter{footnote}{0}%
	\global\let\thanks\relax
	\global\let\maketitle\relax
	\global\let\@thanks\@empty
	\global\let\@author\@empty
	\global\let\@date\@empty
	\global\let\@consentname\@empty
	\global\let\@consentdate\@empty
	
	\global\let\@title\@empty
	\global\let\title\relax
	\global\let\author\relax
	\global\let\date\relax
	\global\let\and\relax
}
\usepackage{booktabs}
% set up headers and footers
% no footer, page numbers at top-right
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhead{}
\fancyfoot{}
\fancyhead[R]{\thepage}
\renewcommand{\headrulewidth}{0pt}
\fancypagestyle{plain}{%
	\renewcommand{\headrulewidth}{0pt}%
	\fancyhf{}%
	\fancyhead[R]{\thepage}%
}

\usepackage{titlesec}
% set up chapter headings
\usepackage{xstring}
\titleformat{\chapter}[display]
% only show numbers if they aren't Chapter 0 (i.e. front matter)
{\normalfont}{}{0pt}{
	\huge\bfseries\secfont
	\IfInteger{\thechapter}{\ifnum0=0\thechapter\relax\else\relax {\Huge \thechapter}\ \rule[-0.25em]{0.5pt}{1.5em}\ \fi}
	{\thechapter \ \rule[-0.25em]{0.5pt}{1.5em}\ }}
%[\titlerule]
\titlespacing*{\chapter}
{0pt}{0pt}{15pt}

% Acknowledgements
\newenvironment{acknowledgements}
{
	\newpage
	\chapter*{Acknowledgements}
}
{}

% Educational consent form
\newcommand{\educationalconsent}{
	\ifdefined\consentname
	\newpage
	% \let\cleardoublepage\relax
	\chapter*{Educational Use Consent}
	
	I hereby grant my permission for this project to be stored, distributed and shown to other
	University of Glasgow students and staff for educational purposes.
	\textbf{Please note that you are under no obligation to sign
	this declaration, but doing so would help future students.}
	
	\begin{tabular}{@{}llll}
		           &              &       &              \\
		           &              &       &              \\
		Signature: & \consentname & Date: & \consentdate \\
		           &              &       &              \\
		           &              &       &              \\
	\end{tabular}
	\else
	\newpage
	\chapter*{Educational Use Consent}
	Consent for educational reuse withheld. Do not distribute.
	\fi
	
}

% split into files
\usepackage{subfiles}

% highlight boxes
\usepackage{tcolorbox}
\newenvironment{highlight}
{\begin{tcolorbox}[notitle,boxrule=0pt,colback=green!10,colframe=green!10]}
{
	\end{tcolorbox}
}

\newenvironment{highlight_title}[1]
{\begin{tcolorbox}[title=#1,boxrule=2pt,colback=green!10,colframe=green!20,coltitle=black,fonttitle=\bfseries]}
{
	\end{tcolorbox}
}

% adjust margins
\setlength{\parindent}{0pt}

% use (a) in figures
\captionsetup{subrefformat=parens}

% Algorithm typesetting package
\usepackage[plain, noline, shortend, linesnumberedhidden]{algorithm2e}
\SetAlFnt{\sffamily \small}

% adjust spacing
\titlespacing{\section}{10pt}{1.5\baselineskip}{8pt plus 3pt minus 3pt}
\titlespacing{\subsection}{10pt}{1.2\baselineskip}{8pt plus 4pt minus 1pt}
\titleformat{\subsubsection}{\bfseries }{}{}{}[]
\titlespacing{\subsubsection}{0pt}{\baselineskip}{0pt}
\titlespacing{\chapter}{0pt}{0pt}{40pt plus 10pt minus 5pt}
\lstset{aboveskip=20pt,belowskip=20pt,xleftmargin=10pt}

% switch to roman numeral for frontmatter
\pagenumbering{roman}

% fix itemise so it looks reasonable
\renewcommand{\@listI}{%
	\leftmargin=25pt
	\rightmargin=0pt
	\labelsep=5pt
	\labelwidth=20pt
	\itemindent=0pt
	\listparindent=0pt
	\topsep=0pt plus 2pt minus 4pt
	\partopsep=0pt plus 1pt minus 1pt
	\parsep=1pt plus 1pt
	\itemsep=\parsep}

% auto label chapters
\usepackage{xparse}
\usepackage{pgffor}

\def\headertypes{
	{\chapter, chap},%
	{\section, sec},%
	{\subsection, subsec},%
	{\subsubsection, subsubsec},%
}

% \foreach \h [count=\n] in \headertypes
% {
%     \let{\csname old{\h[0]}\n \endcsname}{{\h[0]}}
%     \RenewDocumentCommand{\h[0]}{sO{#4}O{#4}m}{%
%       \index{#2}%
%       \IfBooleanTF{#1}{%
%         \csname old{\h[0]}\n \endcsname*{#4}%\protected@edef\@currentlabel{#3}%
%       }{%
%         \oldchapter{#4}%
%         \label{{\h[1]}:#2}%
%       }%
%     }
%     % \RenewDocumentCommand{{\h[0]}}{s o m}{%
%     %   \IfBooleanTF{#1}%
%     %     {\IfValueTF{#2}%
%     %       {\csname old{\h[0]}\n \endcsname*{#3}%
%     %       \markboth{#2}{}%
%     %       }
%     %       {\csname old{\h[0]}\n \endcsname*{#3}}}
%     %     {\IfValueTF{#2}%
%     %       {\csname old{\h[0]}\n \endcsname[#2]{#3} \label{{\h[1]}:#2}}%
%     %       {\csname old{\h[0]}\n \endcsname{#3}} \label{{\h[1]}:#3}}%
%     % }
% }

\let\oldchapter\chapter
\RenewDocumentCommand{\chapter}{sO{#4}O{#4}m}{%
	\index{#2}%
	\IfBooleanTF{#1}{%
		\oldchapter*{#4}%
		}{%
		\oldchapter{#4}%
		\label{chap:#2}%
	}%
}

\let\oldsection\section
\RenewDocumentCommand{\section}{sO{#4}O{#4}m}{%
	\index{#2}%
	\IfBooleanTF{#1}{%
		\oldsection*{#4}%
		}{%
		\oldsection{#4}%
		\label{sec:#2}%
	}%
}

\let\oldsubsection\subsection
\RenewDocumentCommand{\subsection}{sO{#4}O{#4}m}{%
	\index{#2}%
	\IfBooleanTF{#1}{%
		\oldsubsection*{#4}%
		}{%
		\oldsubsection{#4}%
		\label{subsec:#2}%
	}%
}

\let\oldsubsubsection\subsubsection
\RenewDocumentCommand{\subsubsection}{sO{#4}O{#4}m}{%
	\index{#2}%
	\IfBooleanTF{#1}{%
		\oldsubsubsection*{#4}%
		}{%
		\oldsubsubsection{#4}%
		\label{subsubsec:#2}%
	}%
}

\NewDocumentCommand{\boldheader}{sO{#4}O{#4}m}{%
	\index{#2}%
	\vskip 0.5em
	\textbf{#4}%
}

\NewDocumentCommand{\foodgroup}{sO{#4}O{#4}m}{%
	\index{#2}%
	\phantomsection
	\boldheader{#4}
	\IfBooleanTF{#1}{}{\label{subsec:#2}}%
	\addtocounter{subsection}{1}
	\addcontentsline{toc}{subsection}{\protect\numberline{\thesubsection}#4}
}

% generate lipsum text
\usepackage{lipsum}
\newbox\one
\newbox\two
\long\def\loremlines#1{%
	\setbox\one=\vbox {%
		\lipsum%
	}
	\setbox\two=\vsplit\one to #1\baselineskip
	\unvbox\two}

% code listings support

% \newcommand\langname@bash{}
% \def\langname@bash{bash}
% \newcommand\prompt@bash{\$\ }
% \newcommand\addedToEveryPar@bash{}
% \lst@AddToHook{EveryPar}{\addedToEveryPar@bash}
% \lst@AddToHook{PreInit}{%
%   \ifx\lst@language\langname@bash%
%     \let\addedToEveryPar@bash\prompt@bash%
%   \fi
% }

% \lstnewenvironment{shellsession}[1][]
% {\lstset{language=bash,
%     basicstyle=\small\ttfamily,
%     numbers=none,
%     #1
%   }}
% {}

%% Source: https://github.com/xgirma/latex-javaScript/blob/master/jslistings.sty
\lstdefinelanguage{JavaScript}{
	alsoletter={.},
	keywords={arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,enum,eval,export,extends,false,finally,for,function,if,implements,import,in,instanceof,interface,let,new,null,package,private,protected,public,return,static,super,switch,this,throw,true,try,typeof,var,void,while,with,yield}, % JavaScript ES6 keywords
	ndkeywords={add, apply, args, Array, Array.from, Array.isArray, Array.of , Array.prototype, ArrayBuffer, bind, Boolean, call, charAt, charCodeAt, clear, codePointAt, concat, constructor, copyWithin, DataView, Date, Date.now, Date.parse, Date.prototype, Date.UTC, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent, endsWith, entries, Error, Error.prototype, EvalError, every, false, fill, filter, find, findIndex, Float32Array, Float64Array, forEach, FulfillPromise, Function, Function.length, get, getDate, getDay, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getTime, getTimezoneOffset, getUTCDate, getUTCDay, getUTCFullYear, getUTCHours, getUTCMilliseconds, getUTCMinutes, getUTCMonth, getUTCSeconds, has,hasInstance, hasOwnProperty, ignoreCase, includes, indexOf, indexOf, Infinity, Int8Array, Int16Array, Int32Array, isConcatSpreadable, isFinite, isNaN, IsPromise, isPrototypeOf, Iterable, iterator, join, JSON, JSON.parse, JSON.stringify, keys, lastIndexOf, lastIndexOf, length, localeCompare, map, Map, match, match, Math, Math.abs , Math.acos, Math.acosh, Math.asin, Math.asinh, Math.atan, Math.atan2, Math.atanh, Math.cbrt, Math.ceil, Math.clz32, Math.cos, Math.cosh,  Math.E, Math.exp, Math.expm1, Math.floor, Math.fround, Math.hypot, Math.imul, Math.LN2, Math.LN10, Math.log, Math.log1p, Math.log2, Math.LOG2E, Math.log10, Math.LOG10E, Math.max, Math.min, Math.PI, Math.pow, Math.random, Math.round, Math.sign, Math.sin, Math.sinh, Math.sqrt, Math.SQRT1_2, Math.SQRT2, Math.tan, Math.tanh, Math.trunc, message, multiline, name, NaN, NewPromiseCapability, next, normalize, null, Number, Number.EPSILON, Number.isFinite, Number.isInteger, Number.isNaN, Number.isSafeInteger, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.MIN_SAFE_INTEGER, Number.MIN_VALUE, Number.NaN, Number.NEGATIVE_INFINITY, Number.parseFloat, Number.parseInt, Number.POSITIVE_INFINITY, Number.prototype, Object, Object, Object.assign, Object.create, Object.defineProperties, Object.defineProperty, Object.freeze, Object.getOwnPropertyDescriptor, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, Object.getPrototypeOf, Object.is, Object.isExtensible, Object.isFrozen, Object.isSealed, Object.keys, Object.preventExtensions, Object.prototype, Object.seal, Object.setPrototypeOf, of, parseFloat, parseInt, pop, Promise, Promise.all , Promise.race, Promise.reject, Promise.resolve, PromiseReactionJob, propertyIsEnumerable, prototype, Proxy, Proxy.revocable , push, RangeError, reduce, reduceRight, ReferenceError, Reflect, Reflect.apply, Reflect.construct , Reflect.defineProperty, Reflect.deleteProperty, Reflect.enumerate, Reflect.get, Reflect.getOwnPropertyDescriptor, Reflect.getPrototypeOf, Reflect.has, Reflect.isExtensible, Reflect.ownKeys, Reflect.preventExtensions, Reflect.set, Reflect.setPrototypeOf, Reflection, RegExp, RegExp, RegExp.prototype, repeat, replace, replace, reverse, search, search, Set, set, setDate, setFullYear, setHours, setMilliseconds, setMinutes, setMonth, setSeconds, setTime, setUTCDate, setUTCFullYear, setUTCHours, setUTCMilliseconds, setUTCMinutes, setUTCMonth, setUTCSeconds, shift, slice, slice, some, sort, species, splice, split, split, startsWith, String, String.fromCharCode, String.fromCodePoint, String.raw, substring, Symbol, Symbol.for, Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator, Symbol.keyFor, Symbol.match, Symbol.prototype, Symbol.replace, Symbol.replace, Symbol.search, Symbol.species, Symbol.split, Symbol.toPrimitive, Symbol.toStringTag, Symbol.unscopables, SyntaxError, then, toDateString, toExponential, toFixed, toISOString, toJSON, toLocaleDateString, toLocaleLowerCase, toLocaleString, toLocaleString, toLocaleString, toLocaleString, toLocaleTimeString, toLocaleUpperCase, toLowerCase, toPrecision, toPrimitive, toString, toStringTag, toTimeString, toUpperCase, toUTCString, TriggerPromiseReactions, trim, true, TypeError, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, undefined, unscopables, unshift, URIError, valueOf, WeakMap, WeakSet
	}, % JavaScript extended keywords
	% ndkeywordstyle=\color{jsextkeywords}\bfseries,
	% identifierstyle=\color{identifiers},
	sensitive=true,
	comment=[l]{//},
	morecomment=[s]{/*}{*/},
	morestring=[b]",
	morestring=[d]',
	morestring=[s][\color{redstrings}\ttfamily]{`}{`},
	emph={app.all, app.delete, app.disable, app.disabled, app.enable, app.enabled, app.engine, app.get, app.listen, app.locals, app.METHOD, app.mountpath, app.param, app.path, app.post, app.put, app.render, app.route, app.set, app.use, express, express.Router, express.static, req.acceptLanguages, req.accepts, req.acceptsCharsets, req.acceptsEncodings, req.app, req.baseUrl, req.body, req.cookies, req.fresh, req.get, req.hostname, req.ip, req.ips, req.is, req.method, req.originalUrl, req.param, req.params, req.path, req.protocol, req.query, req.range, req.route, req.secure, req.signedCookies, req.stale, req.subdomains, req.xhr, res.app, res.append, res.attachment, res.clearCookie, res.cookies, res.download, res.end, res.format, res.get, res.headersSent, res.json, res.jsonp, res.links, res.locals, res.location, res.redirect, res.render, res.sendFile, res.sendStatus, res.set, res.status, res.type, res.vary, router.all, router.METHOD, router.param, router.route, router.use}, % express keywords
	emph={[2]agent.createConnection, agent.destroy, agent.freeSockets, agent.getName, agent.maxFreeSockets, agent.maxSockets, agent.requests, agent.sockets, certificate.exportChallenge, certificate.exportPublicKey, certificate.verifySpkac, child.channel, child.connected, child.disconnect, child.kill, child.pid, child.send, child.stderr, child.stdin, child.stdio, child.stdout, child_process.exec, child_process.execFile, child_process.execFileSync, child_process.execSync, child_process.fork, child_process.spawn, child_process.spawnSync, cipher.final, cipher.getAuthTag, cipher.setAAD, cipher.setAutoPadding, cipher.update, clearImmediate, clearImmediate, clearInterval, clearInterval, clearTimeout, clearTimeout, console, console.assert, console.dir, console.error, console.info, console.log, console.time, console.timeEnd, console.trace, console.warn, decipher.final, decipher.setAAD, decipher.setAuthTag, decipher.setAutoPadding, decipher.update, dgram.createSocket, dgram.createSocket, diffieHellman.computeSecret, diffieHellman.generateKeys, diffieHellman.getGenerator, diffieHellman.getPrime, diffieHellman.getPrivateKey, diffieHellman.getPublicKey, diffieHellman.setPrivateKey, diffieHellman.setPublicKey, diffieHellman.verifyError, dns.getServers, dns.getServers, dns.lookup, dns.lookup, dns.lookupService, dns.resolve, dns.resolve4, dns.resolve6, dns.resolveCname, dns.resolveMx, dns.resolveNaptr, dns.resolveNs, dns.resolvePtr, dns.resolveSoa, dns.resolveSrv, dns.resolveTxt, dns.reverse, dns.setServers, ecdh.computeSecret, ecdh.generateKeys, ecdh.getPrivateKey, ecdh.getPublicKey, ecdh.setPrivateKey, ecdh.setPublicKey, error.address, error.code, error.errno, error.message, error.path, error.port, error.stack, error.syscall, exports, fs.access, fs.accessSync, fs.appendFile, fs.appendFileSync, fs.chmod, fs.chmodSync, fs.chown, fs.chownSync, fs.close, fs.closeSync, fs.constants, fs.createReadStream, fs.createWriteStream, fs.exists, global, http.createServer, http.get, http.globalAgent, http.request, https.createServer, https.get, https.globalAgent, https.request, message.destroy, message.headers, message.httpVersion, message.method, message.rawHeaders, message.rawTrailers, message.setTimeout, message.socket, message.statusCode, message.statusMessage, message.trailers, message.url, module, module.children, module.exports, module.filename, module.id, module.loaded, module.parent, module.require, os.arch, os.constants, os.cpus, os.endianness, os.EOL, os.freemem, os.homedir, os.hostname, os.loadavg, os.networkInterfaces, os.platform, os.release, os.tmpdir, os.totalmem, os.type, os.uptime, os.userInfo, path.basename, path.delimiter, path.dirname, path.extname, path.format, path.isAbsolute, path.join, path.normalize, path.parse, path.posix, path.relative, path.resolve, path.sep, path.win32, process, process.abort, process.arch, process.argv, process.argv0, process.channel, process.chdir, process.config, process.connected, process.cpuUsage, process.cwd, process.disconnect, process.emitWarning, process.env, process.execArgv, process.execPath, process.exit, process.exitCode, process.getegid, process.geteuid, process.getgid, process.getgroups, process.getuid, process.hrtime, process.initgroups, process.kill, process.mainModule, process.memoryUsage, process.nextTick, process.pid, process.platform, process.release, process.send, process.setegid, process.seteuid, process.setgid, process.setgroups, process.setuid, process.stderr, process.stdin, process.stdout, process.title, process.umask, process.uptime, process.version, process.versions, querystring.escape, querystring.parse, querystring.stringify, querystring.unescape, r.clearLine, readable.pause, readable.pipe, readable.push, readable.push, readable.read, readable.read, readable.resume, readable.setEncoding, readable.unpipe, readable.unshift, readable.wrap, readable._read, readStream.bytesRead, readStream.isRaw, readStream.path, readStream.setRawMode, repl.start, request.abort, request.aborted, request.end, request.flushHeaders, request.setNoDelay, request.setSocketKeepAlive, request.setTimeout, request.write, require, require.cache, require.extensions, response.addTrailers, response.end, response.finished, response.getHeader, response.getHeaderNames, response.getHeaders, response.hasHeader, response.headersSent, response.removeHeader, response.sendDate, response.setHeader, response.setTimeout, response.statusCode, response.statusMessage, response.write, response.writeContinue, response.writeHead, rl.clearScreenDown, rl.close, rl.createInterface, rl.cursorTo, rl.emitKeypressEvents, rl.moveCursor, rl.pause, rl.prompt, rl.question, rl.resume, rl.setPrompt, rl.write, script.runInNewContext, script.runInThisContext, server.addContext, server.address, server.address, server.close, server.close, server.connections, server.getTicketKeys, server.listen, server.listen, server.setTicketKeys, server.setTimeout, server.setTimeout, server.timeout, server.timeout, setImmediate, setInterval, setTimeout, socket.addMembership, socket.address, socket.bind, socket.bind, socket.close, socket.dropMembership, socket.ref, socket.send, socket.setBroadcast, socket.setMulticastLoopback, socket.setMulticastTTL, socket.setTTL, socket.unref, stream.Readable, stringDecoder.end, stringDecoder.write, timeout.ref, timeout.unref, tls.connect, tls.createSecureContext, tls.createServer, tls.getCiphers, tlsSocket.address, tlsSocket.authorizationError, tlsSocket.authorized, tlsSocket.encrypted, tlsSocket.getCipher, tlsSocket.getEphemeralKeyInfo, tlsSocket.getPeerCertificate, tlsSocket.getProtocol, tlsSocket.getSession, tlsSocket.getTLSTicket, tlsSocket.localAddress, tlsSocket.localPort, tlsSocket.remoteAddress, tlsSocket.remoteFamily, tlsSocket.remotePort, tlsSocket.renegotiate, tlsSocket.setMaxSendFragment, transform._flush, transform._transform, util.debuglog, util.deprecate, util.format, util.inherits, util.inspect, v8.getHeapStatistics, v8.setFlagsFromString, vm.createContext, vm.isContext, vm.runInContext, vm.runInDebugContext, vm.runInNewContext, vm.runInThisContext, watcher.close, worker.disconnect, worker.exitedAfterDisconnect, worker.id, worker.isConnected, worker.isDead, worker.kill, worker.process, worker.send, worker.suicide, writable.cork, writable.end, writable.setDefaultEncoding, writable.write, writeStream.bytesWritten, writeStream.columns, writeStream.path, writeStream.rows, zlib, zlib.createGunzip, zlib.createGzip, zlib.createInflate, zlib.createInflateRaw, zlib.createUnzip, zlib.deflate, zlib.deflateRaw, zlib.deflateRawSync, zlib.deflateSync, zlib.gunzip, zlib.gunzipSync, zlib.gzip, zlib.gzipSync, zlib.inflate, zlib.inflateRaw, zlib.inflateRawSync, zlib.inflateSync, zlib.unzip, zlib.unzipSync, __dirname, __filename}, % Node.js keywords
	emph={[3] assert, assert.deepEqual, assert.deepStrictEqual, assert.doesNotThrow, assert.equal, assert.fail, assert.ifError, assert.notDeepEqual, assert.notDeepStrictEqual, assert.notEqual, assert.notStrictEqual, assert.ok, assert.strictEqual, assert.throws, describe, toBe, it, xdescribe, beforeEach, afterEach, beforeAll, afterAll, expect, it, xit, xdiscribe, pending, and.callThrough, and.returnValue, and.returnValues, and.callFake, and.throwError, and.stub, .not, .calls.any, .calls.count, .calls.argsFor, .calls.allArgs, .calls.all, .calls.mostRecent, .calls.first, .calls.reset, jasmine.createSpy, jasmine.createSpyObj, jasmine.any, jasmine.anything, jasmine.objectContaining, jasmine.arrayContaining, jasmine.stringMatching, asymmetricMatch,  jasmine.clock, .not.toBeTruthy, .toBeTruthy, .not.toBeFalsy, .toBeFalsy, .not.toBeDefined .toBeDefined, .not.toBeNull .toBeNull, .not.toEqual .toEqual, .not.toBeCloseTo .toBeCloseTo, .not.toContain, .toContain, .not.toMatch, .toMatch, .not.toBeGreaterThan, .toBeGreaterThan, .not.toBeLessThan, .toBeLessThan, .toThrow, .not.toThrow, .toBeNull, .not.toBeNull, .toBeDefined, .not.toBeDefined}, % Node.js Assert, Jasmine, ... keywords
}

\lstdefinelanguage{TypeScript}{language=JavaScript, morekeywords={as,implements,interface,let,package,private,protected,public,static,yield,any,boolean,constructor,declare,get,module,require,number,set,string,symbol,type,from,of}}

\definecolor{delim}{RGB}{20,105,176}
\definecolor{numb}{RGB}{106, 109, 32}

% source: https://gist.github.com/ed-cooper/1927af4ccac39b083440d436d018d253
\lstdefinelanguage{json}{
	morestring=[b]",
	stringstyle=\color{redstrings},
	literate=
	*{0}{{{\color{numb}0}}}{1}
	{1}{{{\color{numb}1}}}{1}
	{2}{{{\color{numb}2}}}{1}
	{3}{{{\color{numb}3}}}{1}
	{4}{{{\color{numb}4}}}{1}
	{5}{{{\color{numb}5}}}{1}
	{6}{{{\color{numb}6}}}{1}
	{7}{{{\color{numb}7}}}{1}
	{8}{{{\color{numb}8}}}{1}
	{9}{{{\color{numb}9}}}{1}
	{\{}{{{\color{delim}{\{}}}}{1}
	{\}}{{{\color{delim}{\}}}}}{1}
	{[}{{{\color{delim}{[}}}}{1}
	{]}{{{\color{delim}{]}}}}{1},
}

% source: https://github.com/willfindlay/masters-thesis/blob/d06617241b79b8d92bfa02ab08ede9fd9d318640/thesis/langs.sty#L75
\lstdefinelanguage{yaml}{
	keywords={true,false,null,y,n},
	keywordstyle=\color{darkgray}\bfseries\ttfamily,
	basicstyle=\color{green!20!black}\bfseries\ttfamily,
	sensitive=false,
	comment=[l]{\#},
	morecomment=[s]{/*}{*/},
	commentstyle=\color{purple}\ttfamily,
	stringstyle=\color{black}\mdseries\ttfamily,
	moredelim=[l][\color{orange}]{\&},
	moredelim=[l][\color{magenta}]{*},
	moredelim=**[il][\color{green!20!black}\mdseries{:}\color{black}\mdseries]{:},
	morestring=[b]',
	morestring=[b]",
	literate =    {---}{{\ProcessThreeDashes}}3
	{>}{{\textcolor{green!20!black}\textgreater}}1
	{|}{{\textcolor{green!20!black}\textbar}}1
	{\ -\ }{{\mdseries\ -\ }}3,
}

% source: https://github.com/jdmitrovic/master_rad/blob/3155daa3176bacf5734d201f5f1c83d7b4171115/latex/listings-rust.sty#L44
\lstdefinelanguage{TOML}{
	keywords={package, dependencies},
	ndkeywords={class, export, boolean, throw, implements, import, this},
	ndkeywordstyle=\color{darkgray}\bfseries,
	identifierstyle=\color{black},
	sensitive=false,
	comment=[l]{//},
	morecomment=[s]{/*}{*/},
	commentstyle=\color{purple}\ttfamily,
	% stringstyle=\color{red}\ttfamily,
	morestring=[b]',
	morestring=[b]",
}
