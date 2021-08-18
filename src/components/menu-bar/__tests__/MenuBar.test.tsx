import {mount, ReactWrapper, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import * as ReactReduxHooks from "../../../utils/reactReduxHooks";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import MenuBar from "../MenuBar";
import {Languages} from "../../../models/repositoryModel";
import {githubResponseData, mountWrapper} from "../../../utils/testUtils";
import {listOfLanguages} from "../utils/menuBar.util";
import axiosInstance from "../../../service/axiosInstance";
import {Provider} from "react-redux";
import {act} from "react-dom/test-utils";
import {changeSelectedLanguage, getLanguageStats} from "../../../store/languageMenuSlice";

const useDispatchSpy = jest.spyOn(ReactReduxHooks, "useDispatch");
useDispatchSpy.mockImplementation(() => defaultStore.dispatch)

const defaultStoreState = {
  languageMenu: {
    currentLanguage: null,
    languageInformation: undefined,
  },
  loading: {
    isLoading: false,
  }
};
const defaultStore = configureStore([thunk])(defaultStoreState);
const activeElementClassName = "menu-bar__language menu-bar__language--active";

describe("MenuBar", () => {
  const useSelectorSpy = jest.spyOn(ReactReduxHooks, "useSelector");
  const useDispatchSpy = jest.spyOn(ReactReduxHooks, "useDispatch");

  const clickToMenuItem = async (wrapper: ReactWrapper, searchingItem: Languages) => {
    const searchedLanguage = listOfLanguages.find((language) => language.queryName === searchingItem)
    const searchedLanguageNode = wrapper.findWhere((node: any) => {
      return (
        node.type() &&
        node.name() &&
        node.text() === searchedLanguage!.displayName
      );
    }).at(0);
    await act(async () => {
      await searchedLanguageNode.simulate("click");
    })
  }

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

    expect(wrapper.find(`[className="${activeElementClassName}"]`).length).toEqual(1)
  });

  it("on click to item should dispatch fetch of language-stats and change currentLanguage to new", async () => {
    jest.spyOn(axiosInstance, "get").mockImplementation(() => Promise.resolve(githubResponseData))
    const wrapper = mountWrapper(defaultStore, <MenuBar />);
    await clickToMenuItem(wrapper, Languages.JAVA_SCRIPT);

    const searchedActions = [changeSelectedLanguage.type, getLanguageStats.pending.type];
    const actions = defaultStore.getActions().filter((action) => searchedActions.includes(action.type))

    expect(actions.length).toBe(2)
  });

  it("on click to item shouldn't dispatch dispatch anything if currentLanguage == newLanguage", async () => {
    const editedStoreState = {
      ...defaultStoreState,
      languageMenu: {
        ...defaultStoreState,
        currentLanguage: Languages.TYPE_SCRIPT,
      }
    }
    const store = configureStore([thunk])(editedStoreState);
    useSelectorSpy.mockImplementation((state) => state(store.getState() as any));
    const wrapper = mountWrapper(defaultStore, <MenuBar />);
    await clickToMenuItem(wrapper, Languages.TYPE_SCRIPT);

    const searchedActions = [changeSelectedLanguage.type, getLanguageStats.pending.type];
    const actions = defaultStore.getActions().filter((action) => searchedActions.includes(action.type))

    expect(actions.length).toBe(0)
  });

})