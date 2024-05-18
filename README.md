<div align="center">
  <img src="./assets/icon-foreground.png" alt="SEGES+" width="100" />
  <h1>SEGES+</h1>
</div>

## O que é o SEGES?

O _Sistema Estadual de Gestão Escolar_, conhecido como SEGES, é uma plataforma fornecida pela _Secretaria de Educação_. O serviço é utilizado por professores, pais e estudantes para consultas do boletim eletrônico, chamada escolar, rematrícula, etc. No entanto, devido à sua interface antiga e desatualizada, alguns usuários enfrentam dificuldades e insatisfações ao utilizá-lo. Pensando neste problema, desenvolvi o SEGES+, um aplicativo para Android que permite a consulta do boletim eletrônico de forma mais simples e fácil.

> [!WARNING]
> O SEGES+ não está relacionado ao SEGES e não é desenvolvido pela Secretaria de Educação.

## Como funciona?

```mermaid
flowchart LR
    user(["Usuário"]);
    app(["SEGES+"]);
    seges(["SEGES"]);

    user --> app;
    app --> seges;

    app --> user;
    seges --> app;

    style user fill:#479dff,color:#FFF,stroke-width:0px;
    style app fill:#58aea0,color:#704789,stroke-width:0px;
    style seges fill:#f3d76a,color:#704789,stroke-width:0px;
```

Resumidamente, o aplicativo se comunica e realiza `web scraping`[^1] dos dados do usuário no site do SEGES e com isso disponibiliza uma interface aprimorada para o usuário.

### Ploblemas desta abordagem

> [!WARNING]
> Dado que a única forma de obter dados do SEGES atualmente é por meio de web scrapping, o aplicativo pode parar de funcionar a qualquer momento, uma vez que qualquer alteração no SEGES pode causar problemas ao aplicativo: **O SEGES+ é totalmente dependente do SEGES**.

### Limitações

O principal obstáculo para o projeto sem dúvidas é o `CORS` _(Cross-Origin Resource Sharing)_. Como o SEGES não expõe um cabeçalho permitindo o compartilhamento de recursos com outra origem[^2], é totalmente inviável utilizar soluções, como proxys, para permitir o desenvolvimento de uma versão web da aplicação.

Sendo assim, a solução é desenvolver um app nativo e utilizar a [Capacitor HTTP API](https://capacitorjs.com/docs/apis/http/), Ela corrige e aplica patches no `fetch` e no `XMLHttpRequest` para usarem as bibliotecas nativas do sistema, _seria como acessar o website oficial diretamente pelo navegador_. Porém esta solução não se aplica a web, apenas dispositivos nativos (iOS/Android).[^3]

## Executando

O projeto foi desenvolvido utilizando [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Ionic Framework](https://ionicframework.com/), [Capacitor](https://capacitorjs.com/) e [Vite](https://vitejs.dev/). Abaixo estão as ferramentas para desenvolver o aplicativo, os comandos podem variar dependendo do seu sistema operacional:

| Requisitos | Versão       | Observação                                                                                                                                      |
| ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Node       | lts/hydrogen | Node 18.x                                                                                                                                       |
| Java       | 17           |                                                                                                                                                 |
| Gradle     | 7.6          |                                                                                                                                                 |
| Apksigner  | 31.0.2-1     | [Suporte para assinatura v2, Android R+](https://developer.android.com/about/versions/11/behavior-changes-11?hl=pt-br#compressed-resource-file) |

1. Depois de instalar e configurar as ferramentas, clone o repositório para o seu dispositivo com o comando abaixo:

```sh
git clone https://github.com/Lobooooooo14/SEGES-plus.git SEGES+
```

2. Entre na pasta do projeto e instale as dependências:

```sh
cd SEGES+
npm ci
```

3. Crie sua keystore para posteriormente assinar o APK. Deve se parecer com isso:

```sh
mkdir -p ./android/keystore/
keytool -genkey -v -keystore ./android/keystore/release.keystore -alias seuAliasAqui -keyalg RSA -keysize 2048 -validity 10000
```

4. Crie um arquivo .env na raiz do projeto e configure as variáveis abaixo:

```sh
KEYSTOREPASS=
KEYSTOREALIASPASS=
KEYSTOREALIAS=
```

5. Caso tudo esteja correto, agora você pode utilizar os scripts do npm para executar as seguintes tarefas:

| Comando                 | Ação                                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`           | Inicia o aplicativo em modo desenvolvimento, com hot reloading e Chrome inspect. Certifique-se de usar um emulador ou um dispositivo Android. |
| `npm run build:debug`   | Compila o app e assina o APK com uma assinatura de debug para desenvolvimento. Também é possível utilizar Chrome inspect.                     |
| `npm run build:release` | Compila o app e assina o APK para lançamento.                                                                                                 |
| `npm run prettier:fix`  | Corrige a formação dos arquivos.                                                                                                              |
| `npm run sync`          | Sincroniza (copia + atualiza) as dependências e arquivos para a versão nativa.                                                                |

## Doações

Caso queira apoiar o projeto, você pode doar de duas maneiras: Github Sponsors, com valor mínimo de **\$ 1,00 dolar** ou Pix com valor mínimo de **R\$ 1,00 reais**:

<table>
<thead>
  <tr>
    <th>Método</th>
    <th>Link</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      <a href="https://github.com/sponsors/Lobooooooo14" target="_blank">
        <img alt="Github Sponsors" src="https://github.com/Lobooooooo14/SEGES-plus/assets/88998991/383d1652-b988-451a-a5cf-d7aac4767ff4" width="100">
      </a>
    </td>
    <td><a href="https://github.com/sponsors/Lobooooooo14" target="_blank">Github Sponsors</a></td>
  </tr>
  <tr>
    <td>
      <a href="https://tipa.ai/lobo" target="_blank">
        <img alt="Pix" src="https://github.com/Lobooooooo14/SEGES-plus/assets/88998991/a1a22495-6e4c-4d59-8732-1295e84592ec" width="100"></td>
      </a>
    <td><a href="https://tipa.ai/lobo" target="_blank">Pix</a></td>
  </tr>
</tbody>
</table>

## Instalação

> [!CAUTION]
> Esteja ciente de que a aplicação pode deixar de funcionar a qualquer momento. Não me responsabilizo por possíveis problemas, banimentos ou restrições causadas pela aplicação.

Você pode baixar o `APK` mais recente do SEGES+ clicando no botão abaixo:

<a href="https://github.com/Lobooooooo14/SEGES-plus/releases/latest/download/SEGES+.apk">
  <img src="https://github.com/Lobooooooo14/SEGES-plus/assets/88998991/f1fbe840-8e05-47ae-859c-f1f99f85fbca" alt="Download APK" width="200">
</a>

No momento, o SEGES+ está disponível para download através das [releases do GitHub](https://github.com/Lobooooooo14/SEGES-plus/releases).

[^1]: https://pt.wikipedia.org/wiki/Coleta_de_dados_web
[^2]: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
[^3]: https://ionicframework.com/docs/troubleshooting/cors#1-native-only-apps-iosandroid
