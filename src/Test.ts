import now from "performance-now";
import {AllTasks} from "./all.tasks";

export class Test {

    /**
     * This function simply sleeps for sometime
     * @param seconds
     */
    public sleep(seconds: number): Promise<void> {
        const ms = seconds * 1000;
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * This function takes 7 seconds to perform
     */
    public async call1(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(7);
        const num = 5;
        for (let i = 0; i < num; i++) {
            const value: string = i.toString();
            summary.push(value);
        }

        return summary;
    }

    /**
     * This method takes 5 seconds to perform
     */
    public async call2(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(5);
        const num = 10;
        for (let i = 5; i < num; i++) {
            const value: string = i.toString();
            summary.push(value);
        }

        return summary;
    }

    /**
     * This function takes 3 seconds to perform
     */
    public async call3(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(3);
        const num = 15;
        for (let i = 10; i < num; i++) {
            const value: string = i.toString();
            summary.push(value);
        }

        return summary;
    }

    public async callParallely(): Promise<string[]> {

        const allSummary: string[] = [];
        const val1 = this.call1();
        const val2 = this.call2();
        const val3 = this.call3();
        const allPromises: any[] = [];

        allPromises.push(val1);
        allPromises.push(val2);
        allPromises.push(val3);

        const proms = await Promise.all(allPromises);
        proms.map(val => {
            allSummary.push(...val);
        });
        return allSummary;
    }

    public async showResults1(): Promise<void> {
        const allSummary: string[] = [];
        const start = now();

        allSummary.push(...await this.call1());
        allSummary.push(...await this.call2());
        allSummary.push(...await this.call3());

        const end = now();
        const timeInSeconds = (end - start) / 1000;

        console.log("Total time taken in showResults1(): ", timeInSeconds, "seconds");
        console.log("All Results: ", ...allSummary);
        console.log("--------------------------------------------");

        // allSummary.forEach((val) => {
        //     console.log("Result Value: ", val);
        // });

    }

    public async showResults2(): Promise<void> {
        const allSummary: string[] = [];
        const start = now();
        console.log("Trying to execute parallely, it provides undesired result ...");

        const val1: Promise<string[]> = this.call1();
        const val2: Promise<string[]> = this.call2();
        const val3: Promise<string[]> = this.call3();

        const newVal: any = await Promise.all([val1, val2, val3]);
        allSummary.push(...newVal);

        const end = now();
        const timeInSeconds = (end - start) / 1000;
        console.log("Total time taken in showResults2(): ", timeInSeconds, "seconds");
        console.log("All Results: ", ...allSummary);
        console.log("--------------------------------------------");
    }

    public async showResults3(): Promise<void> {
        const start = now();
        const results: string[] = await this.callParallely();
        const end = now();
        const timeInSeconds = (end - start) / 1000;

        console.log("Total time taken in showResults3(): ", timeInSeconds, "seconds");
        // console.log("All Results: ", results.join("\t"));
        console.log("All Results: ", ...results);
        console.log("--------------------------------------------");
    }

    public async getResult1(): Promise<string[]> {
        const values: string[] = await this.call1();
        return values;
    }

    public async getResult2(): Promise<string[]> {
        const values: string[] = await this.call2();
        return values;
    }

    public async getResult3(): Promise<string[]> {
        const values: string[] = await this.call3();
        return values;
    }

    public async showResults4(): Promise<void> {
        console.time("showResults4")
        const start = now();
        const proms: any[] = [];
        let tempPromise = await this.call1();
        proms.push(tempPromise);
        tempPromise = await this.call2();
        proms.push(tempPromise);
        tempPromise = await this.call3();
        proms.push(tempPromise);

        const valSummary: string[] = [];
        const allPromises: any = await Promise.all(proms);
        allPromises.map( (value: any) => {
            valSummary.push(... value);
        });

        const end = now();
        const timeInSeconds = (end - start) / 1000;
        console.log("Total time taken in showResults4(): ", timeInSeconds, "seconds");

        console.log("All Results: from results4",... valSummary);
        console.timeEnd("showResults4")

    }
}

// const test = new Test();
// test.showResults1(); // It takes more time to perform
//
// // The following will not give the desired result
// test.showResults2();
//
// // The following is the fastest way
// test.showResults3();
//
// // Again this is slow one
// test.showResults4();

const allTaskTest = new AllTasks();
allTaskTest.showResults1();
// allTaskTest.showResults2();
