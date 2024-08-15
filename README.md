# <p align="center">Guía para desarrollar y desplegar una página con Gemini API</p>

> Este material se hizo en zoom en donde se explica todo lo que se hace y por qué se hace. Los videos de las explicaciones están en [el drive](https://drive.google.com/drive/folders/1CJpKEzhl_4QOXlp2hm8vxVlfxnnzv3Ba?usp=sharing)

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

Para utilizar la api key tenemos que crear un archivo **.env** en la carpeta raíz de nuestro proyecto y poner ahí nuestra variable. La variable se declara con la palabra 'VITE\_' al principio seguido del nombre que le queramos dar a nuestra variable, de la siguiente manera:

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

Y de esta manera, si agregamos el **.env** al **.gitignore** podremos subir libremente nuestro código a github sin miedo que nos bloqueen el código por mostrar nuestra api_key ya que no se muestra directamente en el código. Pero al subirlo a algún dominio habría que configurarlo para que maneje la variable de entorno que es.
