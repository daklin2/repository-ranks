import React, {useMemo} from "react";
import {useSelector} from "../../utils/reactHooks";
import RepositoriesCard from "./card/Card";
import "./Repositories.style.scss";

const Repositories = () => {
  const isErrorWithGithub = useSelector((state) => state.languageMenu.error)
  const { currentLanguage, languageInformation} = useSelector((state) => state.languageMenu)

  const cardsLayout = useMemo(() => {
    if (!languageInformation?.length) return null;

    return languageInformation.map((repositoryInformation, i) => {
      return <RepositoriesCard key={repositoryInformation.login + `_${i}`} {...repositoryInformation} rank={i + 1}/>
    });
  }, [currentLanguage])

  return (
    <div className={"repositories"}>
      {isErrorWithGithub && (<div className={"repositories__error-handler"}> We have small problems, please try again after few minutes.</div>)}
      {!isErrorWithGithub && cardsLayout}
    </div>
  )
}

export default Repositories;
