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
const async1 = () =>
	new Promise((resolve) => {
		setTimeout(() => (console.log(1), resolve(1)), 10000);
	});
const async2 = () =>
	new Promise((resolve) => {
		setTimeout(() => (console.log(2), resolve(2)), 1000);
	});
const async3 = () =>
	new Promise((resolve) => {
		setTimeout(() => (console.log(3), resolve(3)), 2000);
	});
const async4 = () =>
	new Promise((resolve) => {
		setTimeout(() => (console.log(4), resolve(4)), 5000);
	});
const async5 = () =>
	new Promise((resolve) => {
		setTimeout(() => (console.log(5), resolve(5)), 2000);
	});
new SuperTask(2).add(async1).add(async2).add(async3).add(async4).add(async5).run();
