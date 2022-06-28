import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function Two() {
  return (
    <>
    <PhotoProvider>
      <PhotoView src={require("../../images/one.jpg")}>
      <img width={200} height={200} src={require("../../images/one.jpg")} alt="" />
      </PhotoView>
    </PhotoProvider>
    111
    </>
  );
}

export default Two