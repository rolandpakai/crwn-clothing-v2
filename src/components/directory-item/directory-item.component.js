import {DirectoryItemContainer, Body, BackgroundImage} from  './directory-item.styles';
import { useNavigate } from 'react-router-dom'; 

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigete = useNavigate();

  const onNavigateHandler = () => navigete(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem;