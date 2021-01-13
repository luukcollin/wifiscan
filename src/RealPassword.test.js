import RealPassword from "./RealPassword";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";
configure({ adapter: new Adapter() });

let password;

const MINIMUM_REQUIREMENTS = 70;
const RECCOMMENDED_REQUIREMENTS = 100;

beforeEach(() => {
  password = new RealPassword();
});

describe("Password testing bad passwords", () => {
  test("Aanmaken van component", () => {
    password.setPassword("unsafe");
    expect(password.getPoints()).toBeLessThan(MINIMUM_REQUIREMENTS);
    password.setPassword("superbadpass");
    expect(password.getPoints()).toBeLessThan(MINIMUM_REQUIREMENTS);
    password.setPassword("jU#9jdI");
    expect(password.getPoints()).toBeLessThan(MINIMUM_REQUIREMENTS);
    expect(password.getPoints()).toBeGreaterThan(0);
  });
});

describe("Password testing good passwords", () => {
  test("Punten zijn hoger dan 80", () => {
    password.setPassword("vErYs4%ePass");
    expect(password.getPoints()).toBeGreaterThanOrEqual(
      RECCOMMENDED_REQUIREMENTS
    );
    password.setPassword("TwentyCharactersLongPassword");
    expect(password.getPoints()).toBeGreaterThanOrEqual(MINIMUM_REQUIREMENTS);
    password.setPassword(
      "885092934928597392423985098209482390482397858734827489234"
    );
    expect(password.getPoints()).toBeGreaterThanOrEqual(MINIMUM_REQUIREMENTS);
  });
});

describe("Password testing common passwords", () => {
  test("Punten zijn 0", () => {
    password.setPassword("12345");
    expect(password.getPoints()).toBeLessThanOrEqual(0);
    password.setPassword("football");
    expect(password.getPoints()).toBeLessThanOrEqual(0);
    password.setPassword("monkey");
    expect(password.getPoints()).toBeLessThanOrEqual(0);
  });
});
