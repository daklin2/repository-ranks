import "./MenuBar.style.scss";
import { listOfLanguages } from "./utils/menuBar.util";
import MenuBarLanguageElement from "./view/language-element";
import { useMemo } from "react";

const MenuBar = () => {
	const listOfLanguage = useMemo(() => {
		return listOfLanguages.map((language, i) => {
			return <MenuBarLanguageElement key={language.queryName + `_${i}`} name={language.displayName} queryName={language.queryName} />;
		});
	}, []);

	return <div className={"menu-bar"}>{listOfLanguage}</div>;
};

export default MenuBar;
