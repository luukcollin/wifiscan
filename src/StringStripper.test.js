import StringStripper from "./StringStripper";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";
configure({ adapter: new Adapter() });

let stringStripper;

beforeEach(() => {
  stringStripper = new StringStripper();
});

describe("Strip strip()", () => {
  test("Test strip() functie", () => {
    expect(stringStripper.strip("welkom", 1, 5)).toBe("elkom");
    expect(stringStripper.strip("welkom", 1, 1)).toBe("e");
    expect(stringStripper.strip("welkom harry", 6, 100)).toBe(" harry");
    expect(stringStripper.strip("welkom harry", 7, 12)).toBe("harry");
  });
});

describe("Strip stripFrom()", () => {
  test("Test stripFrom() functie", () => {
    expect(stringStripper.stripFrom("welkom harry", "m")).toBe(" harry");
    expect(stringStripper.stripFrom("welkom harry", "h")).toBe("arry");
    expect(stringStripper.stripFrom("welkom harry", "y")).toBe("");
    expect(stringStripper.stripFrom("Encryptie:WPA2", ":")).toBe("WPA2");
  });
});

describe("Strip stripTill()", () => {
  test("Test stripTill() functie", () => {
    expect(stringStripper.stripTill("welkom harry", "m")).toBe("welko");
    expect(stringStripper.stripTill("welkom harry", " ")).toBe("welkom");
    expect(stringStripper.stripTill("Encryptie:WPA2", ":")).toBe("Encryptie");
  });
});
