class Creature {
  numberOfHands: number;
  numberOfFeet: number;
  constructor(numberOfHands: number, numberOfFeet: number) {
    this.numberOfHands = numberOfHands;
    this.numberOfFeet = numberOfFeet;
  }
}

const creature = new Creature(0, 4);


class Cat extends Creature {
  bark: string;
  constructor(bark: string) {
    super(0, 4); // スーパークラスのコンストラクタ実行に相当する
    this.bark = bark;
  }

  barking() {
    return `${this.bark}! ${this.bark}!`;
  }

  shakeTail() {
    console.log(this.barking());
  }
}

class Human extends Creature {
  name: string;
  constructor(name: string) {
    super(0,2);
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }

  shakeHands() {
    console.log(this.greet());
  }
}

const cat = new Cat('meow');
const human = new Human('Hanako');


