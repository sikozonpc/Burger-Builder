// Important!! to render a container you must export it and import it as named export
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => []} />);
	});

	it("should render <BuildControls /> when receiving ingredients", () => {
		wrapper.setProps({ ingredients: { salad: 0 } });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
