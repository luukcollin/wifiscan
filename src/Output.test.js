import Output from "./Output";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16.1";
configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = new shallow(<Output />);
});

describe("Component testing", () => {
  test("Aanmaken van component", () => {
    expect(wrapper.find("h1").text()).toContain("Output Results");
  });
});
