import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// Rendering with "shallow" is important for not rendering other dependacies deeply but only
// as placeholders. As "units".

// Each it() test runs independt on the others, so changing the wrapper on one wont change it
// on the others.

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	// Runs before each test
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should should render 2 <NavigationItem /> if not authenticated.", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should should render 3 <NavigationItem /> if authenticated.", () => {
		// one way to add props: wrapper = shallow(<NavigationItems isAuth />);
		// enzyme way:
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it("should should render a logout <NavigationItem /> if  authenticated.", () => {
		wrapper.setProps({ isAuth: true });
		expect(
			wrapper.contains(
				<NavigationItem link="/logout">Logout</NavigationItem>
			)
		).toEqual(true);
	});
});
