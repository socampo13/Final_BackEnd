let instance: Singleton | null = null;

class Singleton {
    value: number;
    constructor(){
        this.value = Math.random();
    }

    printValue(){
        console.log(this.value);
    }

    static getInstance(){
        if(!instance){
            instance = new Singleton();
        }

        return instance;
    }
}

module.exports = Singleton;