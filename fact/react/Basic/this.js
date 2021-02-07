// without let/const
name = "hulk";

// got added to the global object with key as name and value as "hulk"

let obj = {
  name: "Steve",
  sayHi: function () {
    console.log("inside says hi");
    console.log(this);
    // console.log(global); //same output
    console.log(`${this.name} says Hi!!!`);
    function fun() {
      console.log("Inside fun");
      console.log(this);
      // this is a simple function call from anywhere will have this = global object
    }
    // fun();

    let newFun = fun.bind(obj);
    // newfunction ka this defined acc to its lexical scope
    newFun();

    // refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

    arrowFun = () => {
      console.log("Inside arrowFun");
      console.log(this);
    };
    // arrow Functions have no self this(global) this they now take acc to lexical scope thus no need to write the fun.bind(obj);
  },
};

obj.sayHi();
// this will be the object calling this

function outer() {
  console.log(this);
  // here this is the global object.
  console.log(name);
}
outer();

outer2 = () => {
  console.log(this);
  // have no self this thus it prints the undefined;
};

// browser has window,node js has global object

// VERY IMPORTANT

// method call - this is the object calling the method
// simple function - this is the global object
// this is a simple function call from anywhere will have this = global object
// arrow functions jis class m hote h ussi ka this le lete h
