
export default class Semaphore {
    private max_throughput_per_second: number;
    private max_concurrency_limit: number;
    private running: number;
    private runned: number;
    private start_time?: bigint;

    constructor(max_concurrency_limit: number=1, max_throughput_per_second:number = 1) {
        this.max_concurrency_limit = max_concurrency_limit;
        this.max_throughput_per_second = max_throughput_per_second;
        this.running = 0;
        this.runned = 0;
    }

    release()
    {
        this.running--;
        this.runned++;
    }

    async wait()
    {
        let actual_throughput: number = 0;

        while(this.running >= this.max_concurrency_limit || actual_throughput >= this.max_throughput_per_second)
        {
            await this.delay(10);            
            if(this.start_time)
            {
                let actual_time = process.hrtime.bigint();
                let elapsed_seconds = Number((actual_time - this.start_time)/BigInt(1000000))/1000;
                actual_throughput = (this.runned + this.running)/elapsed_seconds;                
            }
        }

        this.running++;
        if(!this.start_time)
            this.start_time = process.hrtime.bigint();
        
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}