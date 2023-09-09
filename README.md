<p align="center">
<h1 align="center">Document Querying</h1>
  <p align="center">
    Query your large and complex <strong>documents</strong> in a simple user friendly chat interface.
    <br/>
  </p>
</p>

</br>

## Demo 

https://github.com/Tejasmadhukar/DocumentQuerying/assets/39000441/0800df58-92fc-4413-8612-50ee80cef6a4

## How to install 

### Install using Docker

Make sure you have docker installed.

```
git clone https://github.com/Tejasmadhukar/DocumentQuerying.git
cd DocumentQuerying
```

> Add .env according to .env.example in both ./NextJsApp and ./PythonMicroservice

Run DocumentQuerying dev server with the following command 

```
docker-compose up
```

You can now access DocumentQuerying app at http://localhost:3000.

To stop DocumentQuerying, do `Ctrl + C` in Terminal.

## Tech Stack

* [NextJs 13 & react](https://nextjs.org)
* [Tanstack Query](https://tanstack.com/query/latest)
* [Prisma](https://www.prisma.io)
* [NextAuth](https://next-auth.js.org)
* [NextUI](https://nextui.org)
* [Tailwind](https://tailwindcss.com)
* [PostgreSQL](https://www.postgresql.org)
* [Typescript](https://www.typescriptlang.org)
* [Azure Cloud](https://azure.microsoft.com/en-in)

#### PythonMicroservice specific

* <strong>Request-Response and Response streaming with Server Sent Events using REST Api.</strong>
* [Langchain](https://www.langchain.com)
* [Llama Index](https://www.llamaindex.ai)
* [Flask](https://pypi.org/project/Flask)

