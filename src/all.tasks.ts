import now from "performance-now";

export class AllTasks {

    public sleep(seconds: number): Promise<void> {
        const ms = seconds * 1000;
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public async washClothes(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(7);
        const data = "Clothes are ready,";
        summary.push(data);
        return summary;
    }

    public async prepareRecepe(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(9);
        const data = "Recepe is ready,";
        summary.push(data);
        return summary;
    }

    public async prepareRice(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(11);
        const data = "Rice is ready,";
        summary.push(data);
        return summary;
    }

    public async boilMilk(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(5);
        const data = "Milk is ready,";
        summary.push(data);
        return summary;
    }

    public async createNVTInstaller(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(10);
        const data = "Installer is ready,";
        summary.push(data);
        return summary;
    }

    public async cleanUtensils(): Promise<string[]> {
        const summary: string[] = [];
        await this.sleep(13);
        const data = "Utensils are cleaned";
        summary.push(data);
        return summary;
    }

    public async showResults1(): Promise<void> {
        const allSummary: string[] = [];
        const start = now();
        allSummary.push(...await this.washClothes()); // Takes 7 seconds
        allSummary.push(...await this.prepareRecepe()); // Takes 9 seconds
        allSummary.push(...await this.prepareRice()); // Takes 11 seconds
        allSummary.push(...await this.createNVTInstaller()); // Takes 10 seconds
        allSummary.push(...await this.boilMilk()); // Takes 5 seconds
        allSummary.push(...await this.cleanUtensils()); // Takes 13 seconds

        const end = now();
        const timeInSeconds = (end - start) / 1000;
        console.log("**************************************************************");
        console.log("Total time taken: ", timeInSeconds, "seconds");
        console.log("**************************************************************");
        console.log("All Results: ", ...allSummary);
    }

    public async showResults2(): Promise<void> {
        const allSummary: string[] = [];
        const start = now();
        const proms: any[] = [];
        proms.push(this.washClothes()); // Takes 7 seconds
        proms.push(this.prepareRecepe()); // Takes 9 seconds
        proms.push(this.prepareRice()); // Takes 11 seconds
        proms.push(this.createNVTInstaller()); // Takes 10 seconds
        proms.push(this.boilMilk()); // Takes 5 seconds
        proms.push(this.cleanUtensils()); // Takes 13 seconds

        const allPromises: any = await Promise.all(proms);
        allPromises.map((value: any) => {
            allSummary.push(...value);
        });

        const end = now();
        const timeInSeconds = (end - start) / 1000;
        console.log("**************************************************************");
        console.log("Total time taken: ", timeInSeconds, "seconds");
        console.log("**************************************************************");
        console.log("All Results: ", ...allSummary);
    }
}

// const test: AllTasks = new AllTasks();
// // test.showResults1();
// test.showResults2();