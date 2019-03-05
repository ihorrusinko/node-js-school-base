//#region Task 2
function* integers() {
	for(let i = 0; i < Infinity; i++){
		yield i;
	}
}


function* take(limit, iterator) {
	for(let i = 0; i <= limit; i++){
		yield iterator.next().value;
	}
}
const iter = integers();
console.log("============LOGGER TASK 2");
for (let i of take(3, iter)) {
	console.log(i)
}
console.log("============LOGGER TASK 2");
// 0, 1, 2, 3
//#endregion Task 2

//#region Task 3
function sum(...args) {
	args.forEach(function (arg) {
		if (isNaN(Number(arg))) {
			throw new Error(`Sum: ${arg} is not a number`);
		}
	});
	return args.reduce((a, v) => a + v, 0);
}

function multiply(x, y) {
	return x * y;
}

const MEMOIZATION_CACHE_KEY = Symbol("memoizationCache");

function memoization(fn) {
	//init cache if it does not exist
	if (!this[MEMOIZATION_CACHE_KEY]) {
		this[MEMOIZATION_CACHE_KEY] = new Map();
	}

	//init cache for fn if it does not exist
	if (!this[MEMOIZATION_CACHE_KEY].get(fn)) {
		this[MEMOIZATION_CACHE_KEY].set(fn, new Map());
	}
	return (...args) => {
		const fnCache = this[MEMOIZATION_CACHE_KEY].get(fn);

		let cacheKey = args.slice().sort().join();

		if (fnCache.get(cacheKey) == null) {
			console.log("calculated");
			fnCache.set(cacheKey, fn.apply(null, args));
		} else {
			console.log("from cache");
		}

		return fnCache.get(cacheKey);
	}
}

console.log("============LOGGER TASK 3");
console.log(memoization(multiply)(1, 2)); // вычислено
console.log(memoization(multiply)(1, 3)); // вычислено
console.log(memoization(multiply)(1, 2)); // взято из кеша
console.log(memoization(sum)(1, 3, 4));  // вычислено
console.log(memoization(sum)(10));  // вычислено
console.log(memoization(sum)(10));  // взято из кеша
console.log(memoization(sum)(1, 2));  // вычислено
console.log(memoization(sum)(1, 2));  // взято из кеша
console.log(memoization(multiply)(1, 2));  // взято из кеша
console.log("============LOGGER TASK 3");
//#endregion Task 3


//#region Task 1

class UserManager{
	_getTimeout(timeout = 500){
		return new Promise((r)=> setTimeout(r, timeout));
	}

	async createUser(user){
		if(user.id){
			return user
		}
		await this._getTimeout(500);
		return {
			...user,
			id: new Date().getTime()}
	}

	async addGroup(user, groupId){
		if(user.groupId){
			return user
		}
		await this._getTimeout(500);
		return {
			...user,
			groupId: groupId
		}
	}

	async addSelectedGroupToUsers(users, group){
		for(let i = 0; i < users.length; i++){
			users[i] = await this.addGroup(await this.createUser(users[i]), group.id);
		}
		return users;
	}
}

/* Output:
[
  {id: 1, name: 'Bob', groupId: 1},
  {id: 2, name: 'Joe', groupId: 1},
  {id: 3, name: 'Don', groupId: 1},
  {id: 4, name: 'Kally', groupId: 1},
  // id для новых юзеров могут быть любыми
  {id: 5, name: 'Alex', groupId: 1},
  {id: 6, name: 'John', groupId: 1},
]
*/
const users = [
	{id: 1, name: 'Bob'},
	{id: 2, name: 'Joe'},
	{id: 3, name: 'Don', groupId: 1},
	{id: 4, name: 'Kally'},
	{name: 'Alex'},
	{name: 'John'},
];

const groups = [
	{id: 1, title: 'First Group'},
	{id: 2, title: 'Last Group'},
];

new UserManager().addSelectedGroupToUsers(users, groups[1]).then((users)=> {
	console.log("============LOGGER TASK 1");
	console.log(users);
	console.log("============LOGGER TASK 1");
});
//#endregion Task 1
