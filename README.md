# <p align="center">Guía para desarrollar y desplegar una página con Gemini API</p>

> Este repositorio fue creado para compartir el código y los comandos utilizados durante unas clases de ayuda que brindé a mis compañeros de la diplomatura de desarrollo web fullstack en Coderhouse. Puedes encontrar los videos de las clases en [este enlace](https://drive.google.com/drive/folders/1CJpKEzhl_4QOXlp2hm8vxVlfxnnzv3Ba?usp=sharing).

## Descripción

Este repositorio te permitirá construir una página web que interactuará con la API de Gemini para generar contenido dinámico. Podrás hacer preguntas, obtener respuestas y explorar las capacidades de la inteligencia artificial de Gemini directamente desde tu navegador.

## Tecnologías Utilizadas

- Gemini API
- Vite
- Cloudflare Workers
- HTML
- JavaScript

## Requisitos Previos

- Node.js y npm instalados en tu máquina.
- Una cuenta de Cloudflare.
- Una clave API de Gemini.

## Índice

- Métodos
  - [Con liveServer](#con-liveserver)
  - [Con Vite](#con-vite)
  - [Vite + Cloudflare Worker](#vite--cloudflare-worker)

## Con liveServer

> El método de liveServer es el más inseguro y menos recomendable.

Para poder utilizar la api de gemini con liveServer vamos a tener que agregar una etiqueta script con type="importmap" al html para de ahí importar la api de gemini.

```html
<script type="importmap">
  {
    "imports": {
      "@google/generative-ai": "https://esm.run/@google/generative-ai"
    }
  }
</script>
```

Luego para poder importar el módulo a nuestro main.js vamos a tener que asociarlo al html con un type="module". Además para luego utilizar imports libremente en nuestro proyecto.

```html
<script src="main.js" type="module"></script>
```

Ya de resto es importar la api de gemini donde la vayamos a utilizar.

```js
import { GoogleGenerativeAI } from "@google/generative-ai";
```

Y adaptar el código que nos trajo nuestro prompt del playground de gemini para utilizarlo en nuestro proyecto.

## Con Vite

> El método con Vite es el más recomendado y que se utiliza para desarrollar aplicaciones reales.

Para crear un proyecto en git hay que abrir la terminal en la carpeta en la que vamos a desarrollar nuestra aplicación y poner:

```bash
npm create vite@latest
```

Si se corre el comando por primera ver poner ' y ' para que se instale vite y luego seguir los pasos explicados en [el drive (clase 2)](https://drive.google.com/drive/folders/1CJpKEzhl_4QOXlp2hm8vxVlfxnnzv3Ba?usp=sharing).

> Si no quieren ver la clase se pueden fijar en la [documentación de vite](https://vitejs.dev/guide/) como crear un proyecto vanilla

Vite nos va a facilitar mucho el desarrollo porque nos permite correr nuestro proyecto en un puerto local (mucho mejor que liveServer) con:

```bash
npm run dev
```

Además nos permite utilizar e instalar libremente librerías con npm. En nuestro caso nos interesa para instalar la api de gemini con:

```bash
npm install @google/generative-ai
```

Para así poder importar libremente la api de google en nuestro proyecto sin necesidad de utilizar la etiqueta html que utilizamos en el ejemplo con liveServer

Vite nos permite crear variables de entorno, cosa que nos sirve mucho para resguardar nuestra api key.

Para utilizar la api key tenemos que crear un archivo `.env `en la carpeta raíz de nuestro proyecto y poner ahí nuestra variable. La variable se declara con la palabra `VITE_` al principio seguido del nombre que le queramos dar a nuestra variable, de la siguiente manera:

```js
//.env
VITE_GEMINI_API_KEY = your_api_key;
```

> Notar que no es necesario poner nuestra api entre comillas como hacemos con las strings

Luego para acceder a la api key tendremos que importarla en donde la vayamos a utilizar de la siguiente manera:

```js
//Ejemplo de uso con la api de gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY))
```

Y de esta manera, si agregamos el `.env` al `.gitignore` podremos subir libremente nuestro código a github sin miedo que nos bloqueen el código por mostrar nuestra api_key ya que no se muestra directamente en el código. Pero al subirlo a algún dominio habría que configurarlo para que maneje la variable de entorno que es.

## Vite + Cloudflare Worker

> Este es el método más seguro y con el que nos vamos a acercar más a deplegar un proyecto real a producción

Cloudflare (en resumen) es una plataforma muy segura que nos permite desarrollar una "api" sin servidor que nos va a servir para fácilmente poder hacer llamadas a la api de gemini a travéz de la misma sin tener que poner nuestra apikey en el frontend.

Que no les suene complicado lo de "desarrollar una api" ya que al no ser en un servidor no hay que configurar ni saber mucho de backend.

Lo que enrealidad terminamos desarrollando es un worker que va a funcionar como una simple función que nos va a responder la respuesta de la llamada a la api de gemini.

Cloudflare además nos va a permitir desplegar nuestro proyecto a internet.

> Todos los servicios de cloudflare que vamos a utilizar son gratuitos. Si quieren más sobre [cloudflare](https://www.cloudflare.com/es-es/learning/what-is-cloudflare/) y los [workers](https://www.cloudflare.com/es-la/developer-platform/workers/) pueden precionar en los links para más info

### Worker

> Para entender mejor esta parte se recominda ver el tercer video del [drive](https://drive.google.com/drive/folders/1CJpKEzhl_4QOXlp2hm8vxVlfxnnzv3Ba?usp=sharing)

Hay varias formas de crear un worker pero nosotros al necesitar dependencias (como la api de gemini) lo vamos a hacer a través del [CLI (link a documentación oficial de como hacerlo)](https://dash.cloudflare.com/9b633f2b6676437c3455dda4e76abe7c/workers-and-pages/create-with-cli)

Primero necesitamos crear nuestro worker con:

```bash
npm create cloudflare
```

Al poner ese comando en la terminal tendrán seguir los pasa que se explican en el video del [drive](https://drive.google.com/drive/folders/1CJpKEzhl_4QOXlp2hm8vxVlfxnnzv3Ba?usp=sharing) (lo importante acá es el elegir el ejemplo de `helloworld`)

Una vez creado les va a salir el link de su worker en el que debería salir lo que devuelve la función que está en `src/index.js` que en nuestro caso es `Hello World!`

Una vez creado pueden utilizar el contenido que está en este repositorio para hacer las llamadas a gemini

Para setear la `GEMINI_API_KEY` el comando que van a necesitar este:

```bash
npx wrangler secret put GEMINI_API_KEY
```

Y cada que quieran notar los cambios que hicieron en el `index.js` en la página del worker tendrán que poner en la terminal:

```bash
npx wrangler deploy
```

## 👨🏾‍💻 Autor

#### Sebastian Alejandro Peñaloza Fuentes

- [Linkedin](https://www.linkedin.com/in/sebastianpenalozafuentes/)
- [GitHub](https://github.com/Sebastian0021)
