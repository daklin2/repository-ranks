import {useSelector} from "../../../utils/reactReduxHooks";
import {Languages} from "../../../models/repositoryModel";
import {useChangeSelectedLanguage} from "../../../utils/repositoriesHooks";

interface LanguageElement {
    name: string;
    queryName: Languages;
}

const MenuBarLanguageElement = ({ name, queryName }: LanguageElement ) => {
    const selectedLanguage = useSelector((state) => state.languageMenu.currentLanguage);
    const loadLanguageStatistic = useChangeSelectedLanguage();
    const activeClassName = selectedLanguage === queryName ? "menu-bar__language--active" : "";

    const onClick = () => {
        if (selectedLanguage === queryName) return;
        loadLanguageStatistic(queryName);
    };

    return (
        <div className={"menu-bar__language " + activeClassName} onClick={onClick}>
            {name}
        </div>
    );
}

export default MenuBarLanguageElement;