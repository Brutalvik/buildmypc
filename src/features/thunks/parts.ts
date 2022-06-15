import { partsActions } from '../parts/partsSlice';
import axios from 'axios';

const cases = (selection: string, dispatch: any, res: any) => {
  switch (selection) {
    case 'cpu':
      dispatch(partsActions.cpu(res.data));
      break;
    case 'gpu':
      dispatch(partsActions.gpu(res.data));
      break;
    case 'memory':
      dispatch(partsActions.memory(res.data));
      break;
    case 'motherboard':
      dispatch(partsActions.motherboard(res.data));
      break;
  }
};

export const fetchCpuData = (key: string, selection: string) => {
  return async (dispatch: any) => {
    const fetchCpu = async () => {
      return await axios.get(
        `https://pcpartsdata-default-rtdb.firebaseio.com/${selection}.json?auth=${key}`
      );
    };
    try {
      fetchCpu().then((res) => {
        if (res.status !== 200) {
          dispatch(
            partsActions.error({
              status: true,
              message: 'ERROR FETCHING DATA',
            })
          );
        } else {
          cases(selection, dispatch, res);
        }
      });
    } catch (error) {
      throw new Error(
        dispatch(
          partsActions.error({
            status: true,
            message: 'SOMETHING WENT WRONG!',
          })
        )
      );
    }
  };
};
