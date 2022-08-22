import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setDataForNesting } from "../../../redux/RepositoriesSlice/repositories-actions";
import { getDataForNesting, getSpecificRepositoryData } from "../../../utils";

const LanguageUsed = () => {
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();
  const data = useSelector((data) => data.repositories.repositories);
  console.log(data);

  useEffect(() => {
    getSpecificRepositoryData(dispatch, login, repositoryName);
    getDataForNesting(dispatch, data.languages_url);
  }, []);

  return <></>;
};

export default LanguageUsed;
