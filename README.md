# MVP1 - frontend

Neste repositório está o frontend do projeto KCO - organização de armários. Este projeto foi concebido para gerir os armários da cozinha da minha casa.

# Estrutura do projeto

Este projeto está organizado da seguinte maneira:

```
.
├── scripts
│   ├── cabinet.js
│   ├── item.js
│   └── type.js
├── index.html
├── styles.css
````

O arquivo `index.html` é a página do projeto que é renderizada no browser.

O arquivo `styles.css` é o arquivo de estilos da nossa página.

A pasta `scripts` contém três scripts: `item.js`, `cabinet.js` e `type.js`. A ideia é que cada um dos scripts tenha a responsabilidade de gerir as chamadas e lógica relacionada a cada entidade do banco de dados correspondente.

## Execução

Para executar o projeto, primeiramente deve-se executar o backend do mesmo, que está localizado [neste repositório](https://github.com/malusolero/mvp1back). Também é necessário fazer o cadastro de tipos (`Type`) e armários (`Cabinet`) pois a aplicação depdende destes dados para funcionar. Como este é o MVP, o foco foi desenvolver a funcionalidade da gestão de itens, por isso a gestão de tipos e armários ficaria para uma próxima versão do projeto.

Após conferir a etapa acima, simplesmente navegue pelo browser até a localização do `index.html` deste projeto, deverá ser algo assim:

```
file:///<caminho até o arquivo>/index.html
```