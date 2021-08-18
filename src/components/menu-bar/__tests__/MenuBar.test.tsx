import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import * as ReactReduxHooks from "../../../utils/reactReduxHooks";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import MenuBar from "../MenuBar";
import {Languages} from "../../../models/repositoryModel";
import {mountWrapper} from "../../../utils/testUtils";
import {listOfLanguages} from "../utils/menuBar.util";
import axiosInstance from "../../../service/axiosInstance";

const useDispatchSpy = jest.spyOn(ReactReduxHooks, "useDispatch");
useDispatchSpy.mockImplementation(() => defaultStore.dispatch)

const defaultStoreState = {
  languageMenu: {
    currentLanguage: null,
  }
};
const defaultStore = configureStore([thunk])(defaultStoreState);

describe("MenuBar", () => {
  const useSelectorSpy = jest.spyOn(ReactReduxHooks, "useSelector");
  const useDispatchSpy = jest.spyOn(ReactReduxHooks, "useDispatch");

  beforeEach(() => {
    useSelectorSpy.mockImplementation((state) => state(defaultStore.getState() as any));
    useDispatchSpy.mockImplementation(() => defaultStore.dispatch);
  });
  afterEach(() => {
    jest.clearAllMocks();
    defaultStore.clearActions();
  });

  it("should render MenuBar", () => {
    expect(toJson(shallow(<MenuBar/>))).toMatchSnapshot();
  });

  it("selected language should has active class", () => {
    const editedStoreState = {
      languageMenu: {
        ...defaultStoreState,
        currentLanguage: Languages.TYPE_SCRIPT,
      }
    }
    const store = configureStore([thunk])(editedStoreState);
    useSelectorSpy.mockImplementation((state) => state(store.getState() as any));
    const wrapper = mountWrapper(store, <MenuBar />);

    expect(wrapper.find('[className="menu-bar__language menu-bar__language--active"]').length).toEqual(1)
  });
})