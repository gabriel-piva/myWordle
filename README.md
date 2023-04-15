## MyWordle

É um jogo inspirado pelos jogos [Termo](https://term.ooo/) e [Wordle](https://www.nytimes.com/games/wordle/index.html), porém com algumas modificações. Nele, o objetivo é adivinhar uma palavra de 5 letras, em inglês, dando palpites com outras palavras, com 6 tentativas ao máximo. A cada palavra inserida, as letras recebem uma cor. Quando uma letra pertence à palavra correta e está na mesma posição, recebe a cor verde, se pertence à palavra correta, mas não está na posição, recebe a cor amarela e se não pertence, recebe a cor preta. Além disso, apenas palavras válidas são aceitas, verificadas em um banco de palavras. A palavra objetivo também é sorteada de um banco de opções. 

A cada acesso é possível jogar uma nova palavra, e não apenas uma por dia, como nos jogos originais, ou seja, pode-se jogar várias vezes seguidas. Além disso, após descobrir a palavra correta, é possível acessar um link para ver diretamente a tradução do termo em inglês, utilizando o [Google Translate](https://translate.google.com.br/?hl=pt-BR). Assim, a cada nova palavra descoberta é possível ver suas possíveis traduções, e conhecer novos termos em inglês.

![myWordle](images/myWordle.png)

O projeto é inteiramente realizado com HTML, CSS e JavaScript.

O objetivo principal foi o estudo e prática da programação em JavaScript, como o uso do Local Storage para salvar o histórico dos jogos, a leitura do teclado para a escrita das palavras, a própria lógica do jogo, a construção dos elementos e do teclado na tela com CSS, de forma responsiva, as animações e a movimentação entre as casas das palavras, além de praticar e estudar HTML, CSS e JS em geral.

O ícone da página utilizado vem do [Icon-Icons](https://icon-icons.com/pt/icone/palavra-mac/23563), a biblioteca de ícones é a [Boxicons](https://boxicons.com/) e a fonte vem do [Google Fonts](https://fonts.google.com/specimen/Varela+Round). O banco de palavras aceitas e as palavras que podem ser sorteadas foram retirados do canal [Web Dev Simplified](https://github.com/WebDevSimplified/wordle-clone).wilts