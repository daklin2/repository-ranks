import "./MenuBar.style.scss";
import {listOfLanguages} from "./utils/menuBar.util";
import MenuBarLanguageElement from "./view/language-element";
import { useSelector} from "../../utils/reactReduxHooks";
import {useMemo} from "react";

const MenuBar = () => {
  const selectedLanguage = useSelector((state) => state.languageMenu.currentLanguage)

  const listOfLanguage = useMemo(() => {
    return listOfLanguages.map((language, i) => {
      return <MenuBarLanguageElement key={language.queryName + `_${i}`} name={language.displayName} queryName={language.queryName} />
    })
  }, [selectedLanguage])

  return (
    <div className={"menu-bar"}>
      {listOfLanguage}
    </div>
  )
}

export default MenuBar;
