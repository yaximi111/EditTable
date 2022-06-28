import { history } from 'umi';
export default (props: any) => {
  if (localStorage.getItem('authorization')) {
    return <div>{props.children}</div>;
  } else {
    history.push('/login');
  }
};
