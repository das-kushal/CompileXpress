<p align="center">
 <img src="https://github.com/das-kushal/CompileXpress/blob/main/frontend/public/favicon.ico" style="text-align: right" alt="CompileXpress logo" height="50">
</p>

<h1 align="center">
 ${\textsf{Compile}\textcolor{red}{\textit{X}}\textsf{press}}$
</h1>

#### This is CompileXpress which allows anyone to write some code and execute it and get the result <br>
<h3>
$\textcolor{red}{\textit{I have attached a demo video at the end.}}$
</h3>

#### In this app you will get
  - Editor to write your code
  - Small terminal to see the output
  - Light and dark theme changer
  - settings to change the fontsize, tabSpace, font Family and word wrap
  - Also you can change language , presently only 3 languages are supported - C++, Python, Javascript
  - You can also set the default language and it is persistent even if you refresh the page
  - Suppose we write some code in C++ and then we change the language to Python and come back to C++ again then the previously written code stays 

***

<div>
  <h4>Technology used</h4>  
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=blue" height='40'/> &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" height='40'/> &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" height='40'/>     &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white"  height='40'/>
</div>

- For frontend React is used which is built using Vite which is super fast and also supports hot reloading
- For backend I created an express server
- The server uses exec to run the code in the terminal and produces the results which are then displyed in the frontend
 
#### Commands to run

> To run the frontend (Default port 5173)
```ruby
cd frontend
npm install 
npm run dev
```


> To run the backend (Default port 5001)
```ruby
cd backend
npm install 
node index.js
```


#### Here is the demo of the app

https://github.com/das-kushal/CompileXpress/assets/86544278/f2749a32-f465-43ce-abee-2eac143c123e
