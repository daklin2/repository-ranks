import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Crypto } from "@peculiar/webcrypto";

configure({ adapter: new Adapter() });

global.crypto = new Crypto();
