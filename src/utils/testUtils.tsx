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

export const githubResponseData = {
  data: {
    items: [
      {
        owner: {
          login: "dummyLogin",
          avatar_url: "dummyAvatar",
        },
        html_url: "dummyRepository",
        stargazers_count: 12,
      }
    ]
  }
}