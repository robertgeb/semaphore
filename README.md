# semaphore

### Example usage

Print `i love flan` one per second, ten times

```ts
import Semaphore from 'semaphore-throughput';

let max_concurrency = 1; // Concurrency limit
let max_throughput = 1; // Process rate per second
let sem = new Semaphore(max_concurrency, max_throughput);

for (let i = 0; i < 10; i++) {
    sem.wait().then(() =>{
        console.log("i love flan");
        sem.release();
    });
}

for (let i = 0; i < 10; i++) {
    new Promise(async function () {
        await sem.wait();
        console.log("i love flan");
        sem.release();
    })    
}
```

### Instalation

`npm i semaphore-throughput --save`