import {mount, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import Loader from "../Loader";
import * as ReactReduxHooks from "../../../utils/reactReduxHooks";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const useDispatchSpy = jest.spyOn(ReactReduxHooks, "useDispatch");
useDispatchSpy.mockImplementation(() => defaultStore.dispatch)

const defaultStoreState = {
  loader: {
    isLoading: true,
  }
};
const defaultStore = configureStore([thunk])(defaultStoreState);

describe("Loader", () => {
  const useSelectorSpy = jest.spyOn(ReactReduxHooks, "useSelector");

  beforeEach(() => {
    useSelectorSpy.mockImplementation((state) => state(defaultStore.getState() as any));
  });
  afterEach(() => {
    jest.clearAllMocks();
    defaultStore.clearActions();
  });

  it("should render Loader", () => {
    expect(toJson(shallow(<Loader/>))).toMatchSnapshot();
  });

  it("shouldn't render Loader if nothing loading", () => {
    const editedStoreState = {
      loader: {
        isLoading: false,
      }
    }
    const store = configureStore([thunk])(editedStoreState);
    useSelectorSpy.mockImplementation((state) => state(store.getState() as any));
    const wrapper = mount(<Loader />);

    expect(wrapper.find("div").length).toBe(0);
  });
})