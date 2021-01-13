import StringStripper from "./StringStripper";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";
import OverallScore from "./OverallScore";
configure({ adapter: new Adapter() });

let overallScoreDataset1;
let overallScoreDataset2;
let overallScoreDataset3;
let overallScoreDataset4;
let emptyDataset;

beforeEach(() => {
  overallScoreDataset1 = new OverallScore("WEP", "TKIP", "badpass");
  overallScoreDataset2 = new OverallScore("WPA3", "AES", "hello");
  overallScoreDataset3 = new OverallScore("WPA", "TKIP", "sUPerst0ng!Password");
  overallScoreDataset4 = new OverallScore("WPA3", "AES", "sUPerst0ng!Password");
  emptyDataset = new OverallScore("", "", "");
});

describe("Score datasets", () => {
  test("Score should be...", () => {
    expect(overallScoreDataset1.getScore()).toBe(0);
    expect(overallScoreDataset2.getScore()).toBe(25);
    expect(overallScoreDataset3.getScore()).toBe(28);
    expect(overallScoreDataset4.getScore()).toBe(45);
  });
});

describe("Score datasets %", () => {
  test("Score should be...%", () => {
    expect(overallScoreDataset1.getScorePercentage()).toBe(0);
    expect(overallScoreDataset2.getScorePercentage()).toBe(55);
    expect(overallScoreDataset3.getScorePercentage()).toBe(62);
    expect(overallScoreDataset4.getScorePercentage()).toBe(100);
  });
});

describe("Initial Score", () => {
  test("score should be 0", () => {
    expect(emptyDataset.getScore()).toBe(0);
  });
});
