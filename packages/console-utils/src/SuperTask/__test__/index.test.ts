import {SuperTask} from '..';
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