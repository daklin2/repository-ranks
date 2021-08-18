import {Provider} from "react-redux";
import {Store} from "@reduxjs/toolkit";
import {mount} from "enzyme";

export const mountWrapper = (store: Store, element: JSX.Element) => {
  return mount(
    <Provider store={store}>
      {element}
    </Provider>
  )
}