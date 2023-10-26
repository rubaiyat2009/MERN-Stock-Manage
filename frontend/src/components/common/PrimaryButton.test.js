import PrimaryButton from "./PrimaryButton";
import renderer from "react-test-renderer";

it('with only children props', () => {
    const component = renderer.create(
        <PrimaryButton>Button Test</PrimaryButton>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});

it('with outline props', () => {
    const component = renderer.create(
        <PrimaryButton outlined>Button Test</PrimaryButton>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});

it('with sx props', () => {
    const component = renderer.create(
        <PrimaryButton sx={{ color: "red" }}>Button Test</PrimaryButton>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});