import "./MenuBar.style.scss";
import {listOfLanguages} from "./utils/menuBar.util";
import MenuBarLanguageElement from "./view/language-element";
import {useDispatch, useSelector} from "../../utils/customHooks";
import {useMemo} from "react";
import {useChangeSelectedLanguage} from "../../utils/repositoriesHooks";

const MenuBar = () => {
  const selectedLanguage = useSelector((state) => state.languageMenu).currentLanguage
  const loadLanguageStatistic = useChangeSelectedLanguage();

  const listOfLanguage = useMemo(() => {
    return listOfLanguages.map((language) => {
      return <MenuBarLanguageElement name={language.displayName} queryName={language.queryName} />
    })
  }, [selectedLanguage])

  return (
    <div className={"menu-bar"}>
      {listOfLanguage}
    </div>
  )
}

export default MenuBar;
