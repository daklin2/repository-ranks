import "./Card.style.scss";
import { RepositoryModel } from "../../../models/repositoryModel";
import starIcon from "../../../assets/icons/star.svg";
interface RepositoriesCardProps extends RepositoryModel {
	rank: number;
}

const RepositoriesCard = ({ login, repositoryUrl, avatarUrl, stars, rank }: RepositoriesCardProps) => {
	return (
		<div className="card">
			<div className={"card__rank"}>{rank}</div>
			<div className={"card__header"}>
				<span className="card__header__image-container">
					<img src={avatarUrl} alt={login} />
				</span>
				<span className="card__header__nickname">{login}</span>
			</div>
			<div className="card__body">
				<div className={"card__body__stars"}>
					STARS: <span className={"card__body__stars--star-color"}>{stars}</span> <img src={starIcon} alt={"star"} />
				</div>
				<div className={"card__body__link-to-repo"}>
					<a href={repositoryUrl} rel="noopener noreferrer" target="_blank">
						Link To Repository
					</a>
				</div>
			</div>
		</div>
	);
};

export default RepositoriesCard;
