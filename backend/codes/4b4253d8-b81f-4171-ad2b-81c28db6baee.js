console.log('Hello World')

function hello(num) {
    let n=1;
    console.log(n)

}

hello(10)

const hello_man=()=>{
    let num='who am i';
    console.log(num)
}

hello_man()
const names=['Kushal','Amit','Raman']
const greet=(name)=>{console.log(`Hello ${name}`)}
names.map(name=>greet(name))
