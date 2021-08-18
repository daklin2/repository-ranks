import { shallow } from "enzyme";
import Header from "../Header";
import toJson from "enzyme-to-json";

describe("Header", () => {
	it("should render Header", () => {
		expect(toJson(shallow(<Header />))).toMatchSnapshot();
	});
});
