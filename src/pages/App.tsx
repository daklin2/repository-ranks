import React, {useEffect} from 'react';
import "./App.style.scss";
import Header from "../components/header/Header";
import MenuBar from "../components/menu-bar/MenuBar";
import Loader from "../components/loader/Loader";
import Repositories from "../components/repositories/Repositories";
import {useDispatch, useSelector} from "../utils/reactReduxHooks";
import {Languages} from "../models/repositoryModel";
import {useChangeSelectedLanguage} from "../utils/repositoriesHooks";

const App = () => {
  const loadLanguageStatistic = useChangeSelectedLanguage();

  useEffect(() => {
    const language = Languages.JAVA_SCRIPT;
    loadLanguageStatistic(language);
  }, [])

  return (
    <div className={"app"}>
        <Header />
        <MenuBar />
        <Repositories />
        <Loader />
    </div>
  );
}

export default App;
