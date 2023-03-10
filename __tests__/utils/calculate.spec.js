import { add, subtract, divide, multiply } from "../../utils/calculate";

describe("basic library functionality", () => {
  it("can add two numbers", () => {
    expect(add(1, 1)).toBe(2);
    expect(add(1, -1)).toBe(0);
    expect(add(1.5, 1.5)).toBe(3);
  });

  it('can multiply two numbers', () =>{
    expect(multiply(2,2)).toBe(4);
    expect(multiply(2,3)).not.toBe(5);
  })

  it("doesn't like strings", () => {
    expect(() => {
      add(1, "a");
    }).toThrow();

    expect(() => {
      add("a", 1);
    }).toThrow();

    expect(() => {
      add(1, null);
    }).toThrow();
  });
});