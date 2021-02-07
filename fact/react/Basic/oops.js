// this,super,constructor

class Human {
  // no need to declare the properties/attributes here
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  sayHi() {
    console.log("Inside says hi");
    console.log(this);
    console.log(`${this.name} Says Hi!!!`);
  }

  sayHi2() {
    console.log("Inside says hi Human");
    console.log(this);
    console.log(`${this.name} Says Hi!!!`);
  }
}

let steve = new Human("Steve", 100, "male");
console.log(steve);

// class functions - methods
// this has the details specific to the object calling the method
// this is readOnly
steve.sayHi();

// class SuperHuman{
//     constructor(ability){
//         this.ability = ability;
//     }
// }

// now objects of this class has properties and methods of human class
class SuperHuman extends Human {
  //  Must call super constructor in derived class
  constructor(name, age, gender, ability) {
    super(name, age, gender);
    //  calls the constructor of extended class to get this
    this.ability = ability;
  }

  sayHi(){
      console.log("Inside say Hi of superHuman");
      console.log(this);
      console.log(`${this.name} says Hi!!!`);
  }
}

let hulk = new SuperHuman("hulk",23,"male","smash");
console.log(hulk);
hulk.sayHi();
// even we pass something while calling and defined with parameters in human still super human version will be called
hulk.sayHi2();
