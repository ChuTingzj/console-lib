import {randomUUID} from 'crypto';
export class SuperTask {
	private isRunning: boolean;
	private readonly concurrency: number;
	private tasks: Array<() => Promise<any>>;
	private results: Array<any>;
	private isRunningTasks: Array<{task: Promise<any>; tag: string}>;
	constructor(concurrency: number) {
		this.isRunning = false;
		this.concurrency = concurrency;
		this.tasks = [];
		this.results = [];
		this.isRunningTasks = [];
	}
	add(fn: () => Promise<any>) {
		this.tasks.push(fn);
		return this;
	}
	async run() {
		this.isRunning = true;
		console.log(this.isRunning);
		if (!this.tasks.length) return this.results;
		if (this.isRunningTasks.length > this.concurrency) {
			Promise.race(this.isRunningTasks.map((item) => item.task)).then(() => {
				this.isRunning && this.run();
			});
		} else {
			const exec = this.tasks.shift()!;
			const tag = randomUUID();
			const a = exec().then((res) => {
				this.results.push(res);
				const index = this.isRunningTasks.findIndex((item) => item.tag === tag);
				this.isRunningTasks.splice(index, 1);
			});
			this.isRunningTasks.push({task: a, tag});
			this.isRunning && this.run();
		}
	}
	stop() {
		this.isRunning = false;
	}
}

