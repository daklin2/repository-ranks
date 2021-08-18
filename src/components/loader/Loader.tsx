import "./Loader.style.scss";
import {useSelector} from "../../utils/reactHooks";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading)

  return isLoading ? (
    <div className={"loader__background"}>
      <div className="lds-roller">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  ) : null
}

export default Loader;
