//#region Task 1
function sum(...args) {
	args.forEach(function (arg) {
		if (isNaN(Number(arg))) {
			throw new Error(`Sum: ${arg} is not a number`);
		}
	});
	return args.reduce((a, v) => a + v, 0);
}

console.log("============LOGGER TASK 1");
console.log(sum(1, 2, 3));  // 6
console.log(sum(1));  // 1
// console.log(sum("asd"));  // return Error
console.log("============END LOGGER TASK 1");
//#endregion Task 1

//#region Task 2
function multiply(x, y) {
	return x * y;
}

function memoization(fn) {
	//init cache if it does not exist
	if (!this.cache) {
		this.cache = {};
	}
	return (...args) => {
		let sortedArgs = args.slice().sort();

		let cacheKey = sortedArgs.join("");
		if (this.cache[cacheKey] == null) {
			console.log("calculated");
			this.cache[cacheKey] = fn.apply(null, args);
		} else {
			console.log("from cache");
		}

		return this.cache[cacheKey];
	}
}

console.log("============LOGGER TASK 1");
console.log(memoization(multiply)(1, 2)); // вычислено
console.log(memoization(multiply)(1, 3)); // вычислено
console.log(memoization(multiply)(1, 2)); // взято из кеша
console.log(memoization(sum)(1, 3, 4));  // вычислено
console.log(memoization(sum)(10));  // вычислено
console.log(memoization(sum)(10));  // взято из кеша
console.log("============LOGGER TASK 2");
//#endregion Task 2

//#region Task 3
/**
 * The class implements base warrior methods.
 */
class Warrior {
	/**
	 *
	 * @param {String} name
	 * @param {String} weapon
	 * @param {Number} hp
	 */
	constructor(name, weapon, hp) {
		this.name = name;
		this.weapon = weapon;
		this.hp = hp;
		this.ATTACK_MAX_RANDOM_POWER = 10;
	}

	/**
	 * Getter represents status of warrior life (true - alive, false - dead).
	 * @returns {boolean}
	 */
	get isAlive() {
		return this.hp > 0;
	}

	/**
	 * Function applies attack to warrior health.
	 * @param  {Number} hp
	 */
	getHit(hp) {
		if (this.isAlive) {
			this.hp = this.hp - hp;
			if (this.hp < 0) {
				this.hp = 0;
			}
		}
	}

	/**
	 * Function returns random value for attack.
	 * @returns {number}
	 */
	attack() {
		return Math.floor(Math.random() * Math.floor(this.ATTACK_MAX_RANDOM_POWER));
	}

	/**
	 * Function returns greeting of warrior.
	 * @returns {string}
	 */
	greeting() {
		return `Hey there. I am warrior ${this.name}`;
	}

	/**
	 * Override default toString function.
	 * @returns {string}
	 */
	toString() {
		return this.name;
	}
}

/**
 * The Monster class that extends Warrior.
 */
class Monster extends Warrior {
	/**
	 *
	 * @param {String} name
	 * @param {String} weapon
	 * @param {Number} hp
	 */
	constructor(name, weapon, hp) {
		super(name, weapon, hp);
		this.ATTACK_BASE_VALUE = 3;
	}

	/**
	 * Function returns random value + base value for attack.
	 * @returns {number}
	 */
	attack() {
		return super.attack() + this.ATTACK_BASE_VALUE;
	}

	/**
	 * Function returns greeting of warrior.
	 * @returns {string}
	 */
	greeting() {
		return `Grrr. I am monster ${this.name}`;
	}
}

/**
 * The Gladiator class that extends Warrior.
 */
class Gladiator extends Warrior {
	/**
	 *
	 * @param {String} name
	 * @param {String} weapon
	 * @param {Number} hp
	 */
	constructor(name, weapon, hp) {
		super(name, weapon, hp);
		this.ATTACK_BASE_VALUE = 4;
	}

	/**
	 * Function returns random value + base value for attack.
	 * @returns {number}
	 */
	attack() {
		return super.attack() + this.ATTACK_BASE_VALUE;
	}
}

/**
 * The class implements game.
 */
class Game {
	/**
	 *
	 * @param {Warrior} warrior1
	 * @param {Warrior} warrior2
	 */
	constructor(warrior1, warrior2) {
		if (!(warrior1 instanceof Warrior)) {
			throw new Error("GameLog: warrior1 mast be type of Warrior");
		}
		if (!(warrior2 instanceof Warrior)) {
			throw new Error("GameLog: warrior2 mast be type of Warrior");
		}
		this.warrior1 = warrior1;
		this.warrior2 = warrior2;
		this.winner = null;
	}

	/**
	 * The function run fight between 2 warriors
	 */
	start() {
		GameLog.log("Welcome on board.");
		GameLog.log("Welcome warrior 1: ");
		GameLog.log(this.warrior1.greeting());
		GameLog.log("Welcome warrior 2: ");
		GameLog.log(this.warrior2.greeting());

		while (this.warrior1.isAlive && this.warrior2.isAlive) {
			let warrior2Attack = this.warrior2.attack();
			GameLog.log(`${this.warrior1} attacked with ${this.warrior2.weapon} on ${warrior2Attack}`);
			this.warrior1.getHit(this.warrior2.attack());
			GameLog.log(`${this.warrior1} after attack has ${this.warrior1.hp} HP`);
			if (this.warrior1.isAlive) {
				let warrior1Attack = this.warrior1.attack();
				GameLog.log(`${this.warrior2} attacked with with ${this.warrior1.weapon} on ${warrior1Attack}`);
				this.warrior2.getHit(warrior1Attack);
				GameLog.log(`${this.warrior2} after attack has ${this.warrior2.hp} HP`);
			}
		}

		if (this.warrior1.isAlive) {
			this.winner = this.warrior1;
		} else {
			this.winner = this.warrior2;
		}
		GameLog.log(`winner is: ${this.winner}`)
	}
}

/**
 * Class represents game logger.
 */
class GameLog {
	/**
	 * The function implements logger
	 * @param {String} text
	 */
	static log(text) {
		console.log(`GAME LOG: ${text}`);
	}
}

console.log("============LOGGER TASK 3");
const gladiator = new Gladiator("Albert", "knife", 40);
const monster = new Monster("Bomb", "axe", 50);
const game = new Game(gladiator, monster);

game.start();
console.log(game.winner);
console.log("============LOGGER TASK 3");
//#endregion Task 3